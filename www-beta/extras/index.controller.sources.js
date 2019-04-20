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

	populate_journals_in_listview_using_selected_subdivision();
}


function user_did_select_subdivision() {
	var user_selection = $("#subdivisionSelector").val();
	
	if (user_selection > 0) {
		// selected a valid option
		user_selected_subdivision_ids = [];
		user_selected_subdivision_ids.push(user_selection);
		populate_journals_in_listview_using_selected_subdivision();
	} else {
		// selected "all subdivisons, no filter applied"
		user_did_select_basket();
	}
}



function toggle_inclusion_of_journal_with_id(given_journal_id) {
	var is_selected = $("#switch_for_journal_" + given_journal_id).prop('checked');

	console.log("toggle_inclusion_of_journal_with_id " + given_journal_id);
	console.log("is_selected " + is_selected);

	if (is_selected) {
		user_selected_journal_ids_to_include.push(given_journal_id.toString());
	} else {
		user_selected_journal_ids_to_include = _.without(user_selected_journal_ids_to_include, given_journal_id.toString());
	}

	user_selected_journal_ids_to_include = _.uniq(user_selected_journal_ids_to_include);
}

/*
 * Inserts rows into the listview on screen 'Scopus Sources'
 */
function populate_journals_in_listview_using_selected_subdivision() {
	// clear model and view
	user_selected_journal_ids_to_inspect = [];
	$("#journalsListView").html("");
	
	for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
		var this_subdivision = saved_journals_by_subdivisions[i];

		// if user selected this subdivision
		if (user_selected_subdivision_ids.includes(this_subdivision.bsd_id)) {
			for (var j = 0; j < this_subdivision.journals.length; j++) {
				user_selected_journal_ids_to_inspect.push(this_subdivision.journals[j].journal_id);
			}
		}
	}

	for (var i = 0; i < saved_journals_master_data.length; i++) {
		var thisJournal = saved_journals_master_data[i];

		// ISSN details
		var issnString = "";
		if (thisJournal.issn && thisJournal.issn.length > 0) {
			issnString += thisJournal.issn;
			if (thisJournal.issne && thisJournal.issne.length > 0) {
				issnString += ",<br />" + thisJournal.issne;
			}
		} else if (thisJournal.issne && thisJournal.issne.length > 0) {
			issnString += thisJournal.issne;
		}

		// Journal details
		var journal_name_string = "<div>" + thisJournal.journal_name + "</div>";
		if (thisJournal.url && thisJournal.url.length > 0) {
			journal_name_string += "<div style='margin-top: 0.5rem;'>"
			journal_name_string += "<a href='" + thisJournal.url + "' target='_blank'>" + (thisJournal.url.length > 75 ? thisJournal.url.substring(0, 75) + "..." : thisJournal.url) + "</a>";
			journal_name_string += "</div>"
		}

		if (user_selected_journal_ids_to_inspect.includes(thisJournal.journal_id)) {
			var html_string = '<div class="list-group-item">';
			html_string += '<div class="list-view-pf-actions"><input id="switch_for_journal_'+ thisJournal.journal_id +'" class="bootstrap-switch" ';
			html_string += 'onchange="toggle_inclusion_of_journal_with_id(' + thisJournal.journal_id + ')" type="checkbox" ' + (thisJournal.is_selected ? 'checked' : '') + '> </div> <div class="list-view-pf-main-info"> <div class="list-view-pf-body"> <div class="list-view-pf-description">';
			html_string += '<div class="list-group-item-heading">'+ issnString + '</div>';
			html_string += '<div class="list-group-item-text">'+ journal_name_string + '</div>'; 
			html_string += '</div>';
			html_string += '</div> </div> </div>';

			$("#journalsListView").append(html_string);
			$("#switch_for_journal_" + thisJournal.journal_id).bootstrapSwitch();
		}
	}	
}