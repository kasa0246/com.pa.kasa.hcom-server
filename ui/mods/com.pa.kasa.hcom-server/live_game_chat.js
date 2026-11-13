$(document).ready(function () {
    handlers.server_chat = function (message) {
        // message should just be a string
        handlers.chat_message({ type: "server", message: message });
    }

    handlers.server_chat(loc("!LOC:H-COM - Quick Tip No.1:"));
    handlers.server_chat(loc("!LOC:Unit armour type is shown in bottom-left corner of its builbar icon."));
    handlers.server_chat(loc("!LOC:Copper - Light"));
    handlers.server_chat(loc("!LOC:Silver - Medium"));
    handlers.server_chat(loc("!LOC:Gold - Heavy"));
    handlers.server_chat(loc("!LOC:Cyan - Adamantine."));
    handlers.server_chat(loc("!LOC:Armour may significantly reduce damage taken from certain projectiles."));
    handlers.server_chat(loc("!LOC:- Quick Tip No.2:"));
    handlers.server_chat(loc("!LOC:Ammo types used by a unit are shown on the right side of its buildbar icon."));
    handlers.server_chat(loc("!LOC:Ammo types that can be intercepted by a unit are listed on the left (...)"));
    handlers.server_chat(loc("!LOC:Interception tool capabilities may be further specified in the unit description."));
    handlers.server_chat(loc("!LOC:- Quick Tip No.3:"));
    handlers.server_chat(loc("!LOC:You can access unit upgrades and some advanced tech unlocks (eg. nukes) via Arsenal (yellow T2 structure)."));
    handlers.server_chat(loc("!LOC:- Quick Tip No.4:"));
    handlers.server_chat(loc("!LOC:Units that don't fit into conventional category and break the rules of the game have been moved to T3 Experimental Gantry."));
    handlers.server_chat(loc("!LOC:Experimental Sub Comms do have access to experimental structures."));
    handlers.server_chat(loc("!LOC:- Quick Tip No.5:"));
    handlers.server_chat(loc("!LOC:Air layer has been separated from surface - build radars."));
    handlers.server_chat(loc("!LOC:Orbital isn't always visible - build more radars."));
    handlers.server_chat(loc("!LOC:Land mines are invisible - use heavy tanks to plow the ground."));
    handlers.server_chat(loc("!LOC:- Quick Tip No.6:"));
    handlers.server_chat(loc("!LOC:Air units are fragile but have devastating damage outputs - build AA."));
    handlers.server_chat(loc("!LOC:Air units have been split into 2 main groups: High and Low altitude."));
    handlers.server_chat(loc("!LOC:Low altitude air units can attack other air units at the same ALT."));
    handlers.server_chat(loc("!LOC:High ALT units can attack everything that flies."));
    handlers.server_chat(loc("!LOC:Bombs dropped from high ALT fall very slowly and can be dodged or even intercepted."));

});