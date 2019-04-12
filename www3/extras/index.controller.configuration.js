function check_newtab_switches() {
	newtab_for_ais_elibrary = $("#switch_for_ais_elibrary_newtab").prop('checked');
	newtab_for_dblp = $("#switch_for_dblp_newtab").prop('checked');
	newtab_for_scopus = $("#switch_for_scopus_newtab").prop('checked');
}

function reset_switch_to_default(switch_to_set) {
	if (switch_to_set == "#switch_for_ais_elibrary_newtab") {
		$(switch_to_set).bootstrapSwitch('state', DEFAULT_FOR_SWITCH_AIS_LIBRARY);
	}
	if (switch_to_set == "#switch_for_dblp_newtab") {
		$(switch_to_set).bootstrapSwitch('state', DEFAULT_FOR_SWITCH_DBLP);
	}
	if (switch_to_set == "#switch_for_scopus_newtab") {
		$(switch_to_set).bootstrapSwitch('state', DEFAULT_FOR_SWITCH_SCOPUS);
	}

	// refresh bootstrap widget
	$(switch_to_set).bootstrapSwitch();

	// send view --> model
	check_newtab_switches();

	return false;
}