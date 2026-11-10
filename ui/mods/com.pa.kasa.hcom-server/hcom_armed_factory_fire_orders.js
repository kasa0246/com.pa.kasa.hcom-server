// H-COM: Allow fire orders for stationary factories with weapons.
// Scene: live_game_action_bar
(function () {
    'use strict';
    if (typeof model === 'undefined' || !model || typeof ko === 'undefined') return;
    if (typeof model.allowAttack !== 'function') return;

    // Vanilla hides fire orders when a stationary unit can build.
    // Keep the normal Attack-command check, but remove that exclusion.
    model.allowFireOrders = ko.computed(function () {
        return !!model.allowAttack();
    });
})();
