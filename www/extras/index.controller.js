var is_reviews_only = false;
var limit_years = true;
var limit_years_data = 2013;

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
    
	// ready
	$("#limit_years_data").val(limit_years_data);
    $("#litbaskets_search_textbox").focus();
}

function check_review_only_switch() {
	is_reviews_only = $("#reviews_only_switch").prop('checked');
}

function check_limit_years_switch() {
	limit_years = $("#limit_years_switch").prop('checked');
	if (limit_years) {
		console.log("limit_years is true");
		$("#limit_years_data").prop("disabled", false);
	} else {
		console.log("limit_years is false");
		$("#limit_years_data").prop("disabled", true);
	}
}

function check_limit_years_data() {
	limit_years_data = $("#limit_years_data").val();
}