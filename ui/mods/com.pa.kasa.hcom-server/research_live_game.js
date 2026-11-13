//this keeps track of replaced units and allows hotkeys to work on them

//not sure exactly how multiple replacements would work, I will need to set it to replace the new unit value without touching the old

model.oldUnits = []//units being replaced, this is checked before building anything

model.newUnits = []//replaces the id if an old unit is hotkeyed

var consumedTriggerQueueRules = [
    {
        prefix: "/pa/units/arsenal/unlocks/",
        producer_specs: ["/pa/units/arsenal/arsenal.json"]
    }
];

//factory map will link each factory id to a buildqueue
//in order to track correctly this will be done on orders issued rather than factory selection
factorySpecs = [

    "/pa/units/land/bot_factory/bot_factory.json",
    "/pa/units/land/bot_factory_adv/bot_factory_adv.json",
    "/pa/units/land/vehicle_factory/vehicle_factory.json",
    "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json",
    "/pa/units/air/air_factory/air_factory.json",
    "/pa/units/air/air_factory_adv/air_factory_adv.json",
    "/pa/units/arsenal/arsenal/arsenal.json"
    
]

model.factoryMap = {}

model.captureSelection = function(){
    if (!api.selection || !api.selection.has || !api.selection.get) {
        return null;
    }
    if (!api.selection.has()) {
        return null;
    }
    return api.selection.get();
}

model.restoreSelection = function(selectionSnapshot){
    api.select.empty();
    if (selectionSnapshot && api.selection && api.selection.set) {
        api.selection.set(selectionSnapshot);
    }
}

model.getConsumedTriggerProducerSpecs = function(unitSpec){
    if (!unitSpec) {
        return [];
    }
    for (var i = 0; i < consumedTriggerQueueRules.length; i++) {
        if (unitSpec.indexOf(consumedTriggerQueueRules[i].prefix) === 0) {
            return consumedTriggerQueueRules[i].producer_specs;
        }
    }
    return [];
}

model.clearConsumedTriggerQueue = function(unitSpec){
    var producerSpecs = model.getConsumedTriggerProducerSpecs(unitSpec);
    if (producerSpecs.length === 0 || !model.allPlayerArmy) {
        return;
    }

    var playerId = model.armyIndex();
    if (typeof playerId === "undefined" && model.armyId) {
        playerId = model.armyId();
    }
    if (typeof playerId === "undefined") {
        return;
    }

    model.allPlayerArmy(playerId, producerSpecs).then(function(result){
        var producerIds = [];
        _.forEach(producerSpecs, function(spec){
            if (result[spec] !== undefined) {
                producerIds = producerIds.concat(result[spec]);
            }
        });
        producerIds = _.uniq(producerIds);

        if (producerIds.length === 0) {
            return;
        }

        var originalSelection = model.captureSelection();
        api.select.unitsById(producerIds);
        api.unit.cancelBuild(unitSpec, 100, false);
        model.restoreSelection(originalSelection);

        _.forEach(producerIds, function(producerId){
            if (model.factoryMap[producerId]) {
                delete model.factoryMap[producerId][unitSpec];
            }
        });
    });
}

model.mapFactoryBuildToIds = function(selectedFacIds, unitSpec, count, cancel, urgent){//if urgent we ignore otherwise we update the map

    for(var i = 0 ; i < selectedFacIds.length; i++){
        if(urgent){continue}
        if(model.factoryMap[selectedFacIds[i]] == undefined){
            model.factoryMap[selectedFacIds[i]] = {}
        }
        var unitsQueued = model.factoryMap[selectedFacIds[i]][unitSpec];
        if(unitsQueued == undefined){
            model.factoryMap[selectedFacIds[i]][unitSpec] = 0;
            unitsQueued = 0;
        }
        if(cancel){
            unitsQueued = unitsQueued - count
            if(unitsQueued < 0){unitsQueued = 0}
        }
        else{
            unitsQueued = unitsQueued + count
        }
        model.factoryMap[selectedFacIds[i]][unitSpec] = unitsQueued;
    }

}

model.replaceUnitQueue = function(facsToReQueue,oldUnit, newUnit, maxAmount){//this should only run between selections
    var originalSelection = model.captureSelection();
    var facIds = [];
    _.forEach(facsToReQueue, function(fac){facIds.push(fac[0])})
    if (facIds.length === 0) {
        return;
    }
    //select facs that are needed initally
    api.select.unitsById(facIds);
    api.unit.cancelBuild(oldUnit, 100, false);
    //deselect facs that have the right amount queued
    for (var i = 0; i < maxAmount; i++) {
        for (var j = 0; j < facsToReQueue.length; j++) {
    
            var amount = facsToReQueue[j][1]
           
            if(amount == i){
                facIds.splice(j,1);
                console.log("spliced fac out of selection");
                facsToReQueue.splice(j,1);
            }
        }
       api.select.unitsById(facIds);
       if(newUnit !== null && newUnit !== undefined){
       api.unit.build(newUnit, 1, false);}
    }
    model.restoreSelection(originalSelection);
}




//this does not track issuing stop commands which are also important for tracking
model.executeStartBuild = function (params) {
    var selectedFacIds = [];
    var id = params.item;
    for(var i = 0;i<model.oldUnits.length;i++){
        if(id == model.oldUnits[i]){
            id = model.newUnits[i];
        }
    }
    for(var i = 0; i < factorySpecs.length; i++){
        var facTypeInSelection = model.selection().spec_ids[factorySpecs[i]]
        if(facTypeInSelection !== undefined){
            for(var j = 0; j < facTypeInSelection.length; j++){
                selectedFacIds.push(facTypeInSelection[j])
            }
            
        }
    }
    var batch = params.batch;
    var cancel = params.cancel;
    var urgent = params.urgent;
    var more = params.more;


    if (model.selectedMobile()) {
        model.endCommandMode();
        model.currentBuildStructureId(id);
        api.arch.beginFabMode(id)
                .then(function (ok) {
                    if (!ok)
                        model.endFabMode();
                });

        model.mode('fab');
        model.fabCount(0);
    }
    else {
        var count = batch ? model.batchBuildSize() : 1;
        model.mapFactoryBuildToIds(selectedFacIds, id, count, cancel, urgent)
        if (cancel) {
            api.unit.cancelBuild(id, count, urgent);
            api.audio.playSound('/SE/UI/UI_factory_remove_from_queue');
        }
        else {
            api.unit.build(id, count, urgent).then(function (success) {
                if (success) {
                    var secondary = more ? '_secondary' : '';
                    api.audio.playSound('/SE/UI/UI_Command_Build' + secondary);
                }
            });
        }
    }
}
model.buildItemBySpec = function (spec_id) {
    for(var i = 0;i<model.oldUnits.length;i++){
        if(spec_id == model.oldUnits[i]){
            spec_id = model.newUnits[i];
        }
    }
    var item = model.unitSpecs[spec_id];
    if (item)
        model.buildItem(item);
}

handlers.replaceHotkey = function(unitPair){
    for(var i = 0;i<model.oldUnits.length;i++){
        if(unitPair[0] == model.oldUnits[i]){
            model.newUnits[i] = unitPair[1];
            return;
        }
    }
    model.oldUnits.push(unitPair[0]);
    model.newUnits.push(unitPair[1]);
}

handlers.replaceQueue = function(unitPair){
    
    var oldUnit = unitPair[0];
    var newUnit = unitPair[1];
    var facKeys = _.keys(model.factoryMap);
    var facsToQueue = [];//will contain fac id's along with the amount of the unit queued
    var maxAmount = 0;
    _.forEach(facKeys,function(key){
        var amount = model.factoryMap[key][oldUnit]
        if(amount > maxAmount){maxAmount = amount}
        if(amount > 0){
            facsToQueue.push([parseInt(key),amount])
        }
    })
    model.replaceUnitQueue(facsToQueue,oldUnit,newUnit,maxAmount);
}

handlers.unitCompleted = function(payload) {
    if (!payload || !payload.unit_spec) {
        return;
    }
    model.clearConsumedTriggerQueue(payload.unit_spec);
};