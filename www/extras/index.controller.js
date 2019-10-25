var GLOBAL_MODEL_HELPER = Object.create(LitbasketsModelHelper);
var GLOBAL_EXTERNAL_LOGIC_HELPER = Object.create(LitbasketsExternalLogicHelper);

var GLOBAL_SEARCH_CONTROLLER = Object.create(LitbasketsSearchController);
var GLOBAL_INITIAL_CONTROLLER = Object.create(LitbasketsInitialNetSizeController);
var GLOBAL_SOURCES_TOPBAR_CONTROLLER = Object.create(LitbasketsSourcesTopbarController);
var GLOBAL_SOURCES_CONTROLLER = Object.create(LitbasketsSourcesController);
var GLOBAL_FILTERS_CONTROLLER = Object.create(LitbasketsFiltersController);


function body_did_load() {
	userDidSelectTab('litbaskets-search');

	// Initialize the vertical navigation
	$().setupVerticalNavigation(true);

	GLOBAL_MODEL_HELPER.load_objects();
	GLOBAL_SEARCH_CONTROLLER.check_if_search_buttons_should_be_locked();

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
	$("#litbaskets_search_textbox").focus();
}

function update_sidebar_badges() {
	GLOBAL_SOURCES_CONTROLLER.update_sidebar_sources_count();
	GLOBAL_FILTERS_CONTROLLER.update_sidebar_filter_count();
}