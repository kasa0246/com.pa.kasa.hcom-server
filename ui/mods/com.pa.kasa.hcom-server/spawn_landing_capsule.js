(function () {
    'use strict';
    var PREFIX = '[Starting Units v8]';
    var STARTING_UNITS = [
        '/pa/units/land/landing_capsule/landing_capsule.json',
        '/pa/units/land/landing_capsule/starting_metal.json',
        '/pa/units/land/landing_capsule/starting_energy.json'
    ];
    var CHECK_INTERVAL = 100;
    var PLANETS = 16;
    var completed = {};
    var busy = false;
    var intervalId;

    function isAI(player) {
        return !!(player && (player.is_ai || player.ai));
    }
    function isPrimarySlot(player) {
        // Like Bug Horde: only the first player in a shared army sends requests.
        if (!player || !Array.isArray(player.slots) || player.slots.length <= 1)
            return true;
        if (typeof model.playerName !== 'function') return false;
        return model.playerName() === player.slots[0];
    }
    function finish() {
        if (intervalId !== undefined) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
        console.log(PREFIX, 'All assigned armies processed; polling stopped');
    }
    function check() {
        if (busy || typeof model === 'undefined' || typeof world === 'undefined' ||
            typeof model.armyIndex !== 'function' || typeof model.players !== 'function' ||
            typeof world.getArmyUnits !== 'function' || typeof world.getUnitState !== 'function' ||
            typeof model.send_message !== 'function') return;
        var players = model.players();
        var localIndex = model.armyIndex();
        if (!players || localIndex < 0 || !players[localIndex]) return;

        // Every human client owns its own army; only one human handles AI armies.
        var aiController = -1;
        for (var h = 0; h < players.length; h++) {
            if (players[h] && players[h].id !== undefined && !isAI(players[h])) {
                aiController = h;
                break;
            }
        }
        var targets = [];
        players.forEach(function (player, index) {
            if (!player || player.id === undefined || completed[index]) return;
            if (index === localIndex && !isAI(player) && isPrimarySlot(player))
                targets.push(index);
            else if (isAI(player) && localIndex === aiController && isPrimarySlot(players[localIndex]))
                targets.push(index);
        });
        if (!targets.length) {
            // Do not exit before the roster is populated. A non-primary shared-army
            // client has no spawning work of its own.
            if (aiController !== -1) finish();
            return;
        }
        busy = true;
        var jobs = [];
        targets.forEach(function (armyIndex) {
            var player = players[armyIndex];
            for (var planet = 0; planet < PLANETS; planet++) {
                (function (armyIndex, planet, player) {
                    jobs.push(Promise.resolve().then(function () {
                        return world.getArmyUnits(armyIndex, planet);
                    }).then(function (unitMap) {
                        if (!unitMap || completed[armyIndex]) return;
                        var ids = (unitMap['UNITTYPE_Commander'] || []).slice();
                        if (!ids.length) Object.keys(unitMap).forEach(function (key) {
                            if (key.indexOf('/commanders/') !== -1 && Array.isArray(unitMap[key]))
                                ids = ids.concat(unitMap[key]);
                        });
                        if (!ids.length) return;
                        return Promise.resolve(world.getUnitState(ids[0])).then(function (state) {
                            if (!state || !state.pos || completed[armyIndex]) return;
                            completed[armyIndex] = true;
                            console.log(PREFIX, 'Commander found', armyIndex, 'planet', planet);
                            STARTING_UNITS.forEach(function (unitPath) {
                                var payload = {
                                    army: player.id, what: unitPath, planet: planet,
                                    location: state.pos, orientation: [0, 0, 0]
                                };
                                console.log(PREFIX, 'create_unit', JSON.stringify(payload));
                                model.send_message('create_unit', payload);
                            });
                        });
                    }).catch(function (error) {
                        console.warn(PREFIX, 'Query failed', armyIndex, planet, error);
                    }));
                })(armyIndex, planet, player);
            }
        });
        Promise.all(jobs).then(function () {
            busy = false;
        }, function (error) {
            busy = false;
            console.warn(PREFIX, 'Batch failed', error);
        });
    }
    console.log(PREFIX, 'Loaded: local human armies, designated AI controller, no timeout');
    intervalId = setInterval(check, CHECK_INTERVAL);
    check();
})();
