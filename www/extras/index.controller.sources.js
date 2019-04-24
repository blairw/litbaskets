function user_did_select_basket() {
	// enable
	$("#current_subdivision_select_all").prop("disabled", false);
	$("#current_subdivision_select_none").prop("disabled", false);
	$("#current_subdivision_select_default").prop("disabled", false);

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

	update_counters();
}


function user_did_select_subdivision() {
	var user_selection = $("#subdivisionSelector").val();
	
	if (user_selection > 0) {
		// selected a valid option
		user_selected_subdivision_ids = [];
		user_selected_subdivision_ids.push(user_selection);
		populate_journals_in_listview_using_selected_subdivision();
	} else {
		// selected "all subdivisons"
		user_did_select_basket();
	}

	update_counters();
}

function update_counters() {
	var my_intersection = _.intersection(user_selected_journal_ids_to_include, user_selected_journal_ids_to_inspect);
	$("#litbasket_sources_inclusion_count").html(my_intersection.length);
	$("#litbasket_sources_inspection_count").html(user_selected_journal_ids_to_inspect.length);
}

function toggle_inclusion_of_journal_with_id(given_journal_id) {
	var is_selected = $("#switch_for_journal_" + given_journal_id).prop('checked');

	if (is_selected) {
		include_journal_with_id(given_journal_id);
	} else {
		exclude_journal_with_id(given_journal_id);
	}
}

// WARNING: this does not change the UI state
// To do that, use:
// $("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', true);
function include_journal_with_id(given_journal_id) {
	user_selected_journal_ids_to_include.push(given_journal_id.toString());
	user_selected_journal_ids_to_include = _.uniq(user_selected_journal_ids_to_include);

	update_sidebar_badges();
	update_counters();
}

// WARNING: this does not change the UI state
// To do that, use:
// $("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', false);
function exclude_journal_with_id(given_journal_id) {
	user_selected_journal_ids_to_include = _.without(user_selected_journal_ids_to_include, given_journal_id.toString());
	user_selected_journal_ids_to_include = _.uniq(user_selected_journal_ids_to_include);

	update_sidebar_badges();
	update_counters();
}

function set_journal_inclusion_to_default(given_journal_id) {
	var journal_object = _.findWhere(saved_journals_master_data, {journal_id: given_journal_id});
	var is_core = (journal_object.is_core == 1);
	if (is_core) {
		$("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', true);
	} else {
		$("#switch_for_journal_" + given_journal_id).bootstrapSwitch('state', false);
	}
}

/*
 * Inserts rows into the listview on screen 'Sources'
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
		var issnString = "<div>";
		issnString += generate_url_html("SCOPUS_SOURCE_LOOKUP", thisJournal.scopus_sourceid, "Scopus #" + thisJournal.scopus_sourceid);
		issnString += "</div>";

		if (thisJournal.issn && thisJournal.issn.length > 0) {
			issnString += generate_url_html("ISSN_LOOKUP", thisJournal.issn, thisJournal.issn);
			if (thisJournal.issne && thisJournal.issne.length > 0) {
				issnString += ", " + generate_url_html("ISSN_LOOKUP", thisJournal.issne, thisJournal.issn);
			}
		} else if (thisJournal.issne && thisJournal.issne.length > 0) {
			issnString += generate_url_html("ISSN_LOOKUP", thisJournal.issne, thisJournal.issn);
		}

		// Journal details
		var journal_name_string = "<div><strong>" + thisJournal.journal_name + "</strong></div>";
		if (thisJournal.scopus_coverage && thisJournal.scopus_coverage.length > 0) {
			journal_name_string += "<div style='margin-top: 0.5rem;'>"
			journal_name_string += "Scopus coverage: " + thisJournal.scopus_coverage;
			journal_name_string += "</div>"
		}

		if (thisJournal.url && thisJournal.url.length > 0) {
			journal_name_string += "<div style='margin-top: 0.5rem;'>"
			journal_name_string += "<a href='" + thisJournal.url + "' target='_blank'>" + (thisJournal.url.length > 60 ? thisJournal.url.substring(0, 60) + "..." : thisJournal.url) + "</a>";
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

function cs_select_all() {
	for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
		var this_journal_id = user_selected_journal_ids_to_inspect[i];
		$("#switch_for_journal_" + this_journal_id).bootstrapSwitch('state', true);
	}
}

function cs_select_none() {
	for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
		var this_journal_id = user_selected_journal_ids_to_inspect[i];
		$("#switch_for_journal_" + this_journal_id).bootstrapSwitch('state', false);
	}
}

function cs_select_default() {
	for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
		var this_journal_id = user_selected_journal_ids_to_inspect[i];
		set_journal_inclusion_to_default(this_journal_id);
	}
}