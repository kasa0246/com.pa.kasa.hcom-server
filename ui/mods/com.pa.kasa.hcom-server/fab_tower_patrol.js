(function() {

    loadScript("coui://ui/mods/com.pa.kasa.hcom-server/spec_path.js");

    // Keeps track of fab towers that have already received a patrol order
    var advancedIdArray = [];

    // Handles automatic fab tower patrol commands
    function doCommand(world, id, planet, usedIdArray){

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

                            // Send patrol order to the fab tower
                            api.getWorldView(0).sendOrder({
                                units: id[i],
                                command: 'patrol',
                                location: {
                                    planet: unitData[i].planet,
                                    pos: unitData[i].pos
                                },
                                queue: false
                            });

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

                            // Fab tower automation
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

            // Run every 10 seconds
            _.delay(automation, 10000);

        } else {

            _.delay(automation, 10000);
        }
    };

    automation();

})();