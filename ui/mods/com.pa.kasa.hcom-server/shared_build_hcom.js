var newBuild = {
	//turrets
	"/pa/units/land/pounder/pounder.json": ["combat", 8, { row: 1, column: 2 }],
	"/pa/units/land/artillery_long/artillery_long.json": ["combat", 2, { row: 0, column: 2 }],
	"/pa/units/land/cram/cram.json": ["combat", 18, { row: 2, column: 6 }],
	"/pa/units/land/cram_adv/cram_adv.json": ["combat", 12, { row: 1, column: 6 }],
	"/pa/units/land/anti_ballistics/anti_ballistics.json": ["combat", 6, { row: 0, column: 6 }],
	"/pa/units/land/furrow/furrow.json": ["combat", 19, { row: 2, column: 7 }],
	"/pa/units/land/eclipse/eclipse.json": ["combat", 13, { row: 1, column: 7 }],
	"/pa/units/land/air_defense/air_defense.json": ["combat", 14, { row: 1, column: 1 }],
	"/pa/units/land/air_defense_adv/air_defense_adv.json": ["combat", 10, { row: 2, column: 1 }],
	"/pa/units/land/aa_defense_long/aa_defense_long.json": ["combat", 1, { row: 0, column: 1 }],
	"/pa/units/land/bastion/bastion.json": ["combat", 7, { row: 0, column: 7 }],
	"/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json": ["combat", 15, { row: 2, column: 3 }],
	"/pa/units/land/basic_missile_defence/basic_missile_defence.json": ["combat", 9, { row: 1, column: 3 }],
	"/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json": ["combat", 3, { row: 0, column: 3 }],
	"/pa/units/orbital/ion_defense/ion_defense.json": ["combat", 17, { row: 2, column: 5 }],
	"/pa/units/land/skyranger/skyranger.json": ["combat", 11, { row: 1, column: 5 }],
	"/pa/units/land/maciota/maciota.json": ["combat", 5, { row: 0, column: 5 }],
	"/pa/units/sea/torpedo_launcher/torpedo_launcher.json": ["combat", 20, { row: 2, column: 8 }],
	"/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json": ["combat", 21, { row: 1, column: 8 }],
	"/pa/units/land/nuke_launcher/nuke_launcher.json": ["combat", 4, { row: 0, column: 4 }],
	//bunker
	"/pa/units/thorosmen/bunker_build/bunker_build.json": ["combat", 16, { row: 2, column: 4 }],
	//stackable turrets
	"/pa/units/paeiou/energy_coil/energy_coil.json": ["ele", 6, { row: 2, column: 0 }],
	"/pa/units/paeiou/energy_coil/energy_coil_am.json": ["ele", 7, { row: 2, column: 1 }],
	"/pa/units/land/pylon/pylon.json": ["ele", 3, { row: 1, column: 0 }],
	"/pa/units/land/pylon/pylon_am.json": ["ele", 4, { row: 1, column: 1 }],
	"/pa/units/land/control_tower/control_tower.json": ["ele", 0, { row: 0, column: 0 }],
	"/pa/units/land/edison/edison.json": ["ele", 1, { row: 0, column: 1 }],
	"/pa/units/land/spell_heal/spell_heal_bal.json": ["ele", 5, { row: 1, column: 2 }],
	"/pa/units/land/seizmic/seizmic.json": ["ele", 2, { row: 0, column: 2 }],
	//upgradable structures
	"/pa/units/land/air_defense_adv/air_defense_adv_base.json": ["upgrade3", 0, { row: 2, column: 0 }],
	"/pa/units/land/air_defense_adv/air_defense_adv_base_2.json": ["upgrade3", 0, { row: 1, column: 0 }],

	"/pa/units/land/bastion/bastion_base.json": ["upgrade7", 0, { row: 2, column: 0 }],
	"/pa/units/land/bastion/bastion_base_2.json": ["upgrade7", 0, { row: 1, column: 0 }],

	"/pa/units/land/aa_defense_long/aa_defense_long_base.json": ["upgrade4", 0, { row: 2, column: 0 }],
	"/pa/units/land/aa_defense_long/aa_defense_long_base_2.json": ["upgrade4", 0, { row: 1, column: 0 }],

	"/pa/units/land/artillery_short/artillery_short_base.json": ["upgrade6", 0, { row: 2, column: 0 }],
	"/pa/units/land/artillery_short/artillery_short_base_2.json": ["upgrade6", 0, { row: 1, column: 0 }],

	"/pa/units/land/land_barrier/land_barrier_big.json": ["upgrade5", 0, { row: 2, column: 0 }],
	"/pa/units/land/land_barrier/land_barrier_big_sea.json": ["upgrade5", 0, { row: 1, column: 0 }],

	"/pa/units/land/orbital_shield/orbital_shield_2.json": ["upgrades43", 0, { row: 2, column: 0 }],
		
	"/pa/units/land/energy_plant_adv/energy_plant_adv.json": ["utility", 3, { row: 0, column: 3 }],
	"/pa/units/land/energy_plant_adv/energy_plant_adv_base.json": ["upgrade1", 0, { row: 2, column: 0 }],
	"/pa/units/land/energy_plant_adv/energy_plant_adv_base_2.json": ["upgrade1", 0, { row: 1, column: 0 }],
	
	"/pa/units/land/energy_plant_adv/energy_plant_adv_2_base.json": ["upgrade2", 0, { row: 2, column: 0 }],
	"/pa/units/land/energy_plant_adv/energy_plant_adv_2_base_2.json": ["upgrade2", 0, { row: 1, column: 0 }],



	//ammo
	"/pa/units/land/ambush_twr/hid/ambush_twr_hid.json": ["ammo", 2, { row: 1, column: 1 }],
	"/pa/units/land/shrapnel_mine/shrapnel_mine.json": ["ammo", 1, { row: 1, column: 0 }],
	"/pa/units/land/land_mine_exp/land_mine_exp.json": ["ammo", 4, { row: 0, column: 0 }],

	"/pa/units/land/land_mine_small/land_mine_small.json": ["ammo", 3, { row: 2, column: 0 }],
	"/pa/units/land/land_mine/land_mine.json": ["ammo", 14, { row: 2, column: 1 }],
	"/pa/units/orbital/orbital_mine/orbital_mine.json": ["ammo", 10, { row: 2, column: 2 }],

	"/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_up_ammo.json": ["ammo", 0, { row: 2, column: 3 }],
	"/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json": ["ammo", 15, { row: 2, column: 4 }],
	"/pa/units/land/nuke_launcher/nuke_launcher_ammo.json": ["ammo", 16, { row: 2, column: 5 }],
	"/pa/units/land/nuke_launcher/nuke_launcher_up_ammo.json": ["ammo", 5, { row: 2, column: 6 }],
	"/pa/units/land/missile_facility/large_DOT_ammo.json": ["ammo", 6, { row: 2, column: 7 }],
	"/pa/units/land/missile_facility/large_stun_ammo.json": ["ammo", 7, { row: 2, column: 8 }],
	"/pa/units/land/missile_facility/precision_strike_ammo.json": ["ammo", 8, { row: 2, column: 9 }],
	"/pa/units/land/orbital_shield/orbital_shield_ammo.json": ["ammo", 9, { row: 2, column: 10 }],


	//air
	"/pa/units/air/adv_stealth_transport/adv_stealth_transport.json": ["air", 11, { row: 1, column: 6 }],
	"/pa/units/air/bomber_adv/bomber_adv.json": ["air", 12, { row: 1, column: 7 }],
	"/pa/units/paeiou/horntail/horntail.json": ["air", 13, { row: 2, column: 2 }],
	"/pa/units/air/transport/transport.json": ["air", 17, { row: 2, column: 6 }],
	"/pa/units/air/gunship/gunship.json": ["air", 5, { row: 1, column: 4 }],
	"/pa/units/air/bomber/bomber.json": ["air", 2, { row: 1, column: 2 }],

	"/pa/units/air/air_scout_adv/air_scout_adv.json": ["air", 3, { row: 1, column: 3 }],
	"/pa/units/air/solar_drone/solar_drone.json": ["air", 15, { row: 2, column: 4 }],
	"/pa/units/air/swordfish/swordfish.json": ["air", 16, { row: 2, column: 5 }],
	//bots
	"/pa/units/land/adv_heavy_bot/adv_heavy_bot.json": ["bot", 11, { row: 1, column: 5 }],
	"/pa/units/paeiou/spider/spider.json": ["bot", 12, { row: 1, column: 6 }],
	"/pa/units/land/bot_rpg/bot_rpg.json": ["bot", 17, { row: 2, column: 5 }],
	"/pa/units/land/rex/rex.json": ["bot", 15, { row: 2, column: 4 }],
	"/pa/units/land/bot_bomb/bot_bomb.json": ["bot", 18, { row: 2, column: 7 }],
	"/pa/units/land/bot_radar_adv/bot_radar_adv.json": ["bot", 13, { row: 1, column: 7 }],
	//tanks
	"/pa/units/land/fabrication_vehicle/fabrication_vehicle.json": ["vehicle", 0, { row: 1, column: 0 }],
	"/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json": ["vehicle", 8, { row: 2, column: 0 }],

	"/pa/units/land/aom_tank/aom_tank.json": ["vehicle", 11, { row: 1, column: 6 }],
	"/pa/units/paeiou/katrina/katrina.json": ["vehicle", 14, { row: 1, column: 7 }],
	"/pa/units/land/adv_tank_hover/adv_tank_hover.json": ["vehicle", 10, { row: 1, column: 5 }],
	"/pa/units/land/hover_fab/hover_fab.json": ["vehicle", 19, { row: 2, column: 7 }],
	"/pa/units/land/tank_aa/tank_aa.json": ["vehicle", 15, { row: 1, column: 8 }],
	"/pa/units/land/t_tank_flak/t_tank_flak.json": ["vehicle", 20, { row: 2, column: 8 }],
	"/pa/units/land/himars/himars.json": ["vehicle", 21, { row: 2, column: 9 }],
	"/pa/units/land/tank_gatling/tank_gatling.json": ["vehicle", 16, { row: 1, column: 9 }],
	//sea
	"/pa/units/sea/drone_carrier/carrier/carrier.json": ["sea", 3, { row: 1, column: 2 }],
	"/pa/units/sea/missile_ship/missile_ship.json": ["sea", 8, { row: 1, column: 3 }],
	"/pa/units/paeiou/dolfin/dolfin.json": ["sea", 10, { row: 1, column: 5 }],
	"/pa/units/sea/nuclear_sub/nuclear_sub.json": ["sea", 9, { row: 1, column: 6 }],
	"/pa/units/sea/destroyer/destroyer.json": ["sea", 13, { row: 2, column: 1 }],
	"/pa/units/sea/frigate/frigate.json": ["sea", 14, { row: 2, column: 2 }],
	"/pa/units/sea/basic_missile_ship/basic_missile_ship.json": ["sea", 15, { row: 2, column: 3 }],
	"/pa/units/sea/attack_sub/attack_sub.json": ["sea", 18, { row: 2, column: 6 }],
	//utility
	"/pa/units/land/orbital_shield/orbital_shield.json": ["utility", 0, { row: 0, column: 0 }],
	"/pa/units/land/shield_gen/shield_gen.json": ["utility", 5, { row: 1, column: 0 }],
	"/pa/units/land/bot_tree/moving_tree_mine/moving_tree_mine.json": ["utility", 6, { row: 1, column: 0 }],
	"/pa/units/land/jammer_titan/jammer_titan.json": ["utility", 1, { row: 0, column: 1 }],
	"/pa/units/land/radar_jammer/radar_jammer.json": ["utility", 7, { row: 1, column: 1 }],
	"/pa/units/orbital/deep_space_radar/deep_space_radar.json": ["utility", 3, { row: 0, column: 2 }],
	"/pa/units/paeiou/solar_cell/solar_cell.json": ["utility", 19, { row: 2, column: 5 }],
	"/pa/units/land/wind_turbine/wind_turbine.json": ["utility", 20, { row: 1, column: 5 }],
	"/pa/units/land/fab_tower/fab_tower.json": ["utility", 21, { row: 0, column: 5 }],
	//eperimental eco
	"/pa/units/land/metal_destructor/metal_destructor.json": ["utility", 6, { row: 0, column: 6 }],
	"/pa/units/land/adv_metal_generator/adv_metal_generator.json": ["utility", 12, { row: 1, column: 6 }],
	"/pa/units/land/t_metal_extractor_1/t_metal_extractor_1.json": ["utility", 18, { row: 2, column: 6 }],

	//engines
	"/pa/units/orbital/delta_v_engine/delta_v_engine.json": ["endgame", 6, { row: 1, column: 0 }],
	"/pa/units/land/control_module/control_module.json": ["endgame", 0, { row: 0, column: 0 }],
	"/pa/units/land/titan_structure/titan_structure.json": ["endgame", 12, { row: 2, column: 0 }],
	//orbital
	"/pa/units/orbital/mining_platform/mining_platform.json": ["orbital_structure", 0, { row: 0, column: 0 }],
	"/pa/units/orbital/orbital_factory/orbital_factory.json": ["orbital_structure", 6, { row: 1, column: 0 }],
	//experimental factory 
	"/pa/units/paeiou/experimental_gantry/experimental_gantry.json": ["factory", 4, { row: 0, column: 4 }],
	"/pa/units/land/titan_gantry/titan_gantry.json": ["factory", 3, { row: 0, column: 3 }],
	//experimental air
	"/pa/units/air/support_platform/support_platform.json": ["exp", 0, { row: 0, column: 0 }],
	"/pa/units/air/ufo/ufo.json": ["exp", 1, { row: 0, column: 1 }],
	"/pa/units/air/bomber_heavy/bomber_heavy.json": ["exp", 2, { row: 0, column: 2 }],
	"/pa/units/paeiou/yellowjacket/yellowjacket.json": ["exp", 3, { row: 0, column: 3 }],
	"/pa/units/air/t_transport_adv/t_transport_adv.json": ["exp", 4, { row: 0, column: 4 }],

	//experimental bots
	"/pa/units/land/bot_support_commander/bot_support_commander.json": ["exp", 5, { row: 1, column: 0 }],
	"/pa/units/paeiou/pineapple/pineapple.json": ["exp", 6, { row: 1, column: 1 }],
	"/pa/units/land/halabib/halabib.json": ["exp", 7, { row: 1, column: 2 }],
	"/pa/units/land/behemoth/behemoth.json": ["exp", 8, { row: 1, column: 3 }],
	"/pa/units/thorosmen/bot_freeze/bot_freeze.json": ["exp", 9, { row: 1, column: 4 }],
	"/pa/units/thorosmen/drill/drill.json": ["exp", 10, { row: 1, column: 5 }],
	"/pa/units/land/bot_nanoswarm/bot_nanoswarm.json": ["exp", 11, { row: 1, column: 6 }],
	//experimental tanks
	"/pa/units/land/tank_reaver/tank_reaver.json": ["exp", 10, { row: 2, column: 0 }],
	"/pa/units/land/tank_anti_nuke/tank_anti_nuke.json": ["exp", 11, { row: 2, column: 1 }],
	"/pa/units/land/tank_nuke/tank_nuke.json": ["exp", 12, { row: 2, column: 2 }],
	"/pa/units/land/mjolnir/mjolnir.json": ["exp", 13, { row: 2, column: 3 }],
	"/pa/units/paeiou/floater/floater.json": ["exp", 14, { row: 2, column: 4 }],
	"/pa/units/land/stalker/stalker.json": ["exp", 15, { row: 2, column: 6 }],
	"/pa/units/land/shah/shah.json": ["exp", 16, { row: 2, column: 5 }],
	//titans
	"/pa/units/orbital/titan_orbital/titan_orbital.json": ["titan", 0, { row: 2, column: 0 }],
	"/pa/units/air/titan_air/titan_air.json": ["titan", 1, { row: 2, column: 1 }],
	"/pa/units/land/demi_titan_bot/demi_titan_bot.json": ["titan", 2, { row: 2, column: 2 }],
	"/pa/units/land/titan_bot/titan_bot.json": ["titan", 3, { row: 2, column: 3 }],
	"/pa/units/land/titan_vehicle/titan_vehicle.json": ["titan", 4, { row: 2, column: 4 }],
	//energy
	"/pa/units/land/energy_plant/energy.json": ["energy", 0, { row: 2, column: 0 }],
	"/pa/units/land/energy_plant_adv/energy_adv.json": ["energy", 1, { row: 2, column: 1 }],
	"/pa/units/land/energy_plant_adv/energy_adv_2.json": ["energy", 2, { row: 2, column: 2 }],
	"/pa/units/land/energy_plant_adv/energy_adv_3.json": ["energy", 3, { row: 2, column: 3 }],
	//arsenal
	"/pa/units/arsenal/arsenal/arsenal.json": ["factory", 2, { row: 0, column: 2 }],
	//arsenal unlocks

	"/pa/units/arsenal/unlocks/assault_bot_up_unlock/assault_bot_up_unlock.json": ["arsenal", 2, { row: 2, column: 0 }],

	"/pa/units/arsenal/unlocks/bot_grenadier_up_unlock/bot_grenadier_up_unlock.json": ["arsenal", 2, { row: 2, column: 1 }],

	"/pa/units/arsenal/unlocks/bot_rpg_up_unlock/bot_rpg_up_unlock.json": ["arsenal", 2, { row: 2, column: 2 }],

	"/pa/units/arsenal/unlocks/assault_bot_adv_up_unlock/assault_bot_adv_up_unlock.json": ["arsenal", 2, { row: 2, column: 3 }],

	"/pa/units/arsenal/unlocks/bot_sniper_up_unlock/bot_sniper_up_unlock.json": ["arsenal", 2, { row: 2, column: 4 }],

	"/pa/units/arsenal/unlocks/adv_heavy_bot_up_unlock/adv_heavy_bot_up_unlock.json": ["arsenal", 2, { row: 2, column: 5 }],

	"/pa/units/arsenal/unlocks/tank_light_laser_up_unlock/tank_light_laser_up_unlock.json": ["arsenal", 2, { row: 1, column: 0 }],

	"/pa/units/arsenal/unlocks/tank_hover_up_unlock/tank_hover_up_unlock.json": ["arsenal", 2, { row: 1, column: 1 }],

	"/pa/units/arsenal/unlocks/tank_laser_adv_up_unlock/tank_laser_adv_up_unlock.json": ["arsenal", 2, { row: 1, column: 2 }],

	"/pa/units/arsenal/unlocks/tank_heavy_armor_up_unlock/tank_heavy_armor_up_unlock.json": ["arsenal", 2, { row: 1, column: 3 }],

	"/pa/units/arsenal/unlocks/tank_heavy_mortar_up_unlock/tank_heavy_mortar_up_unlock.json": ["arsenal", 2, { row: 1, column: 4 }],

	"/pa/units/arsenal/unlocks/nuke_unlock/nuke_unlock.json": ["arsenal", 2, { row: 0, column: 0 }],

	"/pa/units/arsenal/unlocks/anti_nuke_up_unlock/anti_nuke_up_unlock.json": ["arsenal", 2, { row: 0, column: 3 }],

	"/pa/units/arsenal/unlocks/nuke_ammo_unlock/nuke_ammo_unlock.json": ["arsenal", 2, { row: 0, column: 1 }],

	"/pa/units/arsenal/unlocks/hype_ammo_unlock/hype_ammo_unlock.json": ["arsenal", 2, { row: 0, column: 2 }],

	"/pa/units/arsenal/unlocks/gunship_up_unlock/gunship_up_unlock.json": ["arsenal", 2, { row: 0, column: 4 }],

	"/pa/units/arsenal/unlocks/orbital_battleship_up_unlock/orbital_battleship_up_unlock.json": ["arsenal", 2, { row: 0, column: 8 }],

	"/pa/units/arsenal/unlocks/orbital_railgun_up_unlock/orbital_railgun_up_unlock.json": ["arsenal", 2, { row: 1, column: 8 }],





}
if (Build && Build.HotkeyModel && Build.HotkeyModel.SpecIdToGridMap) {
	_.extend(Build.HotkeyModel.SpecIdToGridMap, newBuild);
}