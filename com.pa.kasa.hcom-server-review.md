# Mod Review — Hardcore Combat Overhaul Mod - server

**Verdict: Will not load correctly.** 1 Blocker: registered units reference 24 files that the mod pair and the base game do not supply.

| | |
|---|---|
| Identifier | `com.pa.kasa.hcom-server` |
| Version | 1.1.0 |
| Context | server |
| Commit reviewed | `cc830af (2026-11-11)` |
| Files reviewed | 1206 |
| Base-game files shadowed | 329 |
| Base game | `c:\Program Files (x86)\Steam\steamapps\common\Planetary Annihilation Titans\media` (given with `--media`, build 124705) |
| Reviewed | 2026-11-10 |

This report covers the server half of H-COM. The client half has a separate report: `com.pa.kasa.hcom-client-review.md`. Three findings of the client report also need a change in this mod:

- Client CON-010: the AutoFactory folder.
- Client BUG-008: the scene entries for scripts that are in this mod.
- Client CON-011: the tips script.

## Summary

| Severity | Count |
|---|---|
| Blocker | 1 |
| Bug | 6 |
| Area of Concern | 4 |
| Compliance | 3 |
| Maintenance Risk | 1 |
| Code Quality | 3 |
| Unverified | 1 |

One finding can group many files. The **Occurrences** line of each finding gives the number.

| ID | Severity | Location | Finding |
|---|---|---|---|
| BLO-001 | Blocker | `pa/units/**` (24 paths) | Registered units reference 24 files that do not exist |
| BUG-002 | Bug | `ui/mods/com.pa.kasa.hcom-server/spawn_landing_capsule.js:11` | The starting units spawn again each time the game UI loads |
| BUG-003 | Bug | `anti_entity_targets` (5 paths) | Interception lists name 5 ammo specs that do not exist |
| BUG-004 | Bug | `modinfo.json` (`icon`) | The `icon` URL returns a web page, not an image |
| BUG-005 | Bug | `pa/units/**` (8 files) | `tools[n].record_index` must be <= 3 |
| BUG-006 | Bug | `pa/units/**` (3 files) | `recon.observer.items[n].shape` value "radar" is not one of: "sphere", "capsule" |
| BUG-007 | Bug | `pa/units/land/unit_cannon/unit_cannon_deploy.json` | `splash_damages_allies` expected type boolean, found string |
| CON-008 | Area of Concern | `hcom_force_sandbox.js:6` | Forced sandbox mode gives each player the stock cheat commands |
| CON-009 | Area of Concern | `mechanics.js:154` | AI armies do not get the mechanics that run in a player's UI |
| CON-010 | Area of Concern | `pa/units/**` (20 specs) | Unit spec is not listed in the mod's unit_list.json |
| CON-011 | Area of Concern | `pa/units/arsenal/unlocks/*/*_arsenal.json` (18 specs) | No builder appears able to build the 18 arsenal unlock structures, and their model file does not exist |
| COM-012 | Compliance | `LICENSE`, `credits.txt` | The MIT licence covers third-party files that have other licences or no licence |
| COM-013 | Compliance | `modinfo.json` | Prohibited category "server" |
| COM-014 | Compliance | `pa/units/**` (21 paths) | Path contains uppercase characters |
| MAI-015 | Maintenance Risk | 325 base-game files | Shadows 325 base-game files that have no interception point |
| QUA-016 | Code Quality | 4 files | Shadows a base-game file without changing it |
| QUA-017 | Code Quality | `pa/units/**`, `ui/mods/**` | Files that nothing appears to reference |
| QUA-018 | Code Quality | `ui/mods/com.pa.kasa.hcom-server/*.js` | The arsenal and mechanics scripts keep stale copies and leftover data |
| UNV-019 | Unverified | `modinfo.json` | Server mod conduct rules need manual confirmation |

## Blocker

> Prevents loading, or crashes/halts JSON or JS processing, or the mod has no usable `forum` link.

### BLO-001 — Registered units reference 24 files that do not exist

**Location:** `pa/units/**`. The table gives each file.

**Occurrences:** 24 missing files, referenced by 36 specs

**Found:** The review started at the 368 entries of `pa/units/unit_list.json`. It followed each `/pa/...` path through the specs of this mod, the client mod and the base game. 24 paths in the specs of this mod resolve to no file in those three places. The CLI reported 12 of these paths. The reference walk found the other 12 paths in keys that the CLI does not resolve.

The review then applied a build test to each row. A missing file is a defect only if a player can get a unit that needs the file when H-COM is the only mod. The test started at the 82 commander specs and the three units that `spawn_landing_capsule.js` creates. For each builder, it evaluated `buildable_types` against the `unit_types` of the 368 registered units. It also followed `spawn_unit_on_death` and `factory.initial_build_spec`. By these routes a player can get 338 of the 368 registered units. The builders are H-COM units, so no other mod is necessary to get them. This test is a static evaluation of the specs. It is not a test in the game. Each row in the table passed the test: the fourth column names a unit that needs the file and that a player can build. One more missing file did not pass the test, and CON-011 has it.

| Missing file | Key | Referenced by | Unit that a player can build | Note |
|---|---|---|---|---|
| `/pa/effects/specs/flame_death.pfx` | `effect_spec` | 1: `pa/units/land/demi_titan_bot/demi_titan_bot_ammo.json` | `demi_titan_bot.json` | A file with this path is in Legion Expansion. |
| `/pa/effects/specs/st_explosion.pfx` | `effect_spec` | 2: `pa/units/land/spell_heal/spell_heal.json`, `pa/units/land/spell_heal/spell_heal_bal.json` | `control_tower.json` and 7 more | A file with this path is in Osmech. |
| `/pa/units/air/bomber/bomber_ammo_hit.pfx` | `effect_spec` | 2: `pa/units/thorosmen/bunker_build/bunker_build_ammo.json`, `pa/units/thorosmen/bunker_build/bunker_build_ammo_orb.json` | `bunker_build.json` | A file with this path is in Legion Expansion and Osmech. Found by the reference walk. |
| `/pa/units/air/fighter/fighter_ammo_trail.pfx` | `filename` | 2: `pa/units/arsenal/unlocked_units/bot_rpg_up/bot_rpg_up_ammo.json`, `pa/units/land/bot_rpg/bot_rpg_ammo.json` | `bot_rpg.json` and 1 more | A file with this path is in More Pew Pew. Found by the reference walk. |
| `/pa/units/air/fighter/hover_ship_muzzle_flash_side.pfx` | `effect_spec` | 1: `pa/units/air/fighter/fighter.json` | `fighter.json` |  |
| `/pa/units/air/fighter_adv/chaff/chaff.pfx` | `filename` | 1: `pa/units/air/fighter_adv/chaff/chaff.json` | `fighter_adv.json` | Found by the reference walk. |
| `/pa/units/air/fighter_adv/chaff/chaff_death_tool_weapon.json` | `spec_id` | 1: `pa/units/air/fighter_adv/chaff/chaff.json` | `fighter_adv.json` |  |
| `/pa/units/air/fighter_adv/chaff/chaff_hit.pfx` | `effect_spec` | 1: `pa/units/air/fighter_adv/chaff/chaff.json` | `fighter_adv.json` |  |
| `/pa/units/base/stun/stun_ammo.json` | `ammo_id` | 1: `pa/units/base/dot_huge/dot_huge_death_weapon.json` | `nuke_launcher.json` and 1 more | A file with this path is in Exiles. |
| `/pa/units/land/energy_coil/l_tank_swarm_fire.pfx` | `effect_spec` | 2: `pa/units/land/spell_heal/spell_heal.json`, `pa/units/land/spell_heal/spell_heal_bal.json` | `control_tower.json` and 7 more | The file name has a Legion prefix. |
| `/pa/units/land/fabrication_bot_combat/fabrication_bot_combat_ammo_trail.pfx` | `filename` | 1: `pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv_antimine_ammo.json` | `fabrication_bot_combat_adv.json` | Found by the reference walk. |
| `/pa/units/land/fabrication_bot_combat/fabrication_bot_combat_tool_weapon.json` | `spec_id` | 1: `pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json` | `fabrication_bot_combat.json` |  |
| `/pa/units/land/l_air_defense_adv/launch_smoke.pfx` | `effect_spec` | 1: `pa/units/upgrades/aa_defense_long_2/aa_defense_long_2.json` | `aa_defense_long_2.json` | A file with this path is in Legion Expansion. |
| `/pa/units/land/metal_extractor/metal_depo_tool_weapon_dummy.json` | `spec_id` | 6: `pa/units/land/energy_plant/energy.json`, `pa/units/land/energy_plant_adv/energy_adv.json`, `pa/units/land/energy_plant_adv/energy_adv_2.json` and 3 more | `energy.json` and 5 more | Commit `cc830af` (2026-11-11, "removed metal depo unused files") deleted this file. |
| `/pa/units/land/metal_generator/metal_gen_death_effect.json` | `effect_spec` | 1: `pa/units/land/adv_metal_generator/adv_metal_generator_boom_ammo.json` | `adv_metal_generator.json` | Found by the reference walk. |
| `/pa/units/land/orbital_shield/shield_off.pfx` | `effect_spec` | 1: `pa/units/land/orbital_shield/orbital_shield_2.json` | `orbital_shield_2.json` |  |
| `/pa/units/land/spell_heal/spell_heal_anim_end.papa` | `end` | 2: `pa/units/land/spell_heal/spell_heal.json`, `pa/units/land/spell_heal/spell_heal_bal.json` | `control_tower.json` and 7 more | Found by the reference walk. |
| `/pa/units/land/spell_heal/spell_heal_anim_start.papa` | `start` | 2: `pa/units/land/spell_heal/spell_heal.json`, `pa/units/land/spell_heal/spell_heal_bal.json` | `control_tower.json` and 7 more | Found by the reference walk. |
| `/pa/units/land/t_metal_extractor_0/a_metal_extractor_effect_in.pfx` | `spec` | 1: `pa/units/land/t_metal_extractor_1/a_metal_extractor_anim_tree.json` | `t_metal_extractor_1.json` | A file with this path is in Exiles. Found by the reference walk. |
| `/pa/units/land/t_metal_extractor_0/a_metal_extractor_effect_out.pfx` | `spec` | 1: `pa/units/land/t_metal_extractor_1/a_metal_extractor_anim_tree.json` | `t_metal_extractor_1.json` | A file with this path is in Exiles. Found by the reference walk. |
| `/pa/units/land/tank_laser_adv/attack_vehicle_mg_ammo.json` | `ammo_id` | 1: `pa/units/land/tank_laser_adv/tank_laser_adv_mg_tool_weapon.json` | `tank_laser_adv.json` |  |
| `/pa/units/misc/empty_model.papa` | `filename` | 2: `pa/units/land/air_defense_adv/air_defense_adv_ammo.json`, `pa/units/land/t_tank_flak/t_tank_flak_ammo.json` | `air_defense_adv.json` and 6 more | The mod has `/pa/misc/empty_model.papa`, `/pa/effects/models/empty_model.papa` and `/pa/units/misc/empty_unit.papa`. Found by the reference walk. |
| `/pa/units/sea/basic_missile_ship/naval_anti_orbital_anim_close.papa` | `end` | 1: `pa/units/sea/basic_missile_ship/basic_missile_ship.json` | `basic_missile_ship.json` | The client mod has `naval_anti_orbital_ship_anim_close.papa`. Found by the reference walk. |
| `/pa/units/sea/basic_missile_ship/naval_anti_orbital_anim_open.papa` | `start` | 1: `pa/units/sea/basic_missile_ship/basic_missile_ship.json` | `basic_missile_ship.json` | The client mod has `naval_anti_orbital_ship_anim_open.papa`. Found by the reference walk. |

The Note column shows the paths that exist in a different mod. If that mod is enabled on your computer, PA finds the file there. A player who has only H-COM does not have the file, but can build the unit that needs it.

**Why it matters:** The CLI gives this reason: "The path was found neither in this mod, nor in any paired mod, nor in the base game. A path that resolves to nothing is no safer than a malformed one: PA resolves these at load, a dangling effect_spec means the spec cannot be constructed, a missing base_spec fails the unit entirely, and a missing .papa asset can crash the game rather than degrade gracefully." The six specs that reference `metal_depo_tool_weapon_dummy.json` appear to be the energy units that the energy plants, solar cells and wind turbines make. The review did not test these units in a game. 5 rows are tool or ammo specs (keys `spec_id` and `ammo_id`). These rows are the reason for the Blocker severity. The other rows are effects, models and animations, and the review did not confirm their result.

**Fix:** 

1. For each row, correct the path or add the file to the mod.
2. Restore `metal_depo_tool_weapon_dummy.json`, or remove the `tools` entry that names it from the six specs.
3. Disable all other mods. Then start a game and build each unit in the table.

<sub>`spec.unresolved-ref`</sub>

---

## Bug

> Loads, but does not behave as intended.

### BUG-002 — The starting units spawn again each time the game UI loads

**Location:** `ui/mods/com.pa.kasa.hcom-server/spawn_landing_capsule.js:11` and lines 79-90

**Found:** The script records the armies that it processed in the variable `completed`. This variable exists only in the memory of the `live_game` scene. The script has no check of the game time and no check for units that exist. When the scene loads again, `completed` is empty. The script then finds the commander and sends `create_unit` for the three starting units again.

**Why it matters:** The `live_game` scene loads again in three cases: a player connects again, a player reloads the UI, or a player loads a saved game. Each load may give that army a second landing capsule, with the 3,500 metal and 35,000 energy that the lobby text gives for it. The player who controls the AI armies also sends the units for each AI army again. The review did not test this in a game.

**Fix:** Before the script sends `create_unit`, check a condition that stays true for the full game. For example, do not send the units after a game-time limit. Do not use only a check for a live landing capsule, because that check fails after the capsule is destroyed.

<sub>`review.scene-script`</sub>

---

### BUG-003 — Interception lists name 5 ammo specs that do not exist

**Location:** `anti_entity_targets` in the tool specs that the table gives

**Occurrences:** 5 paths

**Found:** These `anti_entity_targets` entries resolve to no file in this mod, the client mod, or the base game. The reference walk found them. The CLI does not resolve this key. Each entry is in a tool of a unit that a player can build with H-COM alone. BLO-001 gives the build test.

| Ammo path that does not exist | Listed by | Note |
|---|---|---|
| `/pa/units/air/fighter/fighter_ammo_medium.json` | 6: `pa/units/air/fighter/fighter_flare_tool_weapon.json`, `pa/units/air/fighter_adv/fighter_adv_chaff_tool_weapon.json`, `pa/units/air/fighter_adv/fighter_adv_flare_tool_weapon.json` and 3 more | `fighter_tool_weapon_medium.json` fires `/pa/units/land/air_defense/air_defense_ammo.json`. |
| `/pa/units/air/fighter_adv/fighter_adv_ammo_long.json` | 3: `pa/units/air/fighter_adv/fighter_adv_chaff_tool_weapon.json`, `pa/units/air/support_platform/support_platform_tool_interception_hard.json`, `pa/units/air/titan_air/titan_air_tool_interception_hard.json` | `fighter_adv_tool_weapon_long.json` fires `/pa/units/land/aa_defense_long/aa_defense_long_ammo.json`. |
| `/pa/units/air/fighter_adv/fighter_adv_ammo_medium.json` | 6: `pa/units/air/fighter/fighter_flare_tool_weapon.json`, `pa/units/air/fighter_adv/fighter_adv_chaff_tool_weapon.json`, `pa/units/air/fighter_adv/fighter_adv_flare_tool_weapon.json` and 3 more | `fighter_adv_tool_weapon_medium.json` fires `/pa/units/land/air_defense/air_defense_ammo.json`. |
| `/pa/units/arsenal/l_sniper_bot_up/l_sniper_bot_up_ammo.json` | 2: `pa/units/land/cram/cram_beam_tool_weapon_easy.json`, `pa/units/land/tank_gatling/cram_beam_tool_weapon_easy.json` | The mod has `/pa/units/arsenal/unlocked_units/bot_sniper_up/bot_sniper_up_ammo.json`. |
| `/pa/units/land/bot_rpg_up/bot_rpg_up_ammo.json` | 4: `pa/units/land/tank_armor/tank_armor_beam_tool_weapon.json`, `pa/units/land/tank_heavy_armor/tank_heavy_armor_beam_tool_weapon_easy.json`, `pa/units/land/tank_laser_adv/tank_laser_adv_beam_tool_weapon.json` and 1 more | The mod has `/pa/units/arsenal/unlocked_units/bot_rpg_up/bot_rpg_up_ammo.json`. |

The review also applied the test to the projectile that each entry names. An entry has an effect only when that projectile exists in the game. Two more entries name Legion Expansion ammo:

- `/pa/units/land/l_rocket_barrage/l_rocket_barrage_ammo.json`, listed by 3 tools: `pa/units/land/cram/cram_beam_tool_weapon_hard.json`, `pa/units/land/tank_heavy_armor/tank_heavy_armor_beam_tool_weapon_hard.json`, `pa/units/land/tank_reaver/tank_reaver_beam_tool_weapon_hard.json`
- `/pa/units/land/l_sniper_bot/l_sniper_bot_ammo.json`, listed by 2 tools: `pa/units/land/cram/cram_beam_tool_weapon_easy.json`, `pa/units/land/tank_gatling/cram_beam_tool_weapon_easy.json`

Those projectiles exist only when Legion Expansion is loaded, and Legion Expansion supplies the two files. Thus the review does not count these two entries as defects. The two tools that name the Legion sniper ammo do not name the H-COM sniper ammo `/pa/units/land/bot_sniper/bot_sniper_ammo.json`.

**Why it matters:** An entry that matches no ammo spec probably does nothing. The weapon then does not intercept the projectile that the entry was written for. For example, four tools list an RPG-upgrade ammo path that does not exist, so they probably do not intercept the upgraded RPG bot. The mod description names interceptable projectiles as a core mechanic.

**Fix:** Replace each path with the path of the ammo spec that the weapon must intercept. Delete each entry that has no such ammo. If the two tools must intercept the H-COM sniper projectile, add its ammo path to their lists.

<sub>`spec.unresolved-ref`</sub>

---

### BUG-004 — The `icon` URL returns a web page, not an image

**Location:** `modinfo.json` (`icon`)

**Found:** `"icon": "https://github.com/kasa0246/com.pa.kasa.hcom-server/blob/icon/hcom-icon.png"`. On 2026-11-10 this URL returned `text/html`. A `blob/` URL is the GitHub page for a file.

**Why it matters:** The mod browser loads `icon` as an image. The mod tile will probably show no icon. PA writes nothing to a log for this failure.

**Fix:** Use `https://raw.githubusercontent.com/kasa0246/com.pa.kasa.hcom-server/icon/hcom-icon.png`, which returned `image/png`. The image is 240x240 pixels. The modinfo reference specifies 300x300 pixels.

<sub>`review.modinfo-icon`</sub>

---

### BUG-005 — `tools[n].record_index` must be <= 3

**Location:** 8 unit specs

**Occurrences:** 9

**Found:** Validated as a unit spec, with base_spec inheritance applied.

- `pa/units/air/fighter_adv/fighter_adv.json`: `tools[4].record_index` must be <= 3
- `pa/units/air/fighter_adv/fighter_adv.json`: `tools[5].record_index` must be <= 3
- `pa/units/air/strafer/strafer.json`: `tools[5].record_index` must be <= 3
- `pa/units/arsenal/unlocked_units/gunship_up/gunship_up.json`: `tools[5].record_index` must be <= 3
- `pa/units/arsenal/unlocked_units/orbital_battleship_up/orbital_battleship_up.json`: `tools[5].record_index` must be <= 3
- `pa/units/land/bot_nanoswarm/spawner.json`: `tools[4].record_index` must be <= 3
- `pa/units/land/floater/floater.json`: `tools[4].record_index` must be <= 3
- `pa/units/orbital/orbital_battleship/orbital_battleship.json`: `tools[5].record_index` must be <= 3
- `pa/units/sea/destroyer/destroyer.json`: `tools[5].record_index` must be <= 3

**Why it matters:** The value does not match the engine's parser expectations recorded in the unit schema. PA's parsers read the key with a typed getter; a mistyped value falls back to the default and the setting silently does nothing. The unit reference records `record_index` as clamped to the range -1 to 3.

**Fix:** Correct the value's type, or remove the key if it is vestigial.

<sub>`spec.schema.unit`</sub>

---

### BUG-006 — `recon.observer.items[n].shape` value "radar" is not one of: "sphere", "capsule"

**Location:** 3 unit specs

**Occurrences:** 3

**Found:** Validated as a unit spec, with base_spec inheritance applied.

- `pa/units/land/bot_radar_adv/bot_radar_adv.json`: `recon.observer.items[2].shape` value "radar" is not one of: "sphere", "capsule"
- `pa/units/sea/dolfin/dolfin.json`: `recon.observer.items[7].shape` value "radar" is not one of: "sphere", "capsule"
- `pa/units/sea/missile_ship/missile_ship.json`: `recon.observer.items[2].shape` value "radar" is not one of: "sphere", "capsule"

**Why it matters:** The value does not match the engine's parser expectations recorded in the unit schema. PA's parsers read the key with a typed getter; a mistyped value falls back to the default and the setting silently does nothing.

**Fix:** Correct the value's type, or remove the key if it is vestigial.

<sub>`spec.schema.unit`</sub>

---

### BUG-007 — `splash_damages_allies` expected type boolean, found string

**Location:** `pa/units/land/unit_cannon/unit_cannon_deploy.json`

**Found:** `"splash_damages_allies": "false"`. Validated as a ammo spec, with base_spec inheritance applied. The base-game file has the same value, so the mod inherited this defect.

**Why it matters:** The value does not match the engine's parser expectations recorded in the ammo schema. PA's parsers read the key with a typed getter; a mistyped value falls back to the default and the setting silently does nothing.

**Fix:** Correct the value's type, or remove the key if it is vestigial.

<sub>`spec.schema.ammo`</sub>

---

## Area of Concern

> May be a bug; needs author confirmation.

### CON-008 — Forced sandbox mode gives each player the stock cheat commands

**Location:** `ui/mods/com.pa.kasa.hcom-server/hcom_force_sandbox.js:6-17`, `hcom_hide_sandbox_ui.js:9-14`, `spawn_landing_capsule.js:89`

**Found:** `hcom_force_sandbox.js` sets the lobby option `sandbox` to true, and sets it again if the host clears it. `spawn_landing_capsule.js` needs this option: the server ignores `create_unit` when `sandbox` is false (`server-script/states/playing_shared.js:171-174`). `hcom_hide_sandbox_ui.js` hides the two stock cheat panels on each client.

**Why it matters:** The server applies the permission. The panels do not. With `sandbox` true, the server accepts `create_unit`, `change_control_flags` and `change_vision_flags` from each player (`playing_shared.js:158-207`). A player can send `create_unit` from the stock `copy_unit` and `paste_unit` key bindings (`ui/main/shared/js/inputmap.js:323-324`). A player can send all three messages from the debug console. Thus a player can make free units, see all armies, and control other armies. Is this trade-off intended?

**Fix:** If it is intended, tell players in the mod description that sandbox mode is on. If it is not intended, supply the starting resources by a method that does not need `sandbox`.

<sub>`review.intent`</sub>

---

### CON-009 — AI armies do not get the mechanics that run in a player's UI

**Location:** `ui/mods/com.pa.kasa.hcom-server/mechanics.js:154`, `solar_mechanics.js:96`, `wind_mechanics.js:96`, `pa/units/land/energy_plant/energy_plant.json`

**Found:** 

- `energy_plant.json` is a factory with no `factory.initial_build_spec`. The AutoFactory script in the client mod puts the energy unit in the queue, and that script uses the selection of the local player.
- `mechanics.js`, `solar_mechanics.js` and `wind_mechanics.js` send `fire_secondary_weapon` only for the army of `model.armyIndex()`.
- `solar_cell.json` has no `production` block. Its only tool is a secondary weapon.
- The mod has no `pa/ai` data.
- `spawn_landing_capsule.js` gives the starting units to AI armies.

**Why it matters:** An AI army probably gets no energy from energy plants, solar cells or wind turbines. The lobby text says that commanders no longer give significant resources. Thus an AI opponent may stop when it has used the capsule resources. The starting-unit script shows that the mod expects AI armies in a game. Does the mod support AI opponents?

**Fix:** If the mod does not support AI opponents, say so in the description. If it does, give AI armies these mechanics from a source that is not a player's UI. For example, the arsenal unlock specs in this mod use `factory.initial_build_spec` with `default_build_stance: "Continuous"`.

<sub>`review.intent`</sub>

---

### CON-010 — Unit spec is not listed in the mod's unit_list.json

**Location:** 20 unit specs

**Occurrences:** 20

**Found:** 

- `pa/units/air/fighter_adv/chaff/chaff.json`
- `pa/units/arsenal/unlocks/tank_nuke_airboom_unlock/arsenal_tank_nuke.json`
- `pa/units/arsenal/unlocks/tank_nuke_airboom_unlock/tank_nuke_airboom_unlock.json`
- `pa/units/base/dot_huge/dot_huge.json`
- `pa/units/base/stun_huge/stun_huge_infinite.json`
- `pa/units/base/stun_huge/stun_huge_long.json`
- `pa/units/land/basic_missile_defence/cruise_missile/cluster_bomb.json`
- `pa/units/land/edison/lightning.json`
- `pa/units/land/land_barrier/land_barrier_big_spawner.json`
- `pa/units/land/solar_cell/solar_energy.json`
- `pa/units/land/spell_heal/spell_heal.json`
- `pa/units/land/stalker/dot.json`
- `pa/units/land/wind_turbine/wind_energy.json`
- `pa/units/orbital/orbital_mine/orbital_mine_sub.json`
- `pa/units/thorosmen/bot_freeze/minion/minion.json`
- `pa/units/thorosmen/bunker_build/bunker_orb/bunker_orb.json`
- `pa/units/thorosmen/st_bot_white_hole/mine_vehicle.json`
- `pa/units/thorosmen/st_bot_white_hole/st_bot_white_hole.json`
- `pa/units/thorosmen/st_bot_white_hole/white_hole/white_hole.json`
- `pa/units/upgrades/energy_plant_adv_3_build/energy_plant_adv_3_build.json`

The reference walk did not reach 8 of these specs from `unit_list.json`: `arsenal_tank_nuke.json`, `tank_nuke_airboom_unlock.json`, `lightning.json`, `land_barrier_big_spawner.json`, `mine_vehicle.json`, `st_bot_white_hole.json`, `white_hole.json`, `energy_plant_adv_3_build.json`. Other specs reference the remaining 12.

**Why it matters:** unit_list.json is a whole-file override enumerating every buildable unit. A spec absent from it loads but can never be built or referenced by the AI. This is expected for a spec that is only ever inherited via base_spec.

**Fix:** Add the spec path to the units array in unit_list.json, or confirm the spec is a base template.

<sub>`spec.unregistered-unit`</sub>

---

### CON-011 — No builder appears able to build the 18 arsenal unlock structures, and their model file does not exist

**Location:** `pa/units/arsenal/unlocks/*/*_arsenal.json`, `ui/mods/com.pa.kasa.hcom-server/arsenal.js:68`, `shared_build.js:184-211` in the client mod

**Occurrences:** 18 structures, 1 missing file

**Found:** 

- `unit_list.json` registers 18 structures with the name pattern `*_arsenal.json`. <details>
<summary>The 18 structures</summary>

- `pa/units/arsenal/unlocks/adv_heavy_bot_up_unlock/adv_heavy_bot_up_arsenal.json`
- `pa/units/arsenal/unlocks/anti_nuke_up_unlock/anti_nuke_up_arsenal.json`
- `pa/units/arsenal/unlocks/assault_bot_adv_up_unlock/assault_bot_adv_up_arsenal.json`
- `pa/units/arsenal/unlocks/assault_bot_up_unlock/assault_bot_up_arsenal.json`
- `pa/units/arsenal/unlocks/bot_grenadier_up_unlock/bot_grenadier_up_arsenal.json`
- `pa/units/arsenal/unlocks/bot_rpg_up_unlock/bot_rpg_up_arsenal.json`
- `pa/units/arsenal/unlocks/bot_sniper_up_unlock/bot_sniper_up_arsenal.json`
- `pa/units/arsenal/unlocks/gunship_up_unlock/gunship_up_arsenal.json`
- `pa/units/arsenal/unlocks/hype_ammo_unlock/hype_ammo_arsenal.json`
- `pa/units/arsenal/unlocks/nuke_ammo_unlock/nuke_ammo_arsenal.json`
- `pa/units/arsenal/unlocks/nuke_unlock/nuke_arsenal.json`
- `pa/units/arsenal/unlocks/orbital_battleship_up_unlock/orbital_battleship_up_arsenal.json`
- `pa/units/arsenal/unlocks/orbital_railgun_up_unlock/orbital_railgun_up_arsenal.json`
- `pa/units/arsenal/unlocks/tank_heavy_armor_up_unlock/tank_heavy_armor_up_arsenal.json`
- `pa/units/arsenal/unlocks/tank_heavy_mortar_up_unlock/tank_heavy_mortar_up_arsenal.json`
- `pa/units/arsenal/unlocks/tank_hover_up_unlock/tank_hover_up_arsenal.json`
- `pa/units/arsenal/unlocks/tank_laser_adv_up_unlock/tank_laser_adv_up_arsenal.json`
- `pa/units/arsenal/unlocks/tank_light_laser_up_unlock/tank_light_laser_up_arsenal.json`

</details>
- Each structure has `model.filename` set to `/pa/units/arsenal/unlocks/base_unlock/arsenal_bulb.papa`. That file is not in this mod, the client mod, or the base game.
- The build test in BLO-001 found no route to these structures. Their `unit_types` do not include `Custom58`. No `buildable_types` expression of a unit that a player can get matches them. The stock debug unit `avatar.json` is the only registered unit with an expression that matches.
- `shared_build.js` gives the structures positions on the build bar. `arsenal.js:68` adds `nuke_ammo_arsenal.json` and `hype_ammo_arsenal.json` to the build bar after an unlock. Thus the author appears to expect that players build them.
- `pa/units/arsenal/arsenal/arsenal.json` has `buildable_types` `Custom23`, so it builds the `*_unlock.json` units without these structures.

**Why it matters:** If the build test is correct, players cannot build these structures, and the missing model is never necessary. The structures are then leftover data, or the `Custom58` type is missing from them. If the author adds `Custom58`, the missing model becomes a Blocker. The review did not test this in a game. It also cannot confirm if PA loads the model of a registered unit that no player builds. Are these structures part of the current design?

**Fix:** If they are not part of the design, remove the 18 entries from `unit_list.json`, `arsenal.js` and `shared_build.js`, and delete the specs. If they are, add `UNITTYPE_Custom58` to their `unit_types` and add the model file to the mod.

<sub>`review.intent`</sub>

---

## Compliance

> Works, but violates a documented distribution or conduct rule.

### COM-012 — The MIT licence covers third-party files that have other licences or no licence

**Location:** `LICENSE` and `credits.txt` in this mod. `LICENSE` in the client mod.

**Found:** Both repositories have an MIT `LICENSE` with "Copyright (c) 2026 kasa0246" and no other licence text. This mod has a `credits.txt`. The client mod has no credits file. The review compared each file of the two mods with the archives that Community Mods published for the credited mods on 2026-11-10.

| Mod | Licence in its archive | Identical files, server mod | Identical files, client mod | Named in `credits.txt` |
|---|---|---|---|---|
| Legion Expansion | CC BY-NC-SA 4.0 | 12 | 38 | "for inspiration and maybe a few placeholder files I forgot to delete" |
| Osmech | No licence file | 11 | 56 | Yes |
| Section 17 | No licence file | 2 | 35 | Yes |
| Second Wave | No licence file | 31 | 104 | Yes |
| Upgrades | No licence file | 25 | 15 | Yes, for the Arsenal model |
| More Pew Pew | No licence file | 1 | 79 | Yes ("domdom for projectile effects") |
| Exiles | MIT | 28 | 71 | Yes |
| Upgradable Turrets | MIT | 0 | 5 | Yes ("Bot, Taiga") |
| Titan Gantry | Apache-2.0 | 1 | 6 | Yes ("wondible") |
| Autofactory V2 | "Do what you want, just give credit." | 0 | 9 | No |

The two count columns give the files that are byte-identical to a file in that archive and are not base-game content. One file can match the archives of more than one mod. The counts do not include modified copies.

<details>
<summary>32 files that are byte-identical to Legion files and to no other archive that the review checked</summary>

- `pa/anim/anim_trees/furrow_anim_tree.json` = Legion `pa/anim/anim_trees/l_torpedo_launcher_anim_tree.json`
- `pa/anim/anim_trees/grot_anim_tree.json` = Legion `pa/anim/anim_trees/l_sniper_bot_anim_tree.json`
- `pa/anim/anim_trees/three_turret_anim_tree.json` = Legion `pa/anim/anim_trees/three_turret_anim_tree.json`
- `pa/effects/specs/laser_beam.pfx` = Legion `pa/effects/specs/laser_beam.pfx`
- `pa/units/air/bomber_heavy/bomber_heavy_exp_ammo_hit.pfx` = Legion `pa/units/land/l_mortar_tank/l_mortar_tank_ammo_hit.pfx`
- `pa/units/air/fighter/flare_hit.pfx` = Legion `pa/units/land/l_mortar_tank/l_mortar_tank_ammo_hit.pfx`
- `pa/units/air/gunship/trail.pfx` = Legion `pa/units/land/l_hover_tank_adv/trail.pfx`
- `pa/units/land/aa_defense_long/launch_smoke.pfx` = Legion `pa/units/land/l_air_defense_adv/launch_smoke.pfx`
- `pa/units/land/bastion/back_smoke.pfx` = Legion `pa/units/land/l_rocket_barrage/back_smoke.pfx`
- `pa/units/land/bastion/vent_smoke.pfx` = Legion `pa/units/land/l_rocket_barrage/vent_smoke.pfx`
- `pa/units/land/behemoth/ground_smoke.pfx` = Legion `pa/units/land/l_bot_artillery_adv/ground_smoke.pfx`
- `pa/units/land/behemoth/main_gun_exp.pfx` = Legion `pa/units/land/l_bot_artillery_adv/main_gun_exp.pfx`
- `pa/units/land/bot_rpg/beam_hit.pfx` = Legion `pa/units/land/l_sniper_bot/beam_hit.pfx`
- `pa/units/land/bot_rpg/beam_trail.pfx` = Legion `pa/units/land/l_sniper_bot/beam_trail.pfx`
- `pa/units/land/bot_rpg/grot_anim_idle.papa` = Legion `pa/units/land/l_sniper_bot/l_sniper_bot_anim_idle.papa`
- `pa/units/land/bot_rpg/grot_anim_walk.papa` = Legion `pa/units/land/l_sniper_bot/l_sniper_bot_anim_walk.papa`
- `pa/units/land/bot_rpg/muzzle_effect.pfx` = Legion `pa/units/land/l_sniper_bot/muzzle_effect.pfx`
- `pa/units/land/bot_rpg/muzzle_flash_medium.pfx` = Legion `pa/units/land/l_sniper_bot/muzzle_flash_medium.pfx`
- `pa/units/land/demi_titan_bot/fire.pfx` = Legion `pa/units/land/l_flame_turret/fire.pfx`
- `pa/units/land/demi_titan_bot/flame.pfx` = Legion `pa/units/land/l_flame_turret/flame.pfx`
- `pa/units/land/energy_coil/chain/electrode.pfx` = Legion `pa/units/land/l_tank_swarm/chain/electrode.pfx`
- `pa/units/land/energy_coil/deploy_swarm.pfx` = Legion `pa/units/land/l_tank_swarm/deploy_swarm.pfx`
- `pa/units/land/mjolnir/artillery_muzzle_ground.pfx` = Legion `pa/units/land/l_sniper_tank/artillery_muzzle_ground.pfx`
- `pa/units/land/mjolnir/energy_rods.pfx` = Legion `pa/units/land/l_sniper_tank/energy_rods.pfx`
- `pa/units/land/mjolnir/fired.pfx` = Legion `pa/units/land/l_sniper_tank/energy_rods.pfx`
- `pa/units/land/mjolnir/hit.pfx` = Legion `pa/units/land/l_sniper_tank/hit.pfx`
- `pa/units/land/mjolnir/trail.pfx` = Legion `pa/units/land/l_sniper_tank/trail.pfx`
- `pa/units/land/shrapnel_mine/muzzle_flash.pfx` = Legion `pa/units/land/l_shotgun_tank/muzzle_flash.pfx`
- `pa/units/land/shrapnel_mine/shrapnel_hit.pfx` = Legion `pa/units/land/l_shotgun_tank/proj_hit.pfx`
- `pa/units/land/shrapnel_mine/shrapnel_trail.pfx` = Legion `pa/units/land/l_shotgun_tank/l_shotgun_tank_ammo_trail.pfx`
- `pa/units/thorosmen/st_bot_white_hole/proj_hit.pfx` = Legion `pa/units/land/l_titan_vehicle/proj_hit.pfx`
- `ui/main/atlas/icon_atlas/img/strategic_icons/icon_si_picoswarm.png` = Legion `ui/main/atlas/icon_atlas/img/strategic_icons/icon_si_l_hive_nanoswarm.png`

</details>

**Why it matters:** 

- **Legion Expansion (CC BY-NC-SA 4.0).** This licence requires attribution. It also requires the same licence on the copies and on work made from them. An MIT licence does not satisfy that condition. `credits.txt` does not say which files came from Legion.
- **Osmech, Section 17, Second Wave, Upgrades, More Pew Pew (no licence file).** With no licence, the authors keep all rights. Credit does not replace permission. The review cannot see if the authors gave permission.
- **Exiles, Upgradable Turrets (MIT).** MIT requires that copies include the original copyright notice and the permission notice. The mod pair includes neither.
- **Titan Gantry (Apache-2.0).** Apache-2.0 requires a copy of the licence and a statement of the changes.
- **Autofactory V2.** Its licence asks for credit. `credits.txt` does not name Autofactory V2.
- The MIT `LICENSE` tells a reader that all files in the two repositories are MIT work of kasa0246. That statement is not correct for the files in the table.

**Fix:** 

1. Limit `LICENSE` to your own work. State this limit in the file or in the README.
2. Add a third-party notice file to both mods. For each mod in the table, give the mod name, the authors, the licence and the files that came from it. Include the MIT and Apache-2.0 texts with their copyright lines.
3. Add Autofactory V2 to the credits.
4. Remove or replace the Legion files. As an alternative, keep them under CC BY-NC-SA 4.0 with attribution, and tell readers that these files have that licence.
5. Get permission from the authors of the mods that have no licence. Record the permission in the notice file.

<sub>`review.licence`</sub>

---

### COM-013 — Prohibited category "server"

**Location:** `modinfo.json`

**Found:** `"category"` contains `"server"`.

**Why it matters:** The Mod Structure reference lists this among prohibited categories: mod, client, client-mod, server, server-mod, map, planet, planets, system, systems. These are redundant with fields the browser already knows.

**Fix:** Remove "server" and use a descriptive keyword instead.

<sub>`modinfo.category-prohibited`</sub>

---

### COM-014 — Path contains uppercase characters

**Location:** 21 paths

**Occurrences:** 21

**Found:** 

- `pa/units/air/air_scout/air_scoutX.papa`
- `pa/units/air/solar_drone/solar_droneX.papa`
- `pa/units/land/artillery_short/artillery_shortX.papa`
- `pa/units/land/attack_vehicle/attack_vehicleX.papa`
- `pa/units/land/bot_bomb/bot_bombX.papa`
- `pa/units/land/bot_grenadier/bot_grenadierX.papa`
- `pa/units/land/bot_nanoswarmX/bot_nanoswarmX.json`
- `pa/units/land/bot_nanoswarmX/bot_nanoswarmX.papa`
- `pa/units/land/bot_nanoswarmX/bot_nanoswarmX_ammo.json`
- `pa/units/land/bot_nanoswarmX/bot_nanoswarmX_build_arm.json`
- `pa/units/land/bot_nanoswarmX/bot_nanoswarmX_death_ammo.json`
- `pa/units/land/bot_nanoswarmX/bot_nanoswarmX_death_tool_weapon.json`
- `pa/units/land/bot_nanoswarmX/bot_nanoswarmX_tool_weapon.json`
- `pa/units/land/fabrication_bot/fabrication_botX.papa`
- `pa/units/land/fabrication_vehicle/fabrication_vehicleX.papa`
- `pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_advX.papa`
- `pa/units/land/hover_fab/fabrication_bargeX.papa`
- `pa/units/land/missile_facility/large_DOT_ammo.json`
- `pa/units/orbital/orbital_fighter/orbital_fighterX.papa`
- `pa/units/sea/artillery_short/artillery_shortX.papa`
- `pa/units/sea/sea_scout/sea_scoutX.papa`

The reference walk found no reference that names one of these files with different casing. Thus the review found no runtime effect.

**Why it matters:** The Mod Structure reference requires mod files to use lowercase names. Windows resolves paths case-insensitively, so an uppercase path works for the author and can fail for players on Linux and macOS. No origin file was found for this path, so the lowercase rule applies rather than the shadow-casing exception — if it does shadow a mod that is not installed here, confirm the casing against that mod.

**Fix:** Rename to lowercase, and update every reference to it.

<sub>`packaging.uppercase-path`</sub>

---

## Maintenance Risk

> Correct today, fragile against a future PA patch.

### MAI-015 — Shadows 325 base-game files that have no interception point

**Location:** See the list.

**Found:** 

<details>
<summary>The shadowed files</summary>

- `pa/ammo/cannon_uber/cannon_uber.json` overrides `pa_ex1/ammo/cannon_uber/cannon_uber.json`
- `pa/anim/anim_trees/air_defense_adv_anim_tree.json` overrides `pa/anim/anim_trees/air_defense_adv_anim_tree.json`
- `pa/anim/anim_trees/attack_vehicle_anim_tree.json` overrides `pa_ex1/anim/anim_trees/attack_vehicle_anim_tree.json`
- `pa/anim/anim_trees/battleship_anim_tree.json` overrides `pa/anim/anim_trees/battleship_anim_tree.json`
- `pa/anim/anim_trees/bomber_heavy_anim_tree.json` overrides `pa_ex1/anim/anim_trees/bomber_heavy_anim_tree.json`
- `pa/anim/anim_trees/destroyer_anim_tree.json` overrides `pa/anim/anim_trees/destroyer_anim_tree.json`
- `pa/anim/anim_trees/fabrication_bot_combat_adv_anim_tree.json` overrides `pa/anim/anim_trees/fabrication_bot_combat_adv_anim_tree.json`
- `pa/anim/anim_trees/missile_ship_anim_tree.json` overrides `pa/anim/anim_trees/missile_ship_anim_tree.json`
- `pa/anim/anim_trees/solar_drone_anim_tree.json` overrides `pa_ex1/anim/anim_trees/solar_drone_anim_tree.json`
- `pa/anim/anim_trees/tank_flak_anim_tree.json` overrides `pa_ex1/anim/anim_trees/tank_flak_anim_tree.json`
- `pa/anim/anim_trees/tank_jammer_anim_tree.json` overrides `pa_ex1/anim/anim_trees/tank_jammer_anim_tree.json`
- `pa/anim/anim_trees/tank_laser_adv_anim_tree.json` overrides `pa/anim/anim_trees/tank_laser_adv_anim_tree.json`
- `pa/effects/specs/default_commander_landing_ent.json` overrides `pa/effects/specs/default_commander_landing_ent.json`
- `pa/effects/specs/skirt_artillery_short.json` overrides `pa/effects/specs/skirt_artillery_short.json`
- `pa/tools/commander_build_arm/commander_build_arm.json` overrides `pa_ex1/tools/commander_build_arm/commander_build_arm.json`
- `pa/tools/engineer_build_arm/engineer_build_arm.json` overrides `pa_ex1/tools/engineer_build_arm/engineer_build_arm.json`
- `pa/tools/engineer_build_arm_adv/engineer_build_arm_adv.json` overrides `pa_ex1/tools/engineer_build_arm_adv/engineer_build_arm_adv.json`
- `pa/tools/uber_cannon/uber_cannon.json` overrides `pa/tools/uber_cannon/uber_cannon.json`
- `pa/units/air/air_factory/air_factory.json` overrides `pa_ex1/units/air/air_factory/air_factory.json`
- `pa/units/air/air_factory_adv/air_factory_adv.json` overrides `pa_ex1/units/air/air_factory_adv/air_factory_adv.json`
- `pa/units/air/air_scout/air_scout.json` overrides `pa_ex1/units/air/air_scout/air_scout.json`
- `pa/units/air/bomber/bomber.json` overrides `pa_ex1/units/air/bomber/bomber.json`
- `pa/units/air/bomber/bomber.papa` overrides `pa/units/air/bomber/bomber.papa`
- `pa/units/air/bomber/bomber_ammo.json` overrides `pa/units/air/bomber/bomber_ammo.json`
- `pa/units/air/bomber/bomber_tool_weapon.json` overrides `pa_ex1/units/air/bomber/bomber_tool_weapon.json`
- `pa/units/air/bomber_adv/bomber_adv.json` overrides `pa_ex1/units/air/bomber_adv/bomber_adv.json`
- `pa/units/air/bomber_adv/bomber_adv_ammo.json` overrides `pa_ex1/units/air/bomber_adv/bomber_adv_ammo.json`
- `pa/units/air/bomber_adv/bomber_adv_tool_weapon.json` overrides `pa_ex1/units/air/bomber_adv/bomber_adv_tool_weapon.json`
- `pa/units/air/bomber_heavy/bomber_heavy.json` overrides `pa_ex1/units/air/bomber_heavy/bomber_heavy.json`
- `pa/units/air/bomber_heavy/bomber_heavy.papa` overrides `pa_ex1/units/air/bomber_heavy/bomber_heavy.papa`
- `pa/units/air/bomber_heavy/bomber_heavy_ammo.json` overrides `pa_ex1/units/air/bomber_heavy/bomber_heavy_ammo.json`
- `pa/units/air/bomber_heavy/bomber_heavy_tool_weapon.json` overrides `pa_ex1/units/air/bomber_heavy/bomber_heavy_tool_weapon.json`
- `pa/units/air/fabrication_aircraft/fabrication_aircraft.json` overrides `pa_ex1/units/air/fabrication_aircraft/fabrication_aircraft.json`
- `pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json` overrides `pa_ex1/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json`
- `pa/units/air/fighter/fighter.json` overrides `pa_ex1/units/air/fighter/fighter.json`
- `pa/units/air/fighter/fighter.papa` overrides `pa/units/air/fighter/fighter.papa`
- `pa/units/air/fighter_adv/fighter_adv.json` overrides `pa_ex1/units/air/fighter_adv/fighter_adv.json`
- `pa/units/air/fighter_adv/fighter_adv.papa` overrides `pa/units/air/fighter_adv/fighter_adv.papa`
- `pa/units/air/gunship/gunship.json` overrides `pa_ex1/units/air/gunship/gunship.json`
- `pa/units/air/gunship/gunship.papa` overrides `pa/units/air/gunship/gunship.papa`
- `pa/units/air/gunship/gunship_ammo.json` overrides `pa_ex1/units/air/gunship/gunship_ammo.json`
- `pa/units/air/gunship/gunship_tool_weapon.json` overrides `pa_ex1/units/air/gunship/gunship_tool_weapon.json`
- `pa/units/air/solar_drone/solar_drone.json` overrides `pa_ex1/units/air/solar_drone/solar_drone.json`
- `pa/units/air/solar_drone/solar_drone_ammo.json` overrides `pa_ex1/units/air/solar_drone/solar_drone_ammo.json`
- `pa/units/air/solar_drone/solar_drone_tool_weapon.json` overrides `pa_ex1/units/air/solar_drone/solar_drone_tool_weapon.json`
- `pa/units/air/strafer/strafer.json` overrides `pa_ex1/units/air/strafer/strafer.json`
- `pa/units/air/strafer/strafer.papa` overrides `pa_ex1/units/air/strafer/strafer.papa`
- `pa/units/air/strafer/strafer_ammo.json` overrides `pa_ex1/units/air/strafer/strafer_ammo.json`
- `pa/units/air/strafer/strafer_tool_weapon.json` overrides `pa_ex1/units/air/strafer/strafer_tool_weapon.json`
- `pa/units/air/support_platform/support_platform.json` overrides `pa_ex1/units/air/support_platform/support_platform.json`
- `pa/units/air/support_platform/support_platform_interception_ammo.json` overrides `pa_ex1/units/air/support_platform/support_platform_interception_ammo.json`
- `pa/units/air/titan_air/titan_air.json` overrides `pa_ex1/units/air/titan_air/titan_air.json`
- `pa/units/air/titan_air/titan_air_ammo.json` overrides `pa_ex1/units/air/titan_air/titan_air_ammo.json`
- `pa/units/air/titan_air/titan_air_ammo_death.json` overrides `pa_ex1/units/air/titan_air/titan_air_ammo_death.json`
- `pa/units/air/titan_air/titan_air_tool_weapon.json` overrides `pa_ex1/units/air/titan_air/titan_air_tool_weapon.json`
- `pa/units/air/transport/transport.json` overrides `pa_ex1/units/air/transport/transport.json`
- `pa/units/commanders/avatar/avatar_build_arm.json` overrides `pa/units/commanders/avatar/avatar_build_arm.json`
- `pa/units/commanders/base_commander/base_commander.json` overrides `pa_ex1/units/commanders/base_commander/base_commander.json`
- `pa/units/commanders/base_commander/base_commander_ammo.json` overrides `pa_ex1/units/commanders/base_commander/base_commander_ammo.json`
- `pa/units/commanders/base_commander/base_commander_tool_weapon.json` overrides `pa_ex1/units/commanders/base_commander/base_commander_tool_weapon.json`
- `pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json` overrides `pa_ex1/units/land/aa_missile_vehicle/aa_missile_vehicle.json`
- `pa/units/land/aa_missile_vehicle/aa_missile_vehicle.papa` overrides `pa/units/land/aa_missile_vehicle/aa_missile_vehicle.papa`
- `pa/units/land/aa_missile_vehicle/aa_missile_vehicle_tool_weapon.json` overrides `pa_ex1/units/land/aa_missile_vehicle/aa_missile_vehicle_tool_weapon.json`
- `pa/units/land/air_defense/air_defense.json` overrides `pa_ex1/units/land/air_defense/air_defense.json`
- `pa/units/land/air_defense/air_defense_ammo.json` overrides `pa_ex1/units/land/air_defense/air_defense_ammo.json`
- `pa/units/land/air_defense/air_defense_tool_weapon.json` overrides `pa_ex1/units/land/air_defense/air_defense_tool_weapon.json`
- `pa/units/land/air_defense_adv/air_defense_adv.json` overrides `pa_ex1/units/land/air_defense_adv/air_defense_adv.json`
- `pa/units/land/air_defense_adv/air_defense_adv.papa` overrides `pa/units/land/air_defense_adv/air_defense_adv.papa`
- `pa/units/land/air_defense_adv/air_defense_adv_ammo.json` overrides `pa_ex1/units/land/air_defense_adv/air_defense_adv_ammo.json`
- `pa/units/land/air_defense_adv/air_defense_adv_tool_weapon.json` overrides `pa_ex1/units/land/air_defense_adv/air_defense_adv_tool_weapon.json`
- `pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json` overrides `pa_ex1/units/land/anti_nuke_launcher/anti_nuke_launcher.json`
- `pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json` overrides `pa_ex1/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json`
- `pa/units/land/anti_nuke_launcher/anti_nuke_launcher_build_arm.json` overrides `pa_ex1/units/land/anti_nuke_launcher/anti_nuke_launcher_build_arm.json`
- `pa/units/land/anti_nuke_launcher/anti_nuke_launcher_tool_weapon.json` overrides `pa/units/land/anti_nuke_launcher/anti_nuke_launcher_tool_weapon.json`
- `pa/units/land/artillery_long/artillery_long.json` overrides `pa_ex1/units/land/artillery_long/artillery_long.json`
- `pa/units/land/artillery_long/artillery_long.papa` overrides `pa/units/land/artillery_long/artillery_long.papa`
- `pa/units/land/artillery_long/artillery_long_ammo.json` overrides `pa/units/land/artillery_long/artillery_long_ammo.json`
- `pa/units/land/artillery_long/artillery_long_tool_weapon.json` overrides `pa_ex1/units/land/artillery_long/artillery_long_tool_weapon.json`
- `pa/units/land/artillery_short/artillery_short.json` overrides `pa_ex1/units/land/artillery_short/artillery_short.json`
- `pa/units/land/artillery_short/artillery_short_ammo.json` overrides `pa/units/land/artillery_short/artillery_short_ammo.json`
- `pa/units/land/artillery_short/artillery_short_tool_weapon.json` overrides `pa_ex1/units/land/artillery_short/artillery_short_tool_weapon.json`
- `pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json` overrides `pa_ex1/units/land/artillery_unit_launcher/artillery_unit_launcher.json`
- `pa/units/land/artillery_unit_launcher/artillery_unit_launcher_ammo.json` overrides `pa_ex1/units/land/artillery_unit_launcher/artillery_unit_launcher_ammo.json`
- `pa/units/land/artillery_unit_launcher/artillery_unit_launcher_tool_weapon.json` overrides `pa_ex1/units/land/artillery_unit_launcher/artillery_unit_launcher_tool_weapon.json`
- `pa/units/land/assault_bot/assault_bot.json` overrides `pa_ex1/units/land/assault_bot/assault_bot.json`
- `pa/units/land/assault_bot/assault_bot.papa` overrides `pa/units/land/assault_bot/assault_bot.papa`
- `pa/units/land/assault_bot/assault_bot_ammo.json` overrides `pa/units/land/assault_bot/assault_bot_ammo.json`
- `pa/units/land/assault_bot/assault_bot_tool_weapon.json` overrides `pa_ex1/units/land/assault_bot/assault_bot_tool_weapon.json`
- `pa/units/land/assault_bot_adv/assault_bot_adv.json` overrides `pa_ex1/units/land/assault_bot_adv/assault_bot_adv.json`
- `pa/units/land/assault_bot_adv/assault_bot_adv.papa` overrides `pa/units/land/assault_bot_adv/assault_bot_adv.papa`
- `pa/units/land/assault_bot_adv/assault_bot_adv_ammo.json` overrides `pa_ex1/units/land/assault_bot_adv/assault_bot_adv_ammo.json`
- `pa/units/land/assault_bot_adv/assault_bot_adv_tool_weapon.json` overrides `pa_ex1/units/land/assault_bot_adv/assault_bot_adv_tool_weapon.json`
- `pa/units/land/assault_bot_adv/assault_bot_adv_torpedo_ammo_land.json` overrides `pa_ex1/units/land/assault_bot_adv/assault_bot_adv_torpedo_ammo_land.json`
- `pa/units/land/assault_bot_adv/assault_bot_adv_torpedo_ammo_water.json` overrides `pa_ex1/units/land/assault_bot_adv/assault_bot_adv_torpedo_ammo_water.json`
- `pa/units/land/assault_bot_adv/assault_bot_adv_torpedo_tool_weapon.json` overrides `pa_ex1/units/land/assault_bot_adv/assault_bot_adv_torpedo_tool_weapon.json`
- `pa/units/land/attack_vehicle/attack_vehicle.json` overrides `pa_ex1/units/land/attack_vehicle/attack_vehicle.json`
- `pa/units/land/attack_vehicle/attack_vehicle_tool_weapon.json` overrides `pa_ex1/units/land/attack_vehicle/attack_vehicle_tool_weapon.json`
- `pa/units/land/bot_aa/bot_aa.json` overrides `pa_ex1/units/land/bot_aa/bot_aa.json`
- `pa/units/land/bot_aa/bot_aa.papa` overrides `pa_ex1/units/land/bot_aa/bot_aa.papa`
- `pa/units/land/bot_aa/bot_aa_ammo.json` overrides `pa_ex1/units/land/bot_aa/bot_aa_ammo.json`
- `pa/units/land/bot_aa/bot_aa_tool_weapon.json` overrides `pa_ex1/units/land/bot_aa/bot_aa_tool_weapon.json`
- `pa/units/land/bot_bomb/bot_bomb.json` overrides `pa_ex1/units/land/bot_bomb/bot_bomb.json`
- `pa/units/land/bot_bomb/bot_bomb_ammo.json` overrides `pa/units/land/bot_bomb/bot_bomb_ammo.json`
- `pa/units/land/bot_bomb/bot_bomb_ammo_explosion_ent.json` overrides `pa/units/land/bot_bomb/bot_bomb_ammo_explosion_ent.json`
- `pa/units/land/bot_bomb/bot_bomb_tool_weapon.json` overrides `pa_ex1/units/land/bot_bomb/bot_bomb_tool_weapon.json`
- `pa/units/land/bot_factory/bot_factory.json` overrides `pa_ex1/units/land/bot_factory/bot_factory.json`
- `pa/units/land/bot_factory_adv/bot_factory_adv.json` overrides `pa_ex1/units/land/bot_factory_adv/bot_factory_adv.json`
- `pa/units/land/bot_factory_adv/bot_factory_adv_build_arm.json` overrides `pa_ex1/units/land/bot_factory_adv/bot_factory_adv_build_arm.json`
- `pa/units/land/bot_grenadier/bot_grenadier.json` overrides `pa_ex1/units/land/bot_grenadier/bot_grenadier.json`
- `pa/units/land/bot_grenadier/bot_grenadier_ammo.json` overrides `pa_ex1/units/land/bot_grenadier/bot_grenadier_ammo.json`
- `pa/units/land/bot_grenadier/bot_grenadier_tool_weapon.json` overrides `pa_ex1/units/land/bot_grenadier/bot_grenadier_tool_weapon.json`
- `pa/units/land/bot_nanoswarm/bot_nanoswarm.json` overrides `pa_ex1/units/land/bot_nanoswarm/bot_nanoswarm.json`
- `pa/units/land/bot_nanoswarm/bot_nanoswarm_ammo.json` overrides `pa_ex1/units/land/bot_nanoswarm/bot_nanoswarm_ammo.json`
- `pa/units/land/bot_nanoswarm/bot_nanoswarm_build_arm.json` overrides `pa_ex1/units/land/bot_nanoswarm/bot_nanoswarm_build_arm.json`
- `pa/units/land/bot_nanoswarm/bot_nanoswarm_tool_weapon.json` overrides `pa_ex1/units/land/bot_nanoswarm/bot_nanoswarm_tool_weapon.json`
- `pa/units/land/bot_sniper/bot_sniper.json` overrides `pa_ex1/units/land/bot_sniper/bot_sniper.json`
- `pa/units/land/bot_sniper/bot_sniper_ammo.json` overrides `pa_ex1/units/land/bot_sniper/bot_sniper_ammo.json`
- `pa/units/land/bot_sniper/bot_sniper_beam_ammo.json` overrides `pa/units/land/bot_sniper/bot_sniper_beam_ammo.json`
- `pa/units/land/bot_sniper/bot_sniper_beam_tool_weapon.json` overrides `pa_ex1/units/land/bot_sniper/bot_sniper_beam_tool_weapon.json`
- `pa/units/land/bot_sniper/bot_sniper_tool_weapon.json` overrides `pa_ex1/units/land/bot_sniper/bot_sniper_tool_weapon.json`
- `pa/units/land/bot_support_commander/bot_support_commander.json` overrides `pa_ex1/units/land/bot_support_commander/bot_support_commander.json`
- `pa/units/land/bot_support_commander/bot_support_commander_ammo.json` overrides `pa_ex1/units/land/bot_support_commander/bot_support_commander_ammo.json`
- `pa/units/land/bot_support_commander/bot_support_commander_tool_build_arm.json` overrides `pa_ex1/units/land/bot_support_commander/bot_support_commander_tool_build_arm.json`
- `pa/units/land/bot_support_commander/bot_support_commander_tool_weapon.json` overrides `pa_ex1/units/land/bot_support_commander/bot_support_commander_tool_weapon.json`
- `pa/units/land/bot_tactical_missile/bot_tactical_missile.json` overrides `pa_ex1/units/land/bot_tactical_missile/bot_tactical_missile.json`
- `pa/units/land/bot_tactical_missile/bot_tactical_missile_ammo.json` overrides `pa_ex1/units/land/bot_tactical_missile/bot_tactical_missile_ammo.json`
- `pa/units/land/bot_tactical_missile/bot_tactical_missile_tool_weapon.json` overrides `pa_ex1/units/land/bot_tactical_missile/bot_tactical_missile_tool_weapon.json`
- `pa/units/land/bot_tesla/bot_tesla.json` overrides `pa_ex1/units/land/bot_tesla/bot_tesla.json`
- `pa/units/land/control_module/control_module.json` overrides `pa_ex1/units/land/control_module/control_module.json`
- `pa/units/land/energy_plant/energy_plant.json` overrides `pa_ex1/units/land/energy_plant/energy_plant.json`
- `pa/units/land/energy_plant_adv/energy_plant_adv.json` overrides `pa_ex1/units/land/energy_plant_adv/energy_plant_adv.json`
- `pa/units/land/energy_storage/energy_storage.json` overrides `pa_ex1/units/land/energy_storage/energy_storage.json`
- `pa/units/land/fabrication_bot/fabrication_bot.json` overrides `pa_ex1/units/land/fabrication_bot/fabrication_bot.json`
- `pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json` overrides `pa_ex1/units/land/fabrication_bot_adv/fabrication_bot_adv.json`
- `pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json` overrides `pa_ex1/units/land/fabrication_bot_combat/fabrication_bot_combat.json`
- `pa/units/land/fabrication_bot_combat/fabrication_bot_combat_build_arm.json` overrides `pa_ex1/units/land/fabrication_bot_combat/fabrication_bot_combat_build_arm.json`
- `pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json` overrides `pa_ex1/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json`
- `pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv_build_arm.json` overrides `pa_ex1/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv_build_arm.json`
- `pa/units/land/fabrication_vehicle/fabrication_vehicle.json` overrides `pa_ex1/units/land/fabrication_vehicle/fabrication_vehicle.json`
- `pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json` overrides `pa_ex1/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json`
- `pa/units/land/land_barrier/land_barrier.json` overrides `pa_ex1/units/land/land_barrier/land_barrier.json`
- `pa/units/land/land_mine/land_mine.json` overrides `pa_ex1/units/land/land_mine/land_mine.json`
- `pa/units/land/land_mine/land_mine_ammo.json` overrides `pa/units/land/land_mine/land_mine_ammo.json`
- `pa/units/land/land_mine/land_mine_ammo_explosion_ent.json` overrides `pa/units/land/land_mine/land_mine_ammo_explosion_ent.json`
- `pa/units/land/land_mine/land_mine_tool_weapon.json` overrides `pa_ex1/units/land/land_mine/land_mine_tool_weapon.json`
- `pa/units/land/land_scout/land_scout.json` overrides `pa_ex1/units/land/land_scout/land_scout.json`
- `pa/units/land/laser_defense/laser_defense.json` overrides `pa_ex1/units/land/laser_defense/laser_defense.json`
- `pa/units/land/laser_defense/laser_defense_ammo.json` overrides `pa/units/land/laser_defense/laser_defense_ammo.json`
- `pa/units/land/laser_defense/laser_defense_tool_weapon.json` overrides `pa/units/land/laser_defense/laser_defense_tool_weapon.json`
- `pa/units/land/laser_defense_adv/laser_defense_adv.json` overrides `pa_ex1/units/land/laser_defense_adv/laser_defense_adv.json`
- `pa/units/land/laser_defense_adv/laser_defense_adv_ammo.json` overrides `pa_ex1/units/land/laser_defense_adv/laser_defense_adv_ammo.json`
- `pa/units/land/laser_defense_adv/laser_defense_adv_tool_weapon.json` overrides `pa_ex1/units/land/laser_defense_adv/laser_defense_adv_tool_weapon.json`
- `pa/units/land/laser_defense_single/laser_defense_single.json` overrides `pa_ex1/units/land/laser_defense_single/laser_defense_single.json`
- `pa/units/land/laser_defense_single/laser_defense_single_ammo.json` overrides `pa_ex1/units/land/laser_defense_single/laser_defense_single_ammo.json`
- `pa/units/land/laser_defense_single/laser_defense_single_tool_weapon.json` overrides `pa_ex1/units/land/laser_defense_single/laser_defense_single_tool_weapon.json`
- `pa/units/land/metal_extractor/metal_extractor.json` overrides `pa_ex1/units/land/metal_extractor/metal_extractor.json`
- `pa/units/land/metal_extractor_adv/metal_extractor_adv.json` overrides `pa_ex1/units/land/metal_extractor_adv/metal_extractor_adv.json`
- `pa/units/land/metal_storage/metal_storage.json` overrides `pa_ex1/units/land/metal_storage/metal_storage.json`
- `pa/units/land/nuke_launcher/nuke_launcher.json` overrides `pa_ex1/units/land/nuke_launcher/nuke_launcher.json`
- `pa/units/land/nuke_launcher/nuke_launcher_ammo.json` overrides `pa_ex1/units/land/nuke_launcher/nuke_launcher_ammo.json`
- `pa/units/land/nuke_launcher/nuke_launcher_build_arm.json` overrides `pa_ex1/units/land/nuke_launcher/nuke_launcher_build_arm.json`
- `pa/units/land/nuke_launcher/nuke_launcher_inter_ammo.json` overrides `pa_ex1/units/land/nuke_launcher/nuke_launcher_inter_ammo.json`
- `pa/units/land/nuke_launcher/nuke_launcher_tool_weapon.json` overrides `pa/units/land/nuke_launcher/nuke_launcher_tool_weapon.json`
- `pa/units/land/radar/radar.json` overrides `pa_ex1/units/land/radar/radar.json`
- `pa/units/land/radar_adv/radar_adv.json` overrides `pa_ex1/units/land/radar_adv/radar_adv.json`
- `pa/units/land/radar_jammer/radar_jammer.json` overrides `pa_ex1/units/land/radar_jammer/radar_jammer.json`
- `pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json` overrides `pa_ex1/units/land/tactical_missile_launcher/tactical_missile_launcher.json`
- `pa/units/land/tactical_missile_launcher/tactical_missile_launcher_ammo.json` overrides `pa_ex1/units/land/tactical_missile_launcher/tactical_missile_launcher_ammo.json`
- `pa/units/land/tactical_missile_launcher/tactical_missile_launcher_tool_weapon.json` overrides `pa_ex1/units/land/tactical_missile_launcher/tactical_missile_launcher_tool_weapon.json`
- `pa/units/land/tank_anti_nuke/tank_anti_nuke.json` overrides `pa_ex1/units/land/tank_anti_nuke/tank_anti_nuke.json`
- `pa/units/land/tank_anti_nuke/tank_anti_nuke_tool_weapon.json` overrides `pa_ex1/units/land/tank_anti_nuke/tank_anti_nuke_tool_weapon.json`
- `pa/units/land/tank_armor/tank_armor.json` overrides `pa_ex1/units/land/tank_armor/tank_armor.json`
- `pa/units/land/tank_armor/tank_armor.papa` overrides `pa/units/land/tank_armor/tank_armor.papa`
- `pa/units/land/tank_armor/tank_armor_ammo.json` overrides `pa/units/land/tank_armor/tank_armor_ammo.json`
- `pa/units/land/tank_armor/tank_armor_tool_weapon.json` overrides `pa/units/land/tank_armor/tank_armor_tool_weapon.json`
- `pa/units/land/tank_flak/tank_flak.json` overrides `pa_ex1/units/land/tank_flak/tank_flak.json`
- `pa/units/land/tank_flak/tank_flak_tool_weapon.json` overrides `pa_ex1/units/land/tank_flak/tank_flak_tool_weapon.json`
- `pa/units/land/tank_heavy_armor/tank_heavy_armor.json` overrides `pa_ex1/units/land/tank_heavy_armor/tank_heavy_armor.json`
- `pa/units/land/tank_heavy_armor/tank_heavy_armor.papa` overrides `pa/units/land/tank_heavy_armor/tank_heavy_armor.papa`
- `pa/units/land/tank_heavy_armor/tank_heavy_armor_ammo.json` overrides `pa_ex1/units/land/tank_heavy_armor/tank_heavy_armor_ammo.json`
- `pa/units/land/tank_heavy_armor/tank_heavy_armor_tool_weapon.json` overrides `pa_ex1/units/land/tank_heavy_armor/tank_heavy_armor_tool_weapon.json`
- `pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json` overrides `pa_ex1/units/land/tank_heavy_mortar/tank_heavy_mortar.json`
- `pa/units/land/tank_heavy_mortar/tank_heavy_mortar.papa` overrides `pa/units/land/tank_heavy_mortar/tank_heavy_mortar.papa`
- `pa/units/land/tank_heavy_mortar/tank_heavy_mortar_ammo.json` overrides `pa/units/land/tank_heavy_mortar/tank_heavy_mortar_ammo.json`
- `pa/units/land/tank_heavy_mortar/tank_heavy_mortar_tool_weapon.json` overrides `pa_ex1/units/land/tank_heavy_mortar/tank_heavy_mortar_tool_weapon.json`
- `pa/units/land/tank_hover/tank_hover.json` overrides `pa_ex1/units/land/tank_hover/tank_hover.json`
- `pa/units/land/tank_hover/tank_hover_ammo.json` overrides `pa_ex1/units/land/tank_hover/tank_hover_ammo.json`
- `pa/units/land/tank_hover/tank_hover_tool_weapon.json` overrides `pa_ex1/units/land/tank_hover/tank_hover_tool_weapon.json`
- `pa/units/land/tank_laser_adv/tank_laser_adv.json` overrides `pa_ex1/units/land/tank_laser_adv/tank_laser_adv.json`
- `pa/units/land/tank_laser_adv/tank_laser_adv.papa` overrides `pa_ex1/units/land/tank_laser_adv/tank_laser_adv.papa`
- `pa/units/land/tank_laser_adv/tank_laser_adv_ammo.json` overrides `pa_ex1/units/land/tank_laser_adv/tank_laser_adv_ammo.json`
- `pa/units/land/tank_laser_adv/tank_laser_adv_tool_weapon.json` overrides `pa_ex1/units/land/tank_laser_adv/tank_laser_adv_tool_weapon.json`
- `pa/units/land/tank_light_laser/tank_light_laser.json` overrides `pa_ex1/units/land/tank_light_laser/tank_light_laser.json`
- `pa/units/land/tank_light_laser/tank_light_laser.papa` overrides `pa/units/land/tank_light_laser/tank_light_laser.papa`
- `pa/units/land/tank_light_laser/tank_light_laser_ammo.json` overrides `pa/units/land/tank_light_laser/tank_light_laser_ammo.json`
- `pa/units/land/tank_light_laser/tank_light_laser_tool_weapon.json` overrides `pa_ex1/units/land/tank_light_laser/tank_light_laser_tool_weapon.json`
- `pa/units/land/tank_nuke/tank_nuke.json` overrides `pa_ex1/units/land/tank_nuke/tank_nuke.json`
- `pa/units/land/tank_nuke/tank_nuke_pbaoe.json` overrides `pa_ex1/units/land/tank_nuke/tank_nuke_pbaoe.json`
- `pa/units/land/tank_nuke/tank_nuke_tool_weapon.json` overrides `pa_ex1/units/land/tank_nuke/tank_nuke_tool_weapon.json`
- `pa/units/land/teleporter/teleporter.json` overrides `pa_ex1/units/land/teleporter/teleporter.json`
- `pa/units/land/titan_bot/titan_bot.json` overrides `pa_ex1/units/land/titan_bot/titan_bot.json`
- `pa/units/land/titan_bot/titan_bot_ammo_death.json` overrides `pa_ex1/units/land/titan_bot/titan_bot_ammo_death.json`
- `pa/units/land/titan_bot/titan_bot_ammo_stomp.json` overrides `pa_ex1/units/land/titan_bot/titan_bot_ammo_stomp.json`
- `pa/units/land/titan_bot/titan_bot_stomp_ent.json` overrides `pa_ex1/units/land/titan_bot/titan_bot_stomp_ent.json`
- `pa/units/land/titan_bot/titan_bot_tool_weapon_stomp.json` overrides `pa_ex1/units/land/titan_bot/titan_bot_tool_weapon_stomp.json`
- `pa/units/land/titan_structure/titan_structure.json` overrides `pa_ex1/units/land/titan_structure/titan_structure.json`
- `pa/units/land/titan_vehicle/titan_vehicle.json` overrides `pa_ex1/units/land/titan_vehicle/titan_vehicle.json`
- `pa/units/land/titan_vehicle/titan_vehicle_ammo_death.json` overrides `pa_ex1/units/land/titan_vehicle/titan_vehicle_ammo_death.json`
- `pa/units/land/titan_vehicle/titan_vehicle_ammo_main.json` overrides `pa_ex1/units/land/titan_vehicle/titan_vehicle_ammo_main.json`
- `pa/units/land/titan_vehicle/titan_vehicle_ammo_side.json` overrides `pa_ex1/units/land/titan_vehicle/titan_vehicle_ammo_side.json`
- `pa/units/land/titan_vehicle/titan_vehicle_ammo_stomp.json` overrides `pa_ex1/units/land/titan_vehicle/titan_vehicle_ammo_stomp.json`
- `pa/units/land/titan_vehicle/titan_vehicle_tool_weapon_main.json` overrides `pa_ex1/units/land/titan_vehicle/titan_vehicle_tool_weapon_main.json`
- `pa/units/land/titan_vehicle/titan_vehicle_tool_weapon_side.json` overrides `pa_ex1/units/land/titan_vehicle/titan_vehicle_tool_weapon_side.json`
- `pa/units/land/titan_vehicle/titan_vehicle_tool_weapon_stomp.json` overrides `pa_ex1/units/land/titan_vehicle/titan_vehicle_tool_weapon_stomp.json`
- `pa/units/land/torpedo_launcher/torpedo_launcher.papa` overrides `pa_ex1/units/land/torpedo_launcher/torpedo_launcher.papa`
- `pa/units/land/torpedo_launcher_adv/torpedo_launcher_adv.papa` overrides `pa_ex1/units/land/torpedo_launcher_adv/torpedo_launcher_adv.papa`
- `pa/units/land/unit_cannon/unit_cannon.json` overrides `pa_ex1/units/land/unit_cannon/unit_cannon.json`
- `pa/units/land/unit_cannon/unit_cannon_build_arm.json` overrides `pa_ex1/units/land/unit_cannon/unit_cannon_build_arm.json`
- `pa/units/land/unit_cannon/unit_cannon_deploy.json` overrides `pa_ex1/units/land/unit_cannon/unit_cannon_deploy.json`
- `pa/units/land/unit_cannon/unit_cannon_tool_weapon.json` overrides `pa/units/land/unit_cannon/unit_cannon_tool_weapon.json`
- `pa/units/land/vehicle_factory/vehicle_factory.json` overrides `pa_ex1/units/land/vehicle_factory/vehicle_factory.json`
- `pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json` overrides `pa_ex1/units/land/vehicle_factory_adv/vehicle_factory_adv.json`
- `pa/units/land/vehicle_factory_adv/vehicle_factory_adv_build_arm.json` overrides `pa_ex1/units/land/vehicle_factory_adv/vehicle_factory_adv_build_arm.json`
- `pa/units/orbital/deep_space_radar/deep_space_radar.json` overrides `pa_ex1/units/orbital/deep_space_radar/deep_space_radar.json`
- `pa/units/orbital/defense_satellite/defense_satellite.json` overrides `pa_ex1/units/orbital/defense_satellite/defense_satellite.json`
- `pa/units/orbital/defense_satellite/defense_satellite_tool_ground.json` overrides `pa_ex1/units/orbital/defense_satellite/defense_satellite_tool_ground.json`
- `pa/units/orbital/defense_satellite/defense_satellite_tool_orbital.json` overrides `pa_ex1/units/orbital/defense_satellite/defense_satellite_tool_orbital.json`
- `pa/units/orbital/delta_v_engine/delta_v_engine.json` overrides `pa_ex1/units/orbital/delta_v_engine/delta_v_engine.json`
- `pa/units/orbital/ion_defense/ion_defense.json` overrides `pa_ex1/units/orbital/ion_defense/ion_defense.json`
- `pa/units/orbital/ion_defense/ion_defense_ammo.json` overrides `pa_ex1/units/orbital/ion_defense/ion_defense_ammo.json`
- `pa/units/orbital/ion_defense/ion_defense_antidrop_ammo.json` overrides `pa_ex1/units/orbital/ion_defense/ion_defense_antidrop_ammo.json`
- `pa/units/orbital/ion_defense/ion_defense_tool_antidrop.json` overrides `pa/units/orbital/ion_defense/ion_defense_tool_antidrop.json`
- `pa/units/orbital/ion_defense/ion_defense_tool_weapon.json` overrides `pa_ex1/units/orbital/ion_defense/ion_defense_tool_weapon.json`
- `pa/units/orbital/mining_platform/mining_platform.json` overrides `pa_ex1/units/orbital/mining_platform/mining_platform.json`
- `pa/units/orbital/mining_platform/mining_platform_nuke.json` overrides `pa_ex1/units/orbital/mining_platform/mining_platform_nuke.json`
- `pa/units/orbital/orbital_battleship/orbital_battleship.json` overrides `pa_ex1/units/orbital/orbital_battleship/orbital_battleship.json`
- `pa/units/orbital/orbital_battleship/orbital_battleship_ammo.json` overrides `pa_ex1/units/orbital/orbital_battleship/orbital_battleship_ammo.json`
- `pa/units/orbital/orbital_battleship/orbital_battleship_ammo_ground.json` overrides `pa_ex1/units/orbital/orbital_battleship/orbital_battleship_ammo_ground.json`
- `pa/units/orbital/orbital_battleship/orbital_battleship_tool_weapon.json` overrides `pa_ex1/units/orbital/orbital_battleship/orbital_battleship_tool_weapon.json`
- `pa/units/orbital/orbital_battleship/orbital_battleship_tool_weapon_ground.json` overrides `pa_ex1/units/orbital/orbital_battleship/orbital_battleship_tool_weapon_ground.json`
- `pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json` overrides `pa_ex1/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json`
- `pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot_build_arm.json` overrides `pa_ex1/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot_build_arm.json`
- `pa/units/orbital/orbital_factory/orbital_factory.json` overrides `pa_ex1/units/orbital/orbital_factory/orbital_factory.json`
- `pa/units/orbital/orbital_factory/orbital_factory_build_arm.json` overrides `pa_ex1/units/orbital/orbital_factory/orbital_factory_build_arm.json`
- `pa/units/orbital/orbital_fighter/orbital_fighter.json` overrides `pa_ex1/units/orbital/orbital_fighter/orbital_fighter.json`
- `pa/units/orbital/orbital_fighter/orbital_fighter_ammo.json` overrides `pa_ex1/units/orbital/orbital_fighter/orbital_fighter_ammo.json`
- `pa/units/orbital/orbital_fighter/orbital_fighter_tool_weapon.json` overrides `pa_ex1/units/orbital/orbital_fighter/orbital_fighter_tool_weapon.json`
- `pa/units/orbital/orbital_lander/orbital_lander.json` overrides `pa_ex1/units/orbital/orbital_lander/orbital_lander.json`
- `pa/units/orbital/orbital_laser/orbital_laser.json` overrides `pa_ex1/units/orbital/orbital_laser/orbital_laser.json`
- `pa/units/orbital/orbital_laser/orbital_laser_ammo.json` overrides `pa_ex1/units/orbital/orbital_laser/orbital_laser_ammo.json`
- `pa/units/orbital/orbital_laser/orbital_laser_tool_weapon.json` overrides `pa_ex1/units/orbital/orbital_laser/orbital_laser_tool_weapon.json`
- `pa/units/orbital/orbital_launcher/orbital_launcher.json` overrides `pa_ex1/units/orbital/orbital_launcher/orbital_launcher.json`
- `pa/units/orbital/orbital_mine/orbital_mine.json` overrides `pa_ex1/units/orbital/orbital_mine/orbital_mine.json`
- `pa/units/orbital/orbital_mine/orbital_mine.papa` overrides `pa_ex1/units/orbital/orbital_mine/orbital_mine.papa`
- `pa/units/orbital/orbital_mine/orbital_mine_tool_weapon.json` overrides `pa_ex1/units/orbital/orbital_mine/orbital_mine_tool_weapon.json`
- `pa/units/orbital/orbital_probe/orbital_probe.json` overrides `pa_ex1/units/orbital/orbital_probe/orbital_probe.json`
- `pa/units/orbital/orbital_railgun/orbital_railgun.json` overrides `pa_ex1/units/orbital/orbital_railgun/orbital_railgun.json`
- `pa/units/orbital/orbital_railgun/orbital_railgun_ammo.json` overrides `pa_ex1/units/orbital/orbital_railgun/orbital_railgun_ammo.json`
- `pa/units/orbital/orbital_railgun/orbital_railgun_tool_weapon.json` overrides `pa_ex1/units/orbital/orbital_railgun/orbital_railgun_tool_weapon.json`
- `pa/units/orbital/radar_satellite/radar_satellite.json` overrides `pa_ex1/units/orbital/radar_satellite/radar_satellite.json`
- `pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json` overrides `pa_ex1/units/orbital/radar_satellite_adv/radar_satellite_adv.json`
- `pa/units/orbital/solar_array/solar_array.json` overrides `pa_ex1/units/orbital/solar_array/solar_array.json`
- `pa/units/orbital/titan_orbital/titan_orbital.json` overrides `pa_ex1/units/orbital/titan_orbital/titan_orbital.json`
- `pa/units/orbital/titan_orbital/titan_orbital_ammo.json` overrides `pa_ex1/units/orbital/titan_orbital/titan_orbital_ammo.json`
- `pa/units/orbital/titan_orbital/titan_orbital_tool_weapon_ground.json` overrides `pa_ex1/units/orbital/titan_orbital/titan_orbital_tool_weapon_ground.json`
- `pa/units/orbital/titan_orbital/titan_orbital_tool_weapon_orbital.json` overrides `pa_ex1/units/orbital/titan_orbital/titan_orbital_tool_weapon_orbital.json`
- `pa/units/sea/artillery_long/artillery_long.papa` overrides `pa/units/sea/artillery_long/artillery_long.papa`
- `pa/units/sea/attack_sub/attack_sub.json` overrides `pa_ex1/units/sea/attack_sub/attack_sub.json`
- `pa/units/sea/attack_sub/attack_sub.papa` overrides `pa/units/sea/attack_sub/attack_sub.papa`
- `pa/units/sea/attack_sub/attack_sub_tool_weapon.json` overrides `pa_ex1/units/sea/attack_sub/attack_sub_tool_weapon.json`
- `pa/units/sea/base_ship/base_ship.json` overrides `pa_ex1/units/sea/base_ship/base_ship.json`
- `pa/units/sea/battleship/battleship.json` overrides `pa_ex1/units/sea/battleship/battleship.json`
- `pa/units/sea/battleship/battleship.papa` overrides `pa/units/sea/battleship/battleship.papa`
- `pa/units/sea/battleship/battleship_ammo.json` overrides `pa_ex1/units/sea/battleship/battleship_ammo.json`
- `pa/units/sea/battleship/battleship_tool_weapon.json` overrides `pa/units/sea/battleship/battleship_tool_weapon.json`
- `pa/units/sea/destroyer/destroyer.json` overrides `pa_ex1/units/sea/destroyer/destroyer.json`
- `pa/units/sea/destroyer/destroyer.papa` overrides `pa/units/sea/destroyer/destroyer.papa`
- `pa/units/sea/destroyer/destroyer_ammo.json` overrides `pa_ex1/units/sea/destroyer/destroyer_ammo.json`
- `pa/units/sea/destroyer/destroyer_tool_weapon.json` overrides `pa_ex1/units/sea/destroyer/destroyer_tool_weapon.json`
- `pa/units/sea/destroyer/destroyer_torpedo_ammo.json` overrides `pa_ex1/units/sea/destroyer/destroyer_torpedo_ammo.json`
- `pa/units/sea/drone_carrier/carrier/carrier.json` overrides `pa_ex1/units/sea/drone_carrier/carrier/carrier.json`
- `pa/units/sea/drone_carrier/carrier/carrier_ammo.json` overrides `pa_ex1/units/sea/drone_carrier/carrier/carrier_ammo.json`
- `pa/units/sea/drone_carrier/carrier/carrier_tool_weapon.json` overrides `pa_ex1/units/sea/drone_carrier/carrier/carrier_tool_weapon.json`
- `pa/units/sea/drone_carrier/drone/drone.json` overrides `pa_ex1/units/sea/drone_carrier/drone/drone.json`
- `pa/units/sea/drone_carrier/drone/drone_ammo.json` overrides `pa_ex1/units/sea/drone_carrier/drone/drone_ammo.json`
- `pa/units/sea/drone_carrier/drone/drone_ammo_torpedo.json` overrides `pa_ex1/units/sea/drone_carrier/drone/drone_ammo_torpedo.json`
- `pa/units/sea/drone_carrier/drone/drone_tool_torpedo.json` overrides `pa_ex1/units/sea/drone_carrier/drone/drone_tool_torpedo.json`
- `pa/units/sea/drone_carrier/drone/drone_tool_weapon.json` overrides `pa_ex1/units/sea/drone_carrier/drone/drone_tool_weapon.json`
- `pa/units/sea/fabrication_barge/fabrication_barge.json` overrides `pa_ex1/units/sea/fabrication_barge/fabrication_barge.json`
- `pa/units/sea/fabrication_barge/fabrication_barge_build_arm.json` overrides `pa_ex1/units/sea/fabrication_barge/fabrication_barge_build_arm.json`
- `pa/units/sea/fabrication_ship/fabrication_ship.json` overrides `pa_ex1/units/sea/fabrication_ship/fabrication_ship.json`
- `pa/units/sea/fabrication_ship/fabrication_ship_build_arm.json` overrides `pa_ex1/units/sea/fabrication_ship/fabrication_ship_build_arm.json`
- `pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json` overrides `pa_ex1/units/sea/fabrication_ship_adv/fabrication_ship_adv.json`
- `pa/units/sea/fabrication_ship_adv/fabrication_ship_adv_build_arm.json` overrides `pa_ex1/units/sea/fabrication_ship_adv/fabrication_ship_adv_build_arm.json`
- `pa/units/sea/frigate/frigate.json` overrides `pa_ex1/units/sea/frigate/frigate.json`
- `pa/units/sea/frigate/frigate.papa` overrides `pa/units/sea/frigate/frigate.papa`
- `pa/units/sea/frigate/frigate_ammo_shell.json` overrides `pa_ex1/units/sea/frigate/frigate_ammo_shell.json`
- `pa/units/sea/frigate/frigate_tool_weapon_shell.json` overrides `pa_ex1/units/sea/frigate/frigate_tool_weapon_shell.json`
- `pa/units/sea/frigate/frigate_tool_weapon_torpedo.json` overrides `pa_ex1/units/sea/frigate/frigate_tool_weapon_torpedo.json`
- `pa/units/sea/hover_ship/hover_ship.json` overrides `pa_ex1/units/sea/hover_ship/hover_ship.json`
- `pa/units/sea/hover_ship/hover_ship.papa` overrides `pa_ex1/units/sea/hover_ship/hover_ship.papa`
- `pa/units/sea/hover_ship/hover_ship_ammo.json` overrides `pa_ex1/units/sea/hover_ship/hover_ship_ammo.json`
- `pa/units/sea/hover_ship/hover_ship_ammo_side.json` overrides `pa_ex1/units/sea/hover_ship/hover_ship_ammo_side.json`
- `pa/units/sea/hover_ship/hover_ship_tool_weapon.json` overrides `pa_ex1/units/sea/hover_ship/hover_ship_tool_weapon.json`
- `pa/units/sea/hover_ship/hover_ship_tool_weapon_side.json` overrides `pa_ex1/units/sea/hover_ship/hover_ship_tool_weapon_side.json`
- `pa/units/sea/missile_ship/missile_ship.json` overrides `pa_ex1/units/sea/missile_ship/missile_ship.json`
- `pa/units/sea/missile_ship/missile_ship.papa` overrides `pa/units/sea/missile_ship/missile_ship.papa`
- `pa/units/sea/missile_ship/missile_ship_ammo.json` overrides `pa_ex1/units/sea/missile_ship/missile_ship_ammo.json`
- `pa/units/sea/naval_factory/naval_factory.json` overrides `pa_ex1/units/sea/naval_factory/naval_factory.json`
- `pa/units/sea/naval_factory/naval_factory_build_arm.json` overrides `pa_ex1/units/sea/naval_factory/naval_factory_build_arm.json`
- `pa/units/sea/naval_factory_adv/naval_factory_adv.json` overrides `pa_ex1/units/sea/naval_factory_adv/naval_factory_adv.json`
- `pa/units/sea/naval_factory_adv/naval_factory_adv_build_arm.json` overrides `pa_ex1/units/sea/naval_factory_adv/naval_factory_adv_build_arm.json`
- `pa/units/sea/nuclear_sub/nuclear_sub.json` overrides `pa_ex1/units/sea/nuclear_sub/nuclear_sub.json`
- `pa/units/sea/nuclear_sub/nuclear_sub.papa` overrides `pa/units/sea/nuclear_sub/nuclear_sub.papa`
- `pa/units/sea/sea_mine/sea_mine.json` overrides `pa_ex1/units/sea/sea_mine/sea_mine.json`
- `pa/units/sea/sea_scout/sea_scout.json` overrides `pa_ex1/units/sea/sea_scout/sea_scout.json`
- `pa/units/sea/sea_scout/sea_scout_tool_weapon.json` overrides `pa_ex1/units/sea/sea_scout/sea_scout_tool_weapon.json`
- `pa/units/sea/torpedo/default.settings` overrides `pa_ex1/units/sea/torpedo/default.settings`
- `pa/units/sea/torpedo/torpedo.papa` overrides `pa/units/sea/torpedo/torpedo.papa`
- `pa/units/sea/torpedo_launcher/torpedo_launcher.json` overrides `pa_ex1/units/sea/torpedo_launcher/torpedo_launcher.json`
- `pa/units/sea/torpedo_launcher/torpedo_launcher_tool_weapon.json` overrides `pa_ex1/units/sea/torpedo_launcher/torpedo_launcher_tool_weapon.json`
- `pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json` overrides `pa_ex1/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json`
- `pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv_tool_weapon.json` overrides `pa_ex1/units/sea/torpedo_launcher_adv/torpedo_launcher_adv_tool_weapon.json`
- `pa/units/sea/torpedo_small/default.settings` overrides `pa_ex1/units/sea/torpedo_small/default.settings`
- `pa/units/unit_list.json` overrides `pa_ex1/units/unit_list.json`

</details>

The mod also has 119 files at paths that other mods own. The counts for each mod are: Exiles 51, Osmech 35, Upgrades 29, Titan Gantry 4, Legion Expansion 1, More Pew Pew 1. The description says that H-COM is standalone. Thus these files do not replace the files of the other mods in a supported setup. They are whole-file copies, and they do not get the later fixes of those mods.

**Why it matters:** A shadowed file is a whole copy, not a diff. JSON, and scripts whose functions cannot be hijacked, offer no way to override part of the file, so shadowing is the only option — but when PA patches an original, the copy silently keeps the old content and the change is lost. Nothing reports the divergence.

**Fix:** Record these paths in the mod's release checklist and re-diff each against the base game after each PA patch.

<sub>`shadow.unavoidable`</sub>

---

## Code Quality

> Performance or general improvement.

### QUA-016 — Shadows a base-game file without changing it

**Location:** 4 files

**Occurrences:** 4

**Found:** Each file is byte-identical to the base-game file.

- `pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.papa`
- `pa/units/commanders/avatar/avatar.json`
- `pa/units/orbital/orbital_mine/orbital_mine_ammo.json`
- `pa/units/sea/torpedo_small/torpedo_small.papa`

**Why it matters:** The file overrides the base game with an exact copy, so it has no effect today, but it will silently override — and revert — any change PA makes to this file in a future patch.

**Fix:** Delete the file and let the base game provide it.

<sub>`shadow.identical`</sub>

---

### QUA-017 — Files that nothing appears to reference

**Location:** See the lists.

**Found:** The CLI found no reference to these files:

- `pa/units/arsenal/unlocks/base_unlock/`: base_adv_arsenal.json, base_unlock.json
- `pa/units/land/anti_ballistics/`: anti_ballistics_ammo.json, anti_ballistics_icon_buildbar.png.settings
- `pa/units/land/behemoth/`: null_ammo_death.json
- `pa/units/land/bot_nanoswarmX/`: bot_nanoswarmX_build_arm.json
- `pa/units/land/demi_titan_bot/pfx/`: footstep_02.json, proj_trail.json
- `pa/units/land/shah/`: shah_tool_weapon_short.json
- `pa/units/land/tank_armor/`: tank_armor_torpedo_tool_weapon.json
- `pa/units/thorosmen/bot_freeze/minion/`: pulse_tool_weapon.json
- `pa/units/thorosmen/st_bot_white_hole/`: mine_vehicle.json

The review also found these files:

- `ui/mods/com.pa.kasa.hcom-server/fab_tower_patrol.js`. No scene entry names it. `mechanics.js` has the same fab tower logic.
- `ui/mods/com.pa.kasa.hcom-server/live_game/init.js`. No scene entry names it. It is a third version of the AutoFactory script (see CON-010 of the client report).

The reference walk from `unit_list.json` did not reach the specs in the next list. A text search of the two repositories found no reference to them from a file that the walk reached. Each spec also has a defect that the CLI reported as a Blocker or a Bug:

- `pa/units/air/fighter_adv/chaff/flare_adv_beam_tool_weapon.json`: `/pa/units/air/fighter/flare/flare_beam_ammo.json` does not exist
- `pa/units/arsenal/unlocks/tank_nuke_airboom_unlock/arsenal_tank_nuke.json`: `/pa/units/arsenal/unlocks/base_unlock/arsenal_bulb.papa` does not exist
- `pa/units/land/edison/lightning.json`: `/pa/units/land/pfx/death.pfx` does not exist
- `pa/units/sea/frigate/frigate_mine_deploy_ammo.json`: `/pa/units/land/artillery_unit_launcher/fpv_drone/air_scoutX.papa` does not exist
- `pa/units/thorosmen/st_bot_white_hole/st_bot_white_hole.json`: `/pa/effects/specs/st_explosion.pfx` does not exist
- `pa/units/upgrades/energy_plant_adv_3_build/energy_plant_adv_3_build.json`: `/pa/units/land/laser_defense_legged_build/weapon_death.json` does not exist
- `pa/units/upgrades/energy_plant_adv_3_build/energy_plant_adv_3_build.json`: `/pa/units/land/laser_defense_legged_build/death.pfx` does not exist
- `pa/units/arsenal/unlocks/base_unlock/base_adv_arsenal.json`: `rolloff_dirs[0]` allows at most 3 items (5 schema findings). The file is byte-identical to the file in the Upgrades mod.

**Why it matters:** No path or filename matching these appears in any manifest, spec, script, stylesheet or effect shipped by this mod, its paired mods, or the surrounding base-game tree. They add to the download without being used. More usefully, an unreferenced file is often the leftover half of a rename, so check whether something should have been pointing at it. Directories PA scans (pa/ai*), base-game shadows and texture companions are excluded. If a route that the review cannot see loads one of the specs in the last list, its defect is a Blocker.

**Fix:** Remove the files, or correct whatever should have referenced them.

<sub>`unreferenced.file`</sub>

---

### QUA-018 — The arsenal and mechanics scripts keep stale copies and leftover data

**Location:** `ui/mods/com.pa.kasa.hcom-server/arsenal.js`, `arsenal_live_game.js`, `arsenal_build_bar.js`, `mechanics.js`, `solar_mechanics.js`, `wind_mechanics.js`, `spawn_landing_capsule.js`

**Found:** 

- `arsenal_live_game.js:89` and `:141` replace `model.executeStartBuild` and `model.buildItemBySpec` with full copies. The copy of `buildItemBySpec` does not have the spec-tag fallback that the stock function has in build 124705 (`ui/main/game/live_game/live_game.js:1839-1855`).
- `arsenal_build_bar.js:123-213` replaces `parseSelection` on the build set with a full copy, 5 seconds after the script loads.
- `arsenal.js:6` names `/pa/units/structure/control_node/portal/portal_charging.json`, a Bug Faction unit that is not in this mod. Each second, line 293 calls `getUnitState` with an undefined argument.
- `arsenal.js:165-237` has 13 unlock pairs for Bug Faction units that are not in this mod.
- `arsenal_build_bar.js:17` schedules a second try when `buildSet` is undefined. Line 18 then reads `model.buildSet().units` and throws.
- These names have no `var` and become globals in the shared scene scope: `arsenalLoop`, `order`, `planet`, `army`, `unit`, `i`, `armyKeys`, `factorySpecs`, `selectedUnitArray`, `key`.
- `mechanics.js`, `solar_mechanics.js` and `wind_mechanics.js` are three copies of one polling loop. Each loop requests all units of the army on each planet.
- `arsenal.js:257`, `:320`, `:327` and `arsenal_build_bar.js:47`, `:108`, `:113`, `:118` write to the log during normal play. `spawn_landing_capsule.js:88` logs each `create_unit`.
- `spawn_landing_capsule.js:10` examines planets 0 to 15 only. Line 9 sets a 100 ms poll that continues until the script finds each commander.

**Why it matters:** A full copy of a stock function removes each later change that PA makes to that function. The leftover Bug Faction entry makes one engine call each second that has no function, and the call may write an error to the log. A global name can collide with a different mod in the same scene.

**Fix:** 

1. Wrap each stock function: keep a reference to the original, change the argument, then call the original.
2. Delete the Bug Faction entries.
3. Add `return` after the second try in `model.lockUnit`.
4. Declare each variable with `var`.
5. Merge the three polling loops into one loop that makes one unit request for each planet.

<sub>`review.scene-script`</sub>

---

## Unverified — needs clarification

> Could not be resolved against the references. **Not a verdict.**

### UNV-019 — Server mod conduct rules need manual confirmation

**Location:** `modinfo.json`

**Found:** This is a server mod. The CLI raises this item for each server mod.

**Why it matters:** Server mods must not install outside the current game, change user settings or data without permission, take over PA (eg fullscreen with no cancel), prevent players leaving a game, or show inappropriate content. Badly behaved server mods are terminated by administrators. None of these can be established by static analysis.

**Fix:** Confirm each of the five restrictions by inspection before submitting. The first item of the list after this finding gives the one related behaviour that the review found.

<sub>`conduct.server-restrictions`</sub>

---

The review also could not confirm these points:

- **Server mod conduct.** Static analysis cannot confirm the five conduct rules. The review found one related behaviour. `hcom_force_sandbox.js` sets the `sandbox` lobby option of the host, and sets it again if the host clears it (see CON-008). The review found no network request in the scripts of this mod.
- **Engine behaviour for the missing files in BLO-001.** The review did not start PA. It cannot confirm which missing files stop a unit and which only remove an effect.
- **The build test in BLO-001, BUG-003 and CON-011.** The test evaluates `buildable_types` from the spec files. The review did not confirm the result in a game. A route that the specs do not show can change the result. An example is a `create_unit` message in sandbox mode.
- **`getUnitState` with an undefined argument.** `arsenal.js:293` makes this call each second. The review cannot confirm if the engine writes an error for it.
- **Unregistered units that other specs reference.** These units are not in `unit_list.json`. The references do not say if PA loads such a spec when a weapon or a death event spawns it.
- **Permission from the authors of the mods that have no licence.** The review cannot see private agreements (see COM-012).

## Not covered by this review

- `.papa` files. The review checked that each file exists and is not empty. It did not read the contents.
- Balance values. The mod changes almost all unit statistics on purpose. The review did not compare costs, ranges or damage with the base game.
- A test in the game. All findings come from the files.
- Base-game changes between build 124627 (the `build` value) and build 124705 (the installed game). The review did not examine which of the 329 shadowed files PA changed between these builds.
- A line-by-line comparison of the modified third-party copies with their upstream files. The review classified each file only as identical or modified.
- AI behaviour, apart from CON-009.
- `version` against a release. Community Mods does not list the mod, and the repository has no tag.
- The CLI uses vocabulary snapshots (`pfx-keys.json`, the scene list). The review did not regenerate them for build 124705.

---

<sub>Generated by `pa-mod-review`. Findings marked Unverified could not be resolved against the bundled references and are not verdicts — they need a human decision.</sub>
