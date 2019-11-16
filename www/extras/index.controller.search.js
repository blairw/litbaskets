/*
 * LitbasketsSearchController
 * Instantiated in index.controller.js as GLOBAL_SEARCH_CONTROLLER
 */
LitbasketsSearchController = {
	check_if_search_buttons_should_be_locked: function() {
		var should_lock = ($("#litbaskets_search_textbox").val().length == 0);
		
		$("#litbaskets_search_button").attr("disabled", should_lock);
	}

	, user_did_click_search_button: function() {
		var scopus_ids = [];
		for (var i = 0; i < user_selected_journal_ids_to_include.length; i++) {
			var this_journal_id = user_selected_journal_ids_to_include[i];
			var this_journal = GLOBAL_MODEL_HELPER.get_master_record_by_journal_id(this_journal_id);
			scopus_ids.push(this_journal.scopus_sourceid);
		}
	
		var search_mode = "LONG_SEARCH";
		if (scopus_ids.length <= 55) {
			var search_mode = "SHORT_SEARCH";
		}
		perform_search_with_journals(search_mode, scopus_ids);
	}
}

$(document).keyup(function(event) {
	if ($("#litbaskets_search_textbox").is(":focus")) {
		GLOBAL_SEARCH_CONTROLLER.check_if_search_buttons_should_be_locked();
		
		if (event.keyCode == 13) {
			GLOBAL_SEARCH_CONTROLLER.user_did_click_search_button();
		}
	}
});


function perform_search_with_journals(search_mode, list_of_journals) {
	// work with search_mode
	if (search_mode == "SHORT_SEARCH") {
		$(".litbaskets_modal_message_if_short_search").css("display", "block");
		$(".litbaskets_modal_message_if_long_search").css("display", "none");
	} else {
		$(".litbaskets_modal_message_if_short_search").css("display", "none");
		$(".litbaskets_modal_message_if_long_search").css("display", "block");
	}

	$("#txt_copy_to_clipboard").text("");

	var prepared_response = "TITLE-ABS-KEY(" + $("#litbaskets_search_textbox").val() + ")";

	if (GLOBAL_FILTERS_CONTROLLER.is_reviews_only) {
		prepared_response += " AND DOCTYPE(re)";
	}
	if (GLOBAL_FILTERS_CONTROLLER.is_editorials_only) {
		prepared_response += " AND DOCTYPE(ed)";
	}

	if (GLOBAL_FILTERS_CONTROLLER.limit_years && GLOBAL_FILTERS_CONTROLLER.limit_years_data > 0) {
		prepared_response += " AND PUBYEAR AFT " + GLOBAL_FILTERS_CONTROLLER.limit_years_data;
	}

	prepared_response += " AND (";
	for (var i = 0; i < list_of_journals.length; i++) {
		if (i > 0) {
			prepared_response += " OR ";
		}
		prepared_response += "SOURCE-ID(" + list_of_journals[i] + ")";
	}

	prepared_response += ")";


	$("#txt_copy_to_clipboard").val(prepared_response);

	// externals
	var prepared_scopus_link = GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url("SCOPUS_SEARCH_QUERY", escape(prepared_response));
	var prepared_ais_elibrary_link = GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url("AIS_ELIBRARY_SEARCH", $("#litbaskets_search_textbox").val());
	var prepared_dblp_link = GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url("DBLP_SEARCH", $("#litbaskets_search_textbox").val());
	
	$("#link_ais_elibrary").prop("href", prepared_ais_elibrary_link);
	$("#link_ais_dblp").prop("href", prepared_dblp_link);
	$("#link_for_scopus").prop("href", prepared_scopus_link);

	if (search_mode == "SHORT_SEARCH") {
		// https://stackoverflow.com/questions/19851782/how-to-open-a-url-in-a-new-tab-using-javascript-or-jquery
		var win = window.open(prepared_scopus_link);
		if (win) {
			//Browser has allowed it to be opened
			win.focus();
		}
	}
}

function user_starts_new_search() {
	$('#litbaskets_search_textbox').val("");
}

$(document).on('hidden.bs.modal', '#modal_for_search_results', function () {
	$('#litbaskets_search_textbox').focus();
});