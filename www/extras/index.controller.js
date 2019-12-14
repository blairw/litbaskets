var GLOBAL_MODEL_HELPER = Object.create(LitbasketsModelHelper);
var GLOBAL_EXTERNAL_LOGIC_HELPER = Object.create(LitbasketsExternalLogicHelper);

var GLOBAL_SEARCH_CONTROLLER = Object.create(LitbasketsSearchController);
var GLOBAL_SOURCES_TOPBAR_CONTROLLER = Object.create(LitbasketsSourcesTopbarController);
var GLOBAL_SOURCES_CONTROLLER = Object.create(LitbasketsSourcesController);
var GLOBAL_FILTERS_CONTROLLER = Object.create(LitbasketsFiltersController);

var current_task = null;

function body_did_load() {
	$("#loading_modal").on("shown.bs.modal", function () {
		console.log("shown.bs.modal loading_modal with current_task = " + current_task);
		if (current_task == "JOURNAL_EXPLORER") GLOBAL_SOURCES_TOPBAR_CONTROLLER.stage2();
	});
	
	do_long_task("BODY_DID_LOAD");
	userDidSelectTab('litbaskets-search');

	// Initialize the vertical navigation
	$().setupVerticalNavigation(true);

	GLOBAL_MODEL_HELPER.load_objects();
	GLOBAL_SEARCH_CONTROLLER.check_if_search_buttons_should_be_locked();

	$("#reviews_only_switch").bootstrapSwitch();
	$("#editorials_only_switch").bootstrapSwitch();
	$("#limit_years_switch").bootstrapSwitch();

	// btn_copy_to_clipboard
	var clipboard = new ClipboardJS('#btn_copy_to_clipboard');
	clipboard.on('success', function(e) {
		document.getElementById("lbl_copy_to_clipboard").style.opacity = '100';
		$("#lbl_copy_to_clipboard").html("Successfully copied to clipboard!");

		// https://codepen.io/ssddayz/pen/zKkaBQ
		window.setTimeout(lbl_copy_to_clipboard_fadeout, 2000); //2 seconds
	});
	
	// ready
	$("#litbaskets_search_textbox").focus();

	GLOBAL_SEARCH_CONTROLLER.init(
		function(){},	
		function(){}
	);
}

function update_sidebar_badges() {
	GLOBAL_SOURCES_CONTROLLER.update_sidebar_sources_count();
	GLOBAL_FILTERS_CONTROLLER.update_sidebar_filter_count();
}

function do_long_task(task_name) {
	current_task = task_name;
	$('#loading_modal').modal('show');
}

function finished_long_task(task_name) {
	current_task = null;
	$('#loading_modal').modal('hide');
}
