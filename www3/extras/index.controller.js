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

function user_did_select_basket() {
	// clear model
	user_selected_subdivision_ids = [];

	var selectedId = $("#basketSelector").val();
	for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
		var thisBasket = saved_subdivisions_by_baskets[i];
		if (thisBasket.basket_id == selectedId) {
			populate_subdivisions_with_blank();

			for (var j = 0; j < thisBasket.subdivisions.length; j++) {
				var thisSubdivision = thisBasket.subdivisions[j];

				// populate list on Model
				user_selected_subdivision_ids.push(thisSubdivision.bsd_id);

				// populate list on View
				var htmlString = '<option value="' + thisSubdivision.bsd_id + '">'
				htmlString += thisSubdivision.subdivision_name;
				htmlString += '</option>';
				$("#subdivisionSelector").append(htmlString);
			}
		}
	}

	populate_journals_in_listview();
}

function check_if_search_buttons_should_be_locked() {
    var should_lock = ($("#litbaskets_search_textbox").val().length == 0);
    
    $("#litbaskets_search_button").attr("disabled", should_lock);
    $("#litbaskets_extended_search_button").attr("disabled", should_lock);
}

function user_did_click_search_button() {
    $("#txt_copy_to_clipboard").text("");

    var prepared_response = "TITLE-ABS-KEY(" + $("#litbaskets_search_textbox").val() + ") AND (";

    var scopus_ids = [];
	for (var i = 0; i < user_selected_journal_ids_to_include.length; i++) {
        var this_journal_id = user_selected_journal_ids_to_include[i];
        var this_journal = _.findWhere(saved_journals_master_data, {journal_id: this_journal_id});
        scopus_ids.push(this_journal.scopus_sourceid);
    }

    for (var i = 0; i < scopus_ids.length; i++) {
        if (i > 0) {
            prepared_response += " OR ";
        }
        prepared_response += "SOURCE-ID(" + scopus_ids[i] + ")";
    }

    prepared_response += ")";


    $("#txt_copy_to_clipboard").val(prepared_response);
}


function user_did_select_subdivision() {
	// clear model
	user_selected_subdivision_ids = [];

	// update model
	user_selected_subdivision_ids.push($("#subdivisionSelector").val());

	// thank u, next
	populate_journals_in_listview();
}