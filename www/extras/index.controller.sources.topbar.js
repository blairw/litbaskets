/*
 * LitbasketsSourcesTopbarController
 * Instantiated in index.controller.js as GLOBAL_SOURCES_TOPBAR_CONTROLLER
 */
LitbasketsSourcesTopbarController = {
	user_selected_subdivision_ids: []

	, data_reset: function() {
		this.user_selected_subdivision_ids = [];
	}

	, user_did_select_basket: function() {
		// enable
		$("#current_subdivision_select_all").prop("disabled", false);
		$("#current_subdivision_select_none").prop("disabled", false);
		$("#current_subdivision_select_default").prop("disabled", false);
	
		// clear model
		var selectedId = $("#basketSelector").val();
		for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
			var thisBasket = saved_subdivisions_by_baskets[i];
			if (thisBasket.basket_id == selectedId) {
				this.populate_subdivisions_with_blank();
	
				for (var j = 0; j < thisBasket.subdivisions.length; j++) {
					var thisSubdivision = thisBasket.subdivisions[j];
	
					// populate list on Model
					this.user_selected_subdivision_ids.push(thisSubdivision.bsd_id);
	
					// populate list on View
					var htmlString = '<option value="' + thisSubdivision.bsd_id + '">'
					htmlString += thisSubdivision.subdivision_name;
					htmlString += '</option>';
					$("#subdivisionSelector").append(htmlString);
				}
			}
		}
	
		this.populate_journals_in_listview_using_selected_subdivision();
	
		update_counters();
	}	

	, user_did_select_subdivision: function() {
		var user_selection = $("#subdivisionSelector").val();
		
		if (user_selection > 0) {
			// selected a valid option
			this.user_selected_subdivision_ids = [];
			this.user_selected_subdivision_ids.push(user_selection);
			this.populate_journals_in_listview_using_selected_subdivision();
		} else {
			// selected "all subdivisons"
			this.user_did_select_basket();
		}

		update_counters();
	}

	, populate_baskets: function() {
		$("#basketSelector").html('<option value="" selected="selected" disabled>Select a Basket ...</option>');
		for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
			var htmlString = '<option value="' + saved_subdivisions_by_baskets[i].basket_id + '">'
			htmlString += saved_subdivisions_by_baskets[i].basket_name;
			htmlString += '</option>';

			$("#basketSelector").append(htmlString);
		}
	}

	, populate_subdivisions_with_blank: function() {
		$("#subdivisionSelector").html("<option value='-1' selected='selected'>(all subdivisions)</option>");
	}
	
	/*
	* Inserts rows into the listview on screen 'Sources'
	*/
   , populate_journals_in_listview_using_selected_subdivision: function() {
		// clear model and view
		user_selected_journal_ids_to_inspect = [];
		$("#journalsListView").html("");
		
		for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
			var this_subdivision = saved_journals_by_subdivisions[i];

			// if user selected this subdivision
			if (this.user_selected_subdivision_ids.includes(this_subdivision.bsd_id)) {
				for (var j = 0; j < this_subdivision.journals.length; j++) {
					user_selected_journal_ids_to_inspect.push(this_subdivision.journals[j].journal_id);
				}
			}
		}

		user_selected_journal_ids_to_inspect = _.uniq(user_selected_journal_ids_to_inspect);

		for (var i = 0; i < saved_journals_master_data.length; i++) {
			var thisJournal = saved_journals_master_data[i];

			// ISSN details
			var issnString = "<div>";
			issnString += GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html("SCOPUS_SOURCE_LOOKUP", thisJournal.scopus_sourceid, "Scopus #" + thisJournal.scopus_sourceid);
			issnString += "</div>";

			if (thisJournal.issn && thisJournal.issn.length > 0) {
				issnString += GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html("ISSN_LOOKUP", thisJournal.issn, thisJournal.issn);
				if (thisJournal.issne && thisJournal.issne.length > 0) {
					issnString += ", " + GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html("ISSN_LOOKUP", thisJournal.issne, thisJournal.issn);
				}
			} else if (thisJournal.issne && thisJournal.issne.length > 0) {
				issnString += GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html("ISSN_LOOKUP", thisJournal.issne, thisJournal.issn);
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
				var is_selected = user_selected_journal_ids_to_include.includes(thisJournal.journal_id)

				var html_string = '<div class="list-group-item">';
				html_string += '<div class="list-view-pf-actions"><input id="switch_for_journal_'+ thisJournal.journal_id +'" class="bootstrap-switch" ';
				html_string += 'onchange="GLOBAL_SOURCES_CONTROLLER.toggle_inclusion_of_journal_with_id(' + thisJournal.journal_id + ')" type="checkbox" ' + (is_selected ? 'checked' : '') + '> </div> <div class="list-view-pf-main-info"> <div class="list-view-pf-body"> <div class="list-view-pf-description">';
				html_string += '<div class="list-group-item-heading">'+ issnString + '</div>';
				html_string += '<div class="list-group-item-text">'+ journal_name_string + '</div>'; 
				html_string += '</div>';
				html_string += '</div> </div> </div>';

				$("#journalsListView").append(html_string);
				$("#switch_for_journal_" + thisJournal.journal_id).bootstrapSwitch();
			}
		}	
	}
};


