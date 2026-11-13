/**
 * This file controls locking/unlocking units even when a scenario is not picked
 */


model.unitsToCommand = [["/pa/units/structure/control_node/portal/portal_charging.json", "altFireSelf"]]

//hardcoded locks, research packs can add to this by appending to it, units that have been locked will be removed, ensures units stay locked on resets

model.unitsToLock = [
                    "/pa/units/arsenal/unlocked_units/tank_light_laser_up/tank_light_laser_up.json",
                    "/pa/units/arsenal/unlocked_units/tank_heavy_mortar_up/tank_heavy_mortar_up.json",
                    "/pa/units/arsenal/unlocked_units/assault_bot_adv_up/assault_bot_adv_up.json",
                    "/pa/units/arsenal/unlocked_units/tank_laser_adv_up/tank_laser_adv_up.json",
                    "/pa/units/arsenal/unlocked_units/assault_bot_up/assault_bot_up.json",
                    "/pa/units/arsenal/unlocked_units/adv_heavy_bot_up/adv_heavy_bot_up.json",
                    "/pa/units/arsenal/unlocked_units/tank_heavy_armor_up/tank_heavy_armor_up.json",
                    "/pa/units/arsenal/unlocked_units/tank_hover_up/tank_hover_up.json",
                    "/pa/units/arsenal/unlocked_units/bot_rpg_up/bot_rpg_up.json",
                    "/pa/units/arsenal/unlocked_units/bot_grenadier_up/bot_grenadier_up.json",
                    "/pa/units/arsenal/unlocked_units/gunship_up/gunship_up.json",
                    "/pa/units/land/nuke_launcher/nuke_launcher.json",
                    "/pa/units/air/yellowjacket/yellowjacket.json",
                    "/pa/units/arsenal/unlocks/nuke_ammo_unlock/nuke_ammo_unlock.json",
                    "/pa/units/arsenal/unlocks/nuke_ammo_unlock/nuke_ammo_arsenal.json",
                    "/pa/units/arsenal/unlocks/hype_ammo_unlock/hype_ammo_unlock.json",
                    "/pa/units/arsenal/unlocks/hype_ammo_unlock/hype_ammo_arsenal.json",
                    "/pa/units/land/missile_facility/large_dot_ammo.json",
                    "/pa/units/land/missile_facility/large_stun_ammo.json",
                    "/pa/units/land/missile_facility/precision_strike_ammo.json",
                    "/pa/units/land/shah/shah.json",
                    "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json",
                    "/pa/units/land/nuke_launcher/nuke_launcher_up.json",
                    "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_up.json",
                    "/pa/units/land/tank_anti_nuke/tank_anti_nuke_up.json",
                    "/pa/units/arsenal/unlocked_units/bot_sniper_up/bot_sniper_up.json",
                    "/pa/units/arsenal/unlocked_units/orbital_battleship_up/orbital_battleship_up.json",
                    "/pa/units/arsenal/unlocked_units/orbital_railgun_up/orbital_railgun_up.json"
                    ];

//tracks locked units
model.lockedUnits = [];

//hardcoded pairs, can be added to by research packs by appending, format is [[researchfactoryunit,[unitsToUnlock],[unitToLock],replaceLockedUnitsBool]

//with the addition of replacing units queued I think I will have it be default as the only edge case is research which I will just not track

//to combo replace/lock have locked units be on the end of the unitsToLock array and not match up numerically with the unitsToUnlock array

//issue when I want to unlock a unit + replace another so need to double up on the unlock

model.unlockPairs = [

    //alpha grunt
    [//trigger unit
    [],//units added
    [],//units replaced/locked
    true],//is a replace rather than just locks

    
    //orbital_railgun_up
    ["/pa/units/arsenal/unlocks/orbital_railgun_up_unlock/orbital_railgun_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/orbital_railgun_up/orbital_railgun_up.json"],
    ["/pa/units/orbital/orbital_railgun/orbital_railgun.json", "/pa/units/arsenal/unlocks/orbital_railgun_up_unlock/orbital_railgun_up_unlock.json"],
    true],

    //orbital_battleship_up
    ["/pa/units/arsenal/unlocks/orbital_battleship_up_unlock/orbital_battleship_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/orbital_battleship_up/orbital_battleship_up.json"],
    ["/pa/units/orbital/orbital_battleship/orbital_battleship.json", "/pa/units/arsenal/unlocks/orbital_battleship_up_unlock/orbital_battleship_up_unlock.json"],
    true],

    //LR_ballistic_missile_unlock
    ["/pa/units/arsenal/unlocks/nuke_unlock/nuke_unlock.json",
    ["/pa/units/land/nuke_launcher/nuke_launcher.json", "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json", "/pa/units/land/shah/shah.json", "/pa/units/arsenal/unlocks/nuke_ammo_unlock/nuke_ammo_unlock.json", "/pa/units/arsenal/unlocks/nuke_ammo_unlock/nuke_ammo_arsenal.json", "/pa/units/arsenal/unlocks/hype_ammo_unlock/hype_ammo_unlock.json", "/pa/units/arsenal/unlocks/hype_ammo_unlock/hype_ammo_arsenal.json"],
    ["/pa/units/arsenal/unlocks/nuke_unlock/nuke_unlock.json"],
    false],

    //nuke_launcher_up
    ["/pa/units/arsenal/unlocks/nuke_ammo_unlock/nuke_ammo_unlock.json",
    ["/pa/units/land/nuke_launcher/nuke_launcher_up.json"],
    ["/pa/units/land/nuke_launcher/nuke_launcher.json", "/pa/units/arsenal/unlocks/nuke_ammo_unlock/nuke_ammo_unlock.json"],
    true],

    //hype_ammo_unlock
    ["/pa/units/arsenal/unlocks/hype_ammo_unlock/hype_ammo_unlock.json",
    ["/pa/units/land/missile_facility/large_dot_ammo.json", "/pa/units/land/missile_facility/precision_strike_ammo.json", "/pa/units/land/missile_facility/large_stun_ammo.json", "/pa/units/air/yellowjacket/yellowjacket.json"],
    ["/pa/units/arsenal/unlocks/hype_ammo_unlock/hype_ammo_unlock.json"],
    false],

    //anti_nuke_up
    ["/pa/units/arsenal/unlocks/anti_nuke_up_unlock/anti_nuke_up_unlock.json",
    ["/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_up.json", "/pa/units/land/tank_anti_nuke/tank_anti_nuke_up.json"],
    ["/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json", "/pa/units/land/tank_anti_nuke/tank_anti_nuke.json", "/pa/units/arsenal/unlocks/anti_nuke_up_unlock/anti_nuke_up_unlock.json"],
    true],

    //gunship_up
    ["/pa/units/arsenal/unlocks/gunship_up_unlock/gunship_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/gunship_up/gunship_up.json"],
    ["/pa/units/air/gunship/gunship.json","/pa/units/arsenal/unlocks/gunship_up_unlock/gunship_up_unlock.json"],
    true],

    //bot_sniper_up
    ["/pa/units/arsenal/unlocks/bot_sniper_up_unlock/bot_sniper_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/bot_sniper_up/bot_sniper_up.json"],
    ["/pa/units/land/bot_sniper/bot_sniper.json","/pa/units/arsenal/unlocks/bot_sniper_up_unlock/bot_sniper_up_unlock.json"],
    true],

    //tank_light_laser_up
    ["/pa/units/arsenal/unlocks/tank_light_laser_up_unlock/tank_light_laser_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/tank_light_laser_up/tank_light_laser_up.json"],
    ["/pa/units/land/tank_light_laser/tank_light_laser.json","/pa/units/arsenal/unlocks/tank_light_laser_up_unlock/tank_light_laser_up_unlock.json"],
    true],

    //tank_hover_up
    ["/pa/units/arsenal/unlocks/tank_hover_up_unlock/tank_hover_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/tank_hover_up/tank_hover_up.json"],
    ["/pa/units/land/tank_hover/tank_hover.json","/pa/units/arsenal/unlocks/tank_hover_up_unlock/tank_hover_up_unlock.json","/pa/units/arsenal/unlocks/tank_hover_up_unlock/tank_hover_up_arsenal.json"],
    true],

    //tank_heavy_mortar_up
    ["/pa/units/arsenal/unlocks/tank_heavy_mortar_up_unlock/tank_heavy_mortar_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/tank_heavy_mortar_up/tank_heavy_mortar_up.json"],
    ["/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json","/pa/units/arsenal/unlocks/tank_heavy_mortar_up_unlock/tank_heavy_mortar_up_unlock.json"],
    true],
    
    //assault_bot_adv_up
    ["/pa/units/arsenal/unlocks/assault_bot_adv_up_unlock/assault_bot_adv_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/assault_bot_adv_up/assault_bot_adv_up.json"],
    ["/pa/units/land/assault_bot_adv/assault_bot_adv.json","/pa/units/arsenal/unlocks/assault_bot_adv_up_unlock/assault_bot_adv_up_unlock.json"],
    true],

    //assault_bot_up
    ["/pa/units/arsenal/unlocks/assault_bot_up_unlock/assault_bot_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/assault_bot_up/assault_bot_up.json"],
    ["/pa/units/land/assault_bot/assault_bot.json","/pa/units/arsenal/unlocks/assault_bot_up_unlock/assault_bot_up_unlock.json"],
    true],

    //bot_rpg_up
    ["/pa/units/arsenal/unlocks/bot_rpg_up_unlock/bot_rpg_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/bot_rpg_up/bot_rpg_up.json"],
    ["/pa/units/land/bot_rpg/bot_rpg.json","/pa/units/arsenal/unlocks/bot_rpg_up_unlock/bot_rpg_up_unlock.json"],
    true],

    //bot_grenadier_up
    ["/pa/units/arsenal/unlocks/bot_grenadier_up_unlock/bot_grenadier_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/bot_grenadier_up/bot_grenadier_up.json"],
    ["/pa/units/land/bot_grenadier/bot_grenadier.json","/pa/units/arsenal/unlocks/bot_grenadier_up_unlock/bot_grenadier_up_unlock.json"],
    true],

    //adv_heavy_bot_up
    ["/pa/units/arsenal/unlocks/adv_heavy_bot_up_unlock/adv_heavy_bot_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/adv_heavy_bot_up/adv_heavy_bot_up.json"],
    ["/pa/units/land/adv_heavy_bot/adv_heavy_bot.json","/pa/units/arsenal/unlocks/adv_heavy_bot_up_unlock/adv_heavy_bot_up_unlock.json"],
    true],

    //tank_laser_adv_up
    ["/pa/units/arsenal/unlocks/tank_laser_adv_up_unlock/tank_laser_adv_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/tank_laser_adv_up/tank_laser_adv_up.json"],
    ["/pa/units/land/tank_laser_adv/tank_laser_adv.json","/pa/units/arsenal/unlocks/tank_laser_adv_up_unlock/tank_laser_adv_up_unlock.json"],
    true],

    //tank_heavy_armor_up
    ["/pa/units/arsenal/unlocks/tank_heavy_armor_up_unlock/tank_heavy_armor_up_unlock.json",
    ["/pa/units/arsenal/unlocked_units/tank_heavy_armor_up/tank_heavy_armor_up.json"],
    ["/pa/units/land/tank_heavy_armor/tank_heavy_armor.json","/pa/units/arsenal/unlocks/tank_heavy_armor_up_unlock/tank_heavy_armor_up_unlock.json"],
    true]
]

//for circular research the older ones need to be deleted if a newer research is done.
model.deleteOldPairs = [

]

model.reLockUnits = function(){
    model.lockedUnits.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
      

    })
}
var hasPrinted = false;

model.unitCommand = function(unitId, unitState, commandType){
    if(hasPrinted == false){console.log(unitId,unitState,commandType);hasPrinted = true}
    if(commandType == "altFireSelf"){
        order = {
            units: [unitId],
            command: 'fire_secondary_weapon',
            location: {      
                planet: unitState.planet,
                multi_pos: [unitState.pos,unitState.pos]
            },                       
            queue: true
        }
        api.getWorldView(0).sendOrder(order);
    }
    else{return}
}

researchLoop = function(){
   
    model.unitsToLock.forEach(function(unit){
       
        api.Panel.message("build_bar", 'lockUnit',unit)
        model.lockedUnits.push(unit)

    })
    model.unitsToLock = []
    
    if(model.lockedUnits.length > 0){
       
        var armyPromise = model.allPlayerArmy(model.armyIndex())
        
        armyPromise.then(function(result){
            
            var armyKeys = _.keys(result)
            model.unitsToCommand.forEach(function(unitCommandArray){
                var unitSpec = unitCommandArray[0]
                var unitCommand = unitCommandArray[1]
                var unitDataPromise = api.getWorldView(0).getUnitState(result[unitSpec])
                unitDataPromise.then(function(ready){
     
                    for(var i = 0; i<ready.length;i++){
                        model.unitCommand(result[unitSpec][i],ready[i],unitCommand)
                    }

                })
            })
            model.unlockPairs.forEach(function(pair){
              
                
                if(_.contains(model.lockedUnits,pair[1][0])){//if the pair is not already unlocked
                
                 
                    if(_.contains(armyKeys,pair[0])){//unlock unit exists so unit should be unlocked
                      
                        var armyDataPromise = api.getWorldView(0).getUnitState(result[pair[0]])
                        armyDataPromise.then(function(result){
                       
                        if(result[0].built_frac == undefined){
                      
                        //if the unlock should actually be a replace
                        if(pair[3] !== true){
                        pair[1].forEach(function(unit){
                            console.log("unlocking ",unit) // Corrected logging
                            api.Panel.message("build_bar", 'unlockUnit',unit)
                            api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                     
                        })
                        if(pair[2] !== undefined){
                            pair[2].forEach(function(unit){
                                console.log("locking ",unit) // Corrected logging
                                api.Panel.message("build_bar", 'lockUnit',unit)
                                model.lockedUnits.push(unit)
                            })

                        }}
                        else{
                            console.log("replacing units")
                            for(var i = 0; i< pair[2].length;i++){
                                if(pair[1][i] == pair[2][i] && pair[1][i] !== undefined){//needed for more unlocks combined with replace
                                    api.Panel.message("build_bar", 'unlockUnit',pair[1][i])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                                else if(pair[1][i] !== undefined){//matching replace
                                 
                                    api.Panel.message("build_bar", 'replaceUnit',[[pair[2][i]],[pair[1][i]], pair[3]])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                                else{//lock the pair 2 as it has no match
                                   
                                    api.Panel.message("build_bar", 'lockUnit',pair[2][i])
                                    api.Panel.message(api.panels["LiveGame_FloatZone"].id, 'unlockResearch', pair[0]);
                                }
                            }
                        }

                        if(model.clearConsumedTriggerQueue){
                            model.clearConsumedTriggerQueue(pair[0]);
                        }



                        for(var i = 0;i<model.lockedUnits.length;i++){
                           // console.log(lockedUnits[i],pair[1])
                           pair[1].forEach(function(unit){
                            if(model.lockedUnits[i] == unit){
                                model.lockedUnits.splice(i,1)
                            }
                        })
                        
                     
                        
                           
                        }

                        }
                        })
                        
                    }
                    
                }
        
            })

        })
        
    }
    

    _.delay(researchLoop,1000)

}



_.delay(researchLoop,1000)


var world = api.getWorldView(0)

// the below is yoinked from scenarios, it is not really needed to be this complex for research


var unitJsons = model.unitSpecs//I think this has a list of unit keys that then have types

model.allPlayerArmy = function(playerId,unitType, stateFlag,unitTypeValue){
    var planets = model.planetListState()
    var promiseArray = [];
    for(planet in planets.planets){
        planet = planets.planets[planet]
        if(planet.id !== undefined || planet.id === 0){
            var chosenPlanet = planet.index;
        }
        else{continue}

        promiseArray.push(model.playerArmy(playerId, chosenPlanet,unitType, stateFlag,unitTypeValue))
    }
    var allPlanetArmyPromise = Promise.all(promiseArray)
    return allPlanetArmyPromise.then(function(result){
        var finalUnits = {};
        for(army in result){// for each player planet
            var armyKeys = _.keys(result[army])
           

            for(unit in armyKeys){//for each unit on a planet
              
                if(!(armyKeys[unit] in finalUnits)){finalUnits[armyKeys[unit]] = []};//if 
               
                
                for(i in result[army][armyKeys[unit]]){
                 
                    finalUnits[armyKeys[unit]].push(result[army][armyKeys[unit]][i])
                }
               
            
        }
    }
      
        return finalUnits;

    })

}
model.playerArmy = function(playerId, planetId,unitType, stateFlag,unitTypeValue){

    if(unitJsons == undefined){unitJsons = model.unitSpecs}
    var one = !_.isArray(unitType);
    if (one){
        unitType = [unitType];

    }
    var one = !_.isArray(unitTypeValue);
    if (one){
        unitTypeValue = [unitTypeValue];

    }

    var promise = new Promise(function(resolve,reject){

        if(world){

            if(stateFlag !== true){
                
            
                
                var promise2 = world.getArmyUnits(playerId,planetId).then(function (result){
                   
                   
                    if(unitType.length>0 && unitType[0] !== "" && unitType[0] !== undefined){
                 
                        var finalResult = {};
                        
                        for(var i = 0;i<unitType.length;i++){

                            finalResult[unitType[i]] = result[unitType[i]]

                        }
                       
                        result =  finalResult;
                    }
                
                    if(unitTypeValue.length>0 && unitTypeValue[0] !== "" && unitTypeValue[0] !== undefined){
                      
         
                        var finalResult = {};
                        var jsonKeys = _.keys(unitJsons)
                        for(var i = 0;i<jsonKeys.length;i++){
                            var matchedValue = 0;
                            for(var j = 0;j<unitTypeValue.length;j++){
                                
                                if(_.contains(unitJsons[jsonKeys[i]].types,unitTypeValue[j])){//check if each unit json contains every type in the value array
                                  
                                    //if(_.contains(unitJsons[jsonKeys[i]].types,"UNITTYPE_NoBuild")){continue}
                                    matchedValue++;
                             
                                }
                            }
                            
                           
                            if(matchedValue == unitTypeValue.length && result[jsonKeys[i]] !== undefined){finalResult[jsonKeys[i]] = result[jsonKeys[i]]}
                        }
                     
                        result = finalResult;

                    }
               

                    return result
                
                
                
                
                })
           
                resolve(promise2)
            
            
            
            }//TODO add unit filter here
    
            else{
         
                    var promise2 = world.getArmyUnits(playerId,planetId).then(function(result){ 
    
                    var unitArray = [];
                    
                    if(unitType.length>0 && unitType[0] !== "" && unitType[0] !== undefined){
                        
                        var finalResult = {};
                        
                        for(var i = 0;i<unitType.length;i++){

                            finalResult[unitType[i]] = result[unitType[i]]

                        }
                      
                        result =  finalResult;
                    }
                 
                    if(unitTypeValue.length>0 && unitTypeValue[0] !== "" && unitTypeValue[0] !== undefined){
         
                        var finalResult = {};
                        var jsonKeys = _.keys(unitJsons)
                        for(var i = 0;i<jsonKeys.length;i++){
                            var matchedValue = 0;
                            for(var j = 0;j<unitTypeValue.length;j++){
                                
                                if(_.contains(unitJsons[jsonKeys[i]].types,unitTypeValue[j])){//check if each unit json contains every type in the value array
                                    matchedValue++;
                             
                                }
                            }
                            if(matchedValue == unitTypeValue.length && result[jsonKeys[i]] !== undefined){finalResult[jsonKeys[i]] = result[jsonKeys[i]]}
                        }
                        result = finalResult;

                    }
                    
                    armyKeys = _.keys(result)
                    for(var i = 0;i<armyKeys.length;i++){
                        unitArray.push(result[armyKeys[i]])
                    }
                    unitArray = _.flatten(unitArray)
                   
                    return world.getUnitState(unitArray).then(function (ready) {
                        var unitData = this.result;
                        var one = !_.isArray(unitData);
                        if (one){
                                unitData = [unitData];
    
                        }
              
                        
                      return unitData;
                    }
                    
                   
                    )
                })
                
            }
          
            promise2.then(function(result){resolve(result)})
    
        }

    })

    promise.then(function(result){return result})
    
    return promise;
   


}



handlers.buildRestart = function(payload){//build ui has restarted so tell it what to lock again
    model.reLockUnits();
}

// ===== Research Map Panel Integration =====

/**
 * Helper function to get the current set of researched trigger specs.
 * Deduplicates and returns only unique research/upgrade specs that have been completed.
 */
model.getResearchedTriggers = function() {
    var researchedSet = {};
    var armyPromise = model.allPlayerArmy(model.armyIndex());

    return armyPromise.then(function(result) {
        var armyKeys = _.keys(result);
        console.log('[Research Tracker] Army has ' + armyKeys.length + ' unique specs');

        // Iterate through unlockPairs to find what we've researched
        var researchCount = 0;
        model.unlockPairs.forEach(function(pair) {
            var triggerSpec = pair[0];
            var unlockedUnits = pair[1];

            if (triggerSpec && triggerSpec.length > 0) {
                // Check if trigger spec exists in army (means it was built/completed)
                if (_.contains(armyKeys, triggerSpec)) {
                    researchedSet[triggerSpec] = true;
                    console.log('[Research Tracker] ✓ Researched:', triggerSpec);
                    researchCount++;
                }
            }
        });

        var resultKeys = Object.keys(researchedSet);
        console.log('[Research Tracker] Found ' + resultKeys.length + ' researched specs out of ' + model.unlockPairs.length + ' total pairs');
        return resultKeys;
    });
};

// requestResearchMapState handler is defined in research_live_game.js
// (includes faction availability data alongside researched specs)

