/*
 * LitbasketsSourcesController
 * Instantiated in index.controller.js as GLOBAL_SOURCES_CONTROLLER
 */
LitbasketsSourcesController = {
	update_sidebar_sources_count: function() {
		var sources_count = "";
		if (UIJournalSelectorController.selectedJournalIdsForSearch.length > 0) {
			sources_count = UIJournalSelectorController.selectedJournalIdsForSearch.length;
		}
		$("#sidebar_badge_for_sources").html(sources_count);
	}

	, cs_select_all: function() {
		console.log("Executed: cs_select_all");
		for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
			var this_journal_id = user_selected_journal_ids_to_inspect[i];
			$("#switch_for_journal_" + this_journal_id).bootstrapSwitch('state', true);
		}
	}
	
	, cs_select_none: function() {
		console.log("Executed: cs_select_none");
		for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
			var this_journal_id = user_selected_journal_ids_to_inspect[i];
			$("#switch_for_journal_" + this_journal_id).bootstrapSwitch('state', false);
		}
	}
	
	, cs_select_default: function() {
		console.log("Executed: cs_select_default");
		for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
			var this_journal_id = user_selected_journal_ids_to_inspect[i];
			GLOBAL_SOURCES_CONTROLLER.set_journal_inclusion_to_default(this_journal_id);
		}
	}

	/* toggle_inclusion_of_journal_with_id(...): called by toggle-switch UI element as the onchange handler */
	, toggle_inclusion_of_journal_with_id: function(given_journal_id) {
		var is_selected = $("#switch_for_journal_" + given_journal_id).prop('checked');
	
		if (is_selected) {
			include_journal_with_id(given_journal_id);
		} else {
			exclude_journal_with_id(given_journal_id);
		}
	}

	/* set_journal_inclusion_to_default(...): called by cs_select_default only */
	, set_journal_inclusion_to_default: function(given_journal_id) {
		var journal_object = DataHelper.savedJournalsMasterDataDictionary[given_journal_id]
	
		var include_journal = false;
		if (GLOBAL_INITIAL_CONTROLLER.just_use_bo8) {
			if (parseInt(journal_object.is_bo8) == 1) {
				include_journal = true;
			}
		} else {
			if (journal_object.listing_count >= GLOBAL_INITIAL_CONTROLLER.current_threshold) {
				include_journal = true;
			}
		}
	
		if (include_journal) {
			$("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', true);
		} else {
			$("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', false);
		}
	}
};

function update_counters() {
	var my_intersection = _.intersection(UIJournalSelectorController.selectedJournalIdsForSearch, user_selected_journal_ids_to_inspect);
	$("#litbasket_sources_inclusion_count").html(my_intersection.length);
	$("#litbasket_sources_inspection_count").html(user_selected_journal_ids_to_inspect.length);
}


// WARNING: this does not change the UI state
// To do that, use:
// $("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', true);
function include_journal_with_id(given_journal_id) {
	UIJournalSelectorController.selectedJournalIdsForSearch.push(given_journal_id.toString());
	UIJournalSelectorController.selectedJournalIdsForSearch = _.uniq(UIJournalSelectorController.selectedJournalIdsForSearch);

	update_sidebar_badges();
	update_counters();
}

// WARNING: this does not change the UI state
// To do that, use:
// $("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', false);
function exclude_journal_with_id(given_journal_id) {
	UIJournalSelectorController.selectedJournalIdsForSearch = _.without(UIJournalSelectorController.selectedJournalIdsForSearch, given_journal_id.toString());
	UIJournalSelectorController.selectedJournalIdsForSearch = _.uniq(UIJournalSelectorController.selectedJournalIdsForSearch);

	update_sidebar_badges();
	update_counters();
}

