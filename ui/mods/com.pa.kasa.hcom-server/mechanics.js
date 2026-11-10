(function() {

    loadScript("coui://ui/mods/com.pa.kasa.hcom-server/spec_path.js");

    // ============================================================
    //  UNIT LIST
    // ============================================================

    // Units that should automatically activate their secondary weapon
    var unitsToCommand = [
        ["/pa/units/land/air_defense_adv/air_defense_adv_base.json", "altFireSelf"],
        ["/pa/units/land/air_defense_adv/air_defense_adv_base_2.json", "altFireSelf"],
        ["/pa/units/land/bastion/bastion_base.json", "altFireSelf"],
        ["/pa/units/land/bastion/bastion_base_2.json", "altFireSelf"],
        ["/pa/units/land/aa_defense_long/aa_defense_long_base.json", "altFireSelf"],
        ["/pa/units/land/aa_defense_long/aa_defense_long_base_2.json", "altFireSelf"],
        ["/pa/units/land/energy_plant_adv/energy_plant_adv_base.json", "altFireSelf"],
        ["/pa/units/land/energy_plant_adv/energy_plant_adv_base_2.json", "altFireSelf"],
        ["/pa/units/land/energy_plant_adv/energy_plant_adv_2_base.json", "altFireSelf"],
        ["/pa/units/land/energy_plant_adv/energy_plant_adv_2_base_2.json", "altFireSelf"]
    ];


    // ============================================================
    // WEAPON COMMAND
    // ============================================================

    function unitCommand(unitId, unitState, commandType){

        if(commandType == "altFireSelf"){

            var order = {
                units: [unitId],
                command: 'fire_secondary_weapon',
                location: {
                    planet: unitState.planet,
                    multi_pos: [unitState.pos, unitState.pos]
                },
                queue: true
            };

            api.getWorldView(0).sendOrder(order);
        }
    }


    // ============================================================
    // GENERAL COMMAND HANDLER
    // Handles both weapon activation and fab patrol
    // ============================================================

    function doCommand(world, id, planet, usedIdArray, commandType){

        var two = !_.isArray(id);

        if(two){
            id = [id];
        }

        if(world){

            return world.getUnitState(id).then(function(ready){

                var unitData = this.result;
                var one = !_.isArray(unitData);

                if(one){
                    unitData = [unitData];
                }

                for(var i = 0; i < unitData.length; i++){

                    if(_.contains(usedIdArray, id[i]) !== true){

                        if(unitData[i].built_frac == undefined){

                            // Orbital shield / weapon command
                            if(commandType){

                                unitCommand(
                                    id[i],
                                    unitData[i],
                                    commandType
                                );

                            // Fab tower patrol command
                            } else {

                                api.getWorldView(0).sendOrder({
                                    units: id[i],
                                    command: 'patrol',
                                    location: {
                                        planet: unitData[i].planet,
                                        pos: unitData[i].pos
                                    },
                                    queue: false
                                });
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


    // ============================================================
    // PROCESS UNITS
    // ============================================================

    function processWeaponUnits(worldView, army, currentPlanet){

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


    // ============================================================
    // TRACKING VARIABLES
    // ============================================================

    var advancedIdArray = [];


    // ============================================================
    // MAIN AUTOMATION
    // ============================================================

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

                        // Keep this planet index local to the callback
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


                            // ====================================================
                            // WEAPON AUTOMATION
                            // ====================================================

                            processWeaponUnits(
                                worldView,
                                army,
                                currentPlanet
                            );


                            // ====================================================
                            // FAB TOWER AUTOMATION
                            // ====================================================

                            if(army.hasOwnProperty(
                                '/pa/units/land/fab_tower/fab_tower.json'
                            )){

                                doCommand(
                                    worldView,
                                    army['/pa/units/land/fab_tower/fab_tower.json'],
                                    currentPlanet,
                                    advancedIdArray
                                ).then(function(result){

                                    advancedIdArray = result;

                                });
                            }

                        });
                    }
                }
            }

            // Run every 5 seconds
            _.delay(automation, 5000);

        } else {

            _.delay(automation, 5000);
        }
    };


    // Start automation
    automation();

})();