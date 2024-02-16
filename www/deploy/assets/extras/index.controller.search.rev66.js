/*
 * LitbasketsSearchController
 * Instantiated in index.controller.js as GLOBAL_SEARCH_CONTROLLER
 */
LitbasketsSearchController = {
	current_slider_value: 4  // default
	, has_been_init: false
	, just_use_bo8: false
	, current_proxy_choice: "(none)"

	, proxy_search_prefix_dictionary: {
		"(none)": "https://www.scopus.com/"
		, "CBS": "http://esc-web.lib.cbs.dk/login?url=https://www.scopus.com/"
		, "ETH_ZURICH": "https://proxy.ethz.ch/cgi-bin/login.pl?url=https://www.scopus.com/"
		, "NUI_GALWAY": "https://nuigalway.idm.oclc.org/login?url=https://www.scopus.com/"
		, "UNSW": "https://www-scopus-com.wwwproxy1.library.unsw.edu.au/"
		, "USYD": "https://www-scopus-com.ezproxy.library.sydney.edu.au/"
		, "UTS": "https://www-scopus-com.ezproxy.lib.uts.edu.au/"
		, "UNI_CALGARY": "https://login.ezproxy.lib.ucalgary.ca/login?url=https://www.scopus.com/"
		, "UCC": "https://ucc.idm.oclc.org/login?url=https://www.scopus.com/"
		, "RMIT": "https://www-scopus-com.ezproxy.lib.rmit.edu.au/"
	}

	, init: function(beforeStarting, afterStarting) {
		console.log("GLOBAL_SEARCH_CONTROLLER: init");
		beforeStarting();

		if (!this.has_been_init) {
			var shortslider = $("#shortslider").slider({
				tooltip: 'always',
				reversed : false,
				formatter: function(value) {
					var journal_count = -1;
					var level_string = value + "";
					switch (value) {
						case 1: break;
						case 2: journal_count = 16; break;
						case 3: journal_count = 29; break;
						case 4: journal_count = 51; break;
					}
					if (value == 1) {
						GLOBAL_SEARCH_CONTROLLER.just_use_bo8 = true;
						return "AIS Basket of Eight";
					} else {
						GLOBAL_SEARCH_CONTROLLER.just_use_bo8 = false;
						return journal_count + " essential IS journals";
					}
				}
			});
			
			shortslider.slider('setValue', this.current_slider_value);

			var litbasketsproxyselector = $("#litbasketsproxy").select2({
				placeholder: "Select a proxy",
			});

			this.has_been_init = true;
			console.log("LitbasketsSearchController init() completed")
		}

		afterStarting();
	}

	, user_did_change_slider_value: function() {
		var ss = $("#shortslider").slider();
		var ls = $("#longslider").slider();
		var slidervalue = ss.slider('getValue');

		this.current_slider_value = slidervalue;
		GLOBAL_MODEL_HELPER.launch_sequence_after_api_load();
	}

	, user_did_change_longslider_value: function() {
		var ss = $("#shortslider").slider();
		var ls = $("#longslider").slider();
		var slidervalue = ls.slider('getValue');

		if (slidervalue <= 4) {
			$("#searchpage_shortslider_container").css("display", "block");
			$("#searchpage_advopt_notice").css("display", "none");
			ss.slider("setValue", slidervalue)
		} else {
			$("#searchpage_shortslider_container").css("display", "none");
			$("#searchpage_advopt_notice").css("display", "block");
		}

		this.current_slider_value = slidervalue;
		GLOBAL_MODEL_HELPER.launch_sequence_after_api_load();
	}

	, user_did_change_litbasketsproxy_value: function() {
		this.current_proxy_choice = $("#litbasketsproxy").val();

		$(".scopus_advanced_search_link").attr("href", this.get_current_scopus_url() + "search/form.uri?display=advanced");
	}

	, get_current_scopus_url: function() {
		return this.proxy_search_prefix_dictionary[this.current_proxy_choice];
	}

	, check_if_search_buttons_should_be_locked: function() {
		var should_lock = ($("#litbaskets_search_textbox").val().length == 0);
		
		$("#litbaskets_search_button").attr("disabled", should_lock);
	}

	, user_did_click_search_button: function() {
		var scopus_ids = [];
		UIJournalSelectorController.selectedJournalIdsForSearch.forEach(journalId => {
			var journalRecord = DataHelper.savedJournalsMasterDataDictionary[journalId];
			var scopusId = journalRecord.scopus_sourceid;
			scopus_ids.push(scopusId);
		});
	
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

	var search_terms = $("#litbaskets_search_textbox").val();
	var prepared_response = "TITLE-ABS-KEY(" + search_terms + ")";

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

	var formdata = {
		"search_terms": search_terms,
		"litbasket_size": GLOBAL_SEARCH_CONTROLLER.current_slider_value,
		"filter_reviews_only": (GLOBAL_FILTERS_CONTROLLER.is_reviews_only ? 1 : 0),
		"filter_editorials_only": (GLOBAL_FILTERS_CONTROLLER.is_editorials_only ? 1 : 0),
		"year_limit_set": (GLOBAL_FILTERS_CONTROLLER.limit_years ? 1 : 0),
		"year_limit_data": GLOBAL_FILTERS_CONTROLLER.limit_years_data,

	};
}

function user_starts_new_search() {
	$('#litbaskets_search_textbox').val("");
}

$(document).on('hidden.bs.modal', '#modal_for_search_results', function () {
	$('#litbaskets_search_textbox').focus();
});

$(document).on('shown.bs.modal', '#modal_for_advanced_search', function () {
	GLOBAL_FILTERS_CONTROLLER.init();
});