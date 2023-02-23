/*
 * LitbasketsModelHelper
 * Instantiated in index.controller.js as GLOBAL_MODEL_HELPER
 */
LitbasketsModelHelper = {
	/* saving API requests (FINAL, DO NOT CHANGE) */
	final_journals_by_subdivisions: []
	, final_subdivisions_by_baskets: []

	/* 
	 * only called here (load_objects)
	 * and in GLOBAL_SEARCH_CONTROLLER for slider handler (user_did_change_slider_value)
	*/
	, launch_sequence_after_api_load: function() {
		
		// BEGIN RESET DERIVED DATA
		DataHelper.savedJournalsMasterDataArray = [];
		saved_journals_litbaskets_ext_only = [];

		user_selected_journal_ids_to_inspect = [];
		UIJournalSelectorController.selectedJournalIdsForSearch = [];

		saved_journals_by_subdivisions = this.final_journals_by_subdivisions;
		saved_subdivisions_by_baskets = this.final_subdivisions_by_baskets;
		// END RESET DERIVED DATA
	
		generate_journal_master_data();
		generate_litbaskets_ext_master_data();

		update_sidebar_badges();
		GLOBAL_SOURCES_TOPBAR_CONTROLLER.has_been_init = false; // force the toggles to reupdate on next visit to journal explorer
	}

	/* called in body_did_load */
	, load_objects: function() {
		$.get("assets/api-cache/getSubdivisionsByBaskets.json", function(x) {
			GLOBAL_MODEL_HELPER.final_subdivisions_by_baskets = x;
			$.get("assets/api-cache/getJournalsBySubdivisions.json", function(y) {
				GLOBAL_MODEL_HELPER.final_journals_by_subdivisions = y;
				GLOBAL_MODEL_HELPER.launch_sequence_after_api_load();

				finished_long_task("BODY_DID_LOAD");
			});
		});
	}
}



// copied versions (THESE CAN CHANGE)
var saved_journals_by_subdivisions = [];
var saved_subdivisions_by_baskets = [];

// derived from API requests
var saved_journals_litbaskets_ext_only = [];

// storing user selections
var user_selected_journal_ids_to_inspect = [];

function lbl_copy_to_clipboard_fadeout() {
	document.getElementById("lbl_copy_to_clipboard").style.opacity = '0';
}

function generate_journal_master_data() {
	// Add all journals
	for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
		var this_subdivision = saved_journals_by_subdivisions[i];
		for (var j = 0; j < this_subdivision.journals.length; j++) {
			var this_journal = this_subdivision.journals[j];
			DataHelper.savedJournalsMasterDataArray.push(this_journal);
		}
	}

	// Add all extra journals
	UserDataExtraJournals.forEach(journal => {
		DataHelper.savedJournalsMasterDataArray.push(journal);
	})

	// Dedupe
	// https://stackoverflow.com/questions/9923890/removing-duplicate-objects-with-underscore-for-javascript
	DataHelper.savedJournalsMasterDataArray = _.uniq(DataHelper.savedJournalsMasterDataArray, function(x){
		return JSON.stringify(x);
	});

	// Generate Vlookuper
	DataHelper.populateSjmdArrayToDictionary();

	for (var i = 0; i < DataHelper.savedJournalsMasterDataArray.length; i++) {

		// set default on/off ----

		var journal_object = DataHelper.savedJournalsMasterDataArray[i];

		var include_journal = false;
		if (GLOBAL_SEARCH_CONTROLLER.just_use_bo8) {
			if (parseInt(journal_object.is_bo8) == 1) {
				include_journal = true;
			}
		} else {
			var threshold = 9 - GLOBAL_SEARCH_CONTROLLER.current_slider_value;
			if (journal_object.listing_count >= threshold) {
				include_journal = true;
			}
		}
		
		if (include_journal) {
			UIJournalSelectorController.selectedJournalIdsForSearch.push(journal_object.journal_id);
		}

		// -------------------------
	}
}

function generate_litbaskets_ext_master_data() {
	var bsd_id_for_litbaskets_ext = -1;

	// get Basket of 8 bsd_id
	for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
		var this_basket = saved_subdivisions_by_baskets[i];
		if (this_basket.basket_name == "Litbaskets Sets") {
			bsd_id_for_litbaskets_ext = this_basket.subdivisions[0].bsd_id;
		}
	}

	// Push to saved_journals_litbaskets_ext_only
	for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
		var this_subdivision = saved_journals_by_subdivisions[i];
		if (this_subdivision.bsd_id == bsd_id_for_litbaskets_ext) {
			saved_journals_litbaskets_ext_only = this_subdivision.journals;
		}
	}
	
}