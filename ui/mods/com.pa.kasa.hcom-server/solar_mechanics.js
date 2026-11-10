(function() {

    loadScript("coui://ui/mods/com.pa.kasa.hcom-server/spec_path.js");

    // Configuration for units that should automatically fire weapons
    var unitsToCommand = [
        ["/pa/units/land/solar_cell/solar_cell.json", "altFireSelf"]
    ];

    // Weapon command function - handles automatic weapon firing
    function unitCommand(unitId, unitState, commandType){
        if(commandType == "altFireSelf"){
            var order = {
                units: [unitId],
                command: 'fire_secondary_weapon',
                location: {
                    planet: unitState.planet,
                    multi_pos: [unitState.pos, unitState.pos]
                },
                queue: false
            };

            api.getWorldView(0).sendOrder(order);
        }
    }

    // Handles automatic commands for configured units
    function doCommand(world, id, planet, usedIdArray, commandType){
        var two = !_.isArray(id);

        if(two){
            id = [id];
        }

        if(world){
            return world.getUnitState(id).then(function(ready) {

                var unitData = this.result;
                var one = !_.isArray(unitData);

                if(one){
                    unitData = [unitData];
                }

                for(var i = 0; i < unitData.length; i++){

                    if(_.contains(usedIdArray, id[i]) !== true){

                        if(unitData[i].built_frac == undefined){

                            if(commandType){
                                unitCommand(
                                    id[i],
                                    unitData[i],
                                    commandType
                                );
                            }

                            usedIdArray.push(id[i]);
                        }
                    }
                }

                return usedIdArray;
            });
        } else {
            return;
        }
    }

    // Process configured automatic units
    function processWeaponUnits(worldView, army, currentPlanet) {

        unitsToCommand.forEach(function(unitCommandArray){

            var unitSpec = unitCommandArray[0];
            var unitCommand = unitCommandArray[1];

            if(army.hasOwnProperty(unitSpec)){

                doCommand(
                    worldView,
                    army[unitSpec],
                    currentPlanet,
                    [],
                    unitCommand
                );
            }
        });
    }

    // Main automation loop
    var automation = function(){

        var worldView = api.getWorldView(0);
        var armyindex = model.armyIndex();

        if(typeof armyindex == "undefined"){
            armyindex = model.armyId();
        }

        if(worldView){

            if(model){

                var planets = model.planetListState();

                for(var planetKey in planets.planets){

                    var planet = planets.planets[planetKey];

                    if(planet.id !== undefined || planet.id === 0){

                        // Capture this planet's index locally.
                        // This prevents asynchronous callbacks from
                        // accidentally using another planet's index.
                        var currentPlanet = planet.index;

                        worldView.getArmyUnits(
                            armyindex,
                            currentPlanet
                        ).then(function(ready){

                            var army = {};

                            _.forOwn(
                                this.result,
                                function(unitIds, specId){

                                    var spec = hcomSpecPath(specId);

                                    army[spec] =
                                        (army[spec] || []).concat(unitIds);
                                }
                            );

                            // Process solar units on this specific planet
                            processWeaponUnits(
                                worldView,
                                army,
                                currentPlanet
                            );
                        });
                    }
                }
            }

            // Run again after 60 seconds
            _.delay(automation, 60000);

        } else {

            // Try again after 60 seconds if WorldView isn't available
            _.delay(automation, 60000);
        }
    };

    // Start solar automation
    automation();

})();