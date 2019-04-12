var DEFAULT_FOR_SWITCH_AIS_LIBRARY = false;
var DEFAULT_FOR_SWITCH_DBLP = false;
var DEFAULT_FOR_SWITCH_SCOPUS = false;
var newtab_for_ais_elibrary = DEFAULT_FOR_SWITCH_AIS_LIBRARY;
var newtab_for_dblp = DEFAULT_FOR_SWITCH_DBLP;
var newtab_for_scopus = DEFAULT_FOR_SWITCH_SCOPUS;

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
		$("#lbl_copy_to_clipboard").html("SUCCESS COPIED YAY");

		// https://codepen.io/ssddayz/pen/zKkaBQ
		window.setTimeout(lbl_copy_to_clipboard_fadeout, 2000); //2 seconds
    });
    
    // ready
    $("#litbaskets_search_textbox").focus();
}