(function () {
    'use strict';
    // Loaded by the new_game scene after the base model is constructed.
    if (typeof model === 'undefined' || !model || !model.sandbox || !model.changeSettings) return;
    var applying = false;
    function forceSandbox() {
        if (applying || !model.isGameCreator || !model.isGameCreator()) return;
        if (model.sandbox()) return;
        applying = true;
        model.sandbox(true);
        model.changeSettings();
        applying = false;
    }
    // Keep the lobby state enabled even when a host tries to toggle it off.
    model.sandbox.subscribe(function (value) {
        if (!value) forceSandbox();
    });
    if (model.isGameCreator && model.isGameCreator.subscribe)
        model.isGameCreator.subscribe(function (value) { if (value) forceSandbox(); });
    // Initial lobby state can arrive after this script runs.
    var originalServerState = handlers.server_state;
    if (typeof originalServerState === 'function') {
        handlers.server_state = function () {
            var result = originalServerState.apply(this, arguments);
            forceSandbox();
            return result;
        };
    }
    forceSandbox();
})();
