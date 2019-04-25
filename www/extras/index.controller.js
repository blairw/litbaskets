var GLOBAL_FILTERS_CONTROLLER = Object.create(LitbasketsFiltersController);

function body_did_load() {
	userDidSelectTab('litbaskets-search');
	$(".bootstrap-switch").bootstrapSwitch();

	// Initialize the vertical navigation
	$().setupVerticalNavigation(true);

    loadObjects();
    check_if_search_buttons_should_be_locked();

	// btn_copy_to_clipboard
	var clipboard = new ClipboardJS('#btn_copy_to_clipboard');
	clipboard.on('success', function(e) {
		document.getElementById("lbl_copy_to_clipboard").style.opacity = '100';
		$("#lbl_copy_to_clipboard").html("Successfully copied to clipboard!");

		// https://codepen.io/ssddayz/pen/zKkaBQ
		window.setTimeout(lbl_copy_to_clipboard_fadeout, 2000); //2 seconds
	});
	
	// lock subdivision operation buttons
	$("#current_subdivision_select_all").prop("disabled", true);
	$("#current_subdivision_select_none").prop("disabled", true);
	$("#current_subdivision_select_default").prop("disabled", true);
    
	// ready
	$("#limit_years_data").val(GLOBAL_FILTERS_CONTROLLER.limit_years_data);
    $("#litbaskets_search_textbox").focus();
}

function things_to_do_after_data_loaded_from_api() {
	update_sidebar_badges();
}

function update_sidebar_badges() {
	var sources_count = "";
	if (user_selected_journal_ids_to_include.length > 0) {
		sources_count = user_selected_journal_ids_to_include.length;
	}
	$("#sidebar_badge_for_sources").html(sources_count);
	GLOBAL_FILTERS_CONTROLLER.update_sidebar_filter_count();
}