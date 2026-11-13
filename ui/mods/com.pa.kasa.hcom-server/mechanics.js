(function () {

    loadScript("coui://ui/mods/com.pa.kasa.hcom-server/spec_path.js");

    // ============================================================
    // SHARED UTILITIES
    // ============================================================

    function unitCommand(unitId, unitState, commandType, queueOverride) {
        if (commandType == "altFireSelf") {
            var order = {
                units: [unitId],
                command: 'fire_secondary_weapon',
                location: {
                    planet: unitState.planet,
                    multi_pos: [unitState.pos, unitState.pos]
                },
                queue: queueOverride !== undefined ? queueOverride : true
            };
            api.getWorldView(0).sendOrder(order);
        }
    }

    function doCommand(world, id, planet, usedIdArray, commandType, queueOverride) {
        var two = !_.isArray(id);
        if (two) { id = [id]; }

        if (world) {
            return world.getUnitState(id).then(function (ready) {
                var unitData = this.result;
                var one = !_.isArray(unitData);
                if (one) { unitData = [unitData]; }

                for (var i = 0; i < unitData.length; i++) {
                    if (_.contains(usedIdArray, id[i]) !== true) {
                        if (unitData[i].built_frac == undefined) {
                            if (commandType) {
                                unitCommand(id[i], unitData[i], commandType, queueOverride);
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
        }
    }

    function fetchArmyUnits(worldView, armyindex, callback) {
        if (!worldView) return;
        var planets = model.planetListState();
        if (!planets || !planets.planets) return;

        for (var planetKey in planets.planets) {
            var planet = planets.planets[planetKey];
            if (planet.id !== undefined || planet.id === 0) {
                var currentPlanet = planet.index;
                worldView.getArmyUnits(armyindex, currentPlanet).then(function (ready) {
                    var army = {};
                    _.forOwn(this.result, function (unitIds, specId) {
                        var spec = hcomSpecPath(specId);
                        army[spec] = (army[spec] || []).concat(unitIds);
                    });
                    callback(army, currentPlanet);
                });
            }
        }
    }

    // ============================================================
    // 1. DEFENSES & FAB TOWERS LOOP (Fast: 5 seconds)
    // ============================================================
    var advancedIdArray = [];
    var defenseUnitsToCommand = [
        ["/pa/units/land/air_defense_adv/air_defense_adv_base.json", "altFireSelf"],
        ["/pa/units/land/air_defense_adv/air_defense_adv_base_2.json", "altFireSelf"],
        ["/pa/units/land/bastion/bastion_base.json", "altFireSelf"],
        ["/pa/units/land/bastion/bastion_base_2.json", "altFireSelf"],
        ["/pa/units/land/aa_defense_long/aa_defense_long_base.json", "altFireSelf"],
        ["/pa/units/land/aa_defense_long/aa_defense_long_base_2.json", "altFireSelf"],
        ["/pa/units/land/artillery_short/artillery_short_base.json", "altFireSelf"],
        ["/pa/units/land/artillery_short/artillery_short_base_2.json", "altFireSelf"],
        ["/pa/units/land/energy_plant_adv/energy_plant_adv_base.json", "altFireSelf"],
        ["/pa/units/land/energy_plant_adv/energy_plant_adv_base_2.json", "altFireSelf"],
        ["/pa/units/land/energy_plant_adv/energy_plant_adv_2_base.json", "altFireSelf"],
        ["/pa/units/land/energy_plant_adv/energy_plant_adv_2_base_2.json", "altFireSelf"]
    ];

    var defenseAutomation = function () {
        var worldView = api.getWorldView(0);
        var armyindex = model.armyIndex() !== undefined ? model.armyIndex() : model.armyId();

        if (worldView && armyindex !== undefined) {
            fetchArmyUnits(worldView, armyindex, function (army, currentPlanet) {
                defenseUnitsToCommand.forEach(function (item) {
                    if (army.hasOwnProperty(item[0])) {
                        doCommand(worldView, army[item[0]], currentPlanet, [], item[1], true);
                    }
                });
                if (army.hasOwnProperty('/pa/units/land/fab_tower/fab_tower.json')) {
                    doCommand(worldView, army['/pa/units/land/fab_tower/fab_tower.json'], currentPlanet, advancedIdArray).then(function (result) {
                        advancedIdArray = result;
                    });
                }
            });
        }
        _.delay(defenseAutomation, 5000);
    };

    // ============================================================
    // 2. SOLAR MECHANICS LOOP (Steady: 60 seconds)
    // ============================================================
    var solarUnitsToCommand = [
        ["/pa/units/land/solar_cell/solar_cell.json", "altFireSelf"]
    ];

    var solarAutomation = function () {
        var worldView = api.getWorldView(0);
        var armyindex = model.armyIndex() !== undefined ? model.armyIndex() : model.armyId();

        if (worldView && armyindex !== undefined) {
            fetchArmyUnits(worldView, armyindex, function (army, currentPlanet) {
                solarUnitsToCommand.forEach(function (item) {
                    if (army.hasOwnProperty(item[0])) {
                        doCommand(worldView, army[item[0]], currentPlanet, [], item[1], false);
                    }
                });
            });
        }
        _.delay(solarAutomation, 60000);
    };

    // ============================================================
    // 3. WIND MECHANICS LOOP (Randomized: 10s - 4 minutes)
    // ============================================================
    var windUnitsToCommand = [
        ["/pa/units/land/wind_turbine/wind_turbine.json", "altFireSelf"]
    ];

    var windAutomation = function () {
        var worldView = api.getWorldView(0);
        var armyindex = model.armyIndex() !== undefined ? model.armyIndex() : model.armyId();

        if (worldView && armyindex !== undefined) {
            fetchArmyUnits(worldView, armyindex, function (army, currentPlanet) {
                windUnitsToCommand.forEach(function (item) {
                    if (army.hasOwnProperty(item[0])) {
                        doCommand(worldView, army[item[0]], currentPlanet, [], item[1], true);
                    }
                });
            });
        }
        var delay = 10000 + Math.random() * 230000;
        _.delay(windAutomation, delay);
    };

    // ============================================================
    // START ALL LOOPS INDEPENDENTLY
    // ============================================================
    defenseAutomation();
    solarAutomation();
    windAutomation();

})();