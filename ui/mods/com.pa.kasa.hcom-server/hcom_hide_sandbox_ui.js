(function () {
    'use strict';
    // Loaded as a live_game scene mod, after the base view model exists
    // and before ko.applyBindings(model).
    if (typeof model === 'undefined' || !model || typeof ko === 'undefined') return;

    // Suppress the two stock cheat panels without turning off sandbox
    // in the simulation. Do not change vision/control flags or model.sandbox.
    if (model.sandboxPanelUrl) {
        model.sandboxPanelUrl = ko.pureComputed(function () { return ''; });
    }
    if (model.devModePanelUrl) {
        model.devModePanelUrl = ko.pureComputed(function () { return ''; });
    }

    // These flags are only UI affordances. Keep the underlying game state.
    // In particular, do not override showPlayerVisionFlags or
    // showPlayerControlFlags: other game UI may depend on them.
    if (api.Panel && api.Panel.bindPanels)
        _.delay(api.Panel.bindPanels);
})();
