function update_counters() {
	var my_intersection = _.intersection(user_selected_journal_ids_to_include, user_selected_journal_ids_to_inspect);
	$("#litbasket_sources_inclusion_count").html(my_intersection.length);
	$("#litbasket_sources_inspection_count").html(user_selected_journal_ids_to_inspect.length);
}

function toggle_inclusion_of_journal_with_id(given_journal_id) {
	var is_selected = $("#switch_for_journal_" + given_journal_id).prop('checked');

	if (is_selected) {
		include_journal_with_id(given_journal_id);
	} else {
		exclude_journal_with_id(given_journal_id);
	}
}

// WARNING: this does not change the UI state
// To do that, use:
// $("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', true);
function include_journal_with_id(given_journal_id) {
	user_selected_journal_ids_to_include.push(given_journal_id.toString());
	user_selected_journal_ids_to_include = _.uniq(user_selected_journal_ids_to_include);

	update_sidebar_badges();
	update_counters();
}

// WARNING: this does not change the UI state
// To do that, use:
// $("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', false);
function exclude_journal_with_id(given_journal_id) {
	user_selected_journal_ids_to_include = _.without(user_selected_journal_ids_to_include, given_journal_id.toString());
	user_selected_journal_ids_to_include = _.uniq(user_selected_journal_ids_to_include);

	update_sidebar_badges();
	update_counters();
}

function set_journal_inclusion_to_default(given_journal_id) {
	var journal_object = _.findWhere(saved_journals_master_data, {journal_id: given_journal_id});
	var is_core = (journal_object.listing_count >= GLOBAL_SEARCH_CONTROLLER.current_threshold);
	if (is_core) {
		$("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', true);
	} else {
		$("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', false);
	}
}


function cs_select_all() {
	for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
		var this_journal_id = user_selected_journal_ids_to_inspect[i];
		$("#switch_for_journal_" + this_journal_id).bootstrapSwitch('state', true);
	}
}

function cs_select_none() {
	for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
		var this_journal_id = user_selected_journal_ids_to_inspect[i];
		$("#switch_for_journal_" + this_journal_id).bootstrapSwitch('state', false);
	}
}

function cs_select_default() {
	for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
		var this_journal_id = user_selected_journal_ids_to_inspect[i];
		set_journal_inclusion_to_default(this_journal_id);
	}
}