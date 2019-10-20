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
	 * and in LitbasketsInitialNetSizeController for slider handler (user_did_change_threshold)
	*/
	, launch_sequence_after_api_load: function() {
		
		// BEGIN RESET DERIVED DATA
		saved_journals_master_data = [];
		saved_journals_bo8_only = [];
		saved_journals_litbaskets_ext_only = [];

		user_selected_journal_ids_to_inspect = [];
		user_selected_journal_ids_to_include = [];

		saved_journals_by_subdivisions = this.final_journals_by_subdivisions;
		saved_subdivisions_by_baskets = this.final_subdivisions_by_baskets;

		GLOBAL_SOURCES_TOPBAR_CONTROLLER.data_reset();
		// END RESET DERIVED DATA
	
		generate_journal_master_data();
		generate_litbaskets_ext_master_data();
		generate_bo8_master_data();

		GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_baskets();
		GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_subdivisions_with_blank();
		update_sidebar_badges();
	}

	/* called in body_did_load */
	, load_objects: function() {
		$.get(API_ROOT + "getSubdivisionsByBaskets.php", function(x) {
			GLOBAL_MODEL_HELPER.final_subdivisions_by_baskets = x;
				
			$.get(API_ROOT + "getJournalsBySubdivisions.php", function(y) {
				GLOBAL_MODEL_HELPER.final_journals_by_subdivisions = y;
	
				GLOBAL_MODEL_HELPER.launch_sequence_after_api_load();
			});
		});
	}
}



// copied versions (THESE CAN CHANGE)
var saved_journals_by_subdivisions = [];
var saved_subdivisions_by_baskets = [];

// derived from API requests
var saved_journals_master_data = [];
var saved_journals_bo8_only = [];
var saved_journals_litbaskets_ext_only = [];

// storing user selections
var user_selected_journal_ids_to_inspect = [];
var user_selected_journal_ids_to_include = [];

function lbl_copy_to_clipboard_fadeout() {
	document.getElementById("lbl_copy_to_clipboard").style.opacity = '0';
}

function generate_journal_master_data() {
	for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
		var this_subdivision = saved_journals_by_subdivisions[i];
		for (var j = 0; j < this_subdivision.journals.length; j++) {
			var this_journal = this_subdivision.journals[j];
			saved_journals_master_data.push(this_journal);
		}
	}

	// https://stackoverflow.com/questions/9923890/removing-duplicate-objects-with-underscore-for-javascript
	saved_journals_master_data = _.uniq(saved_journals_master_data, function(x){
		return JSON.stringify(x);
	});

	// set default on/off
	for (var i = 0; i < saved_journals_master_data.length; i++) {
		var journal_object = saved_journals_master_data[i];


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
			user_selected_journal_ids_to_include.push(journal_object.journal_id);
		}
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

function generate_bo8_master_data() {
	var bsd_id_for_bo8 = -1;

	// get Basket of 8 bsd_id
	for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
		var this_basket = saved_subdivisions_by_baskets[i];
		if (this_basket.basket_name == "AIS Baskets") {
			bsd_id_for_bo8 = this_basket.subdivisions[0].bsd_id;
		}
	}

	// Push to saved_journals_bo8_only
	for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
		var this_subdivision = saved_journals_by_subdivisions[i];
		if (this_subdivision.bsd_id == bsd_id_for_bo8) {
			saved_journals_bo8_only = this_subdivision.journals;
		}
	}
}