/*
 * LitbasketsSourcesTopbarController
 * Instantiated in index.controller.js as GLOBAL_SOURCES_TOPBAR_CONTROLLER
 */
LitbasketsSourcesTopbarController = {
	user_selected_subdivision_ids: []

	, data_reset: function() {
		this.user_selected_subdivision_ids = [];
		$("#journalsListView").html("");
	}

	, user_did_select_basket: function() {

		var spinnerHTML = '<br /><i class="fa fa-cog fa-spin fa-3x fa-fw"></i> <span class="sr-only">Loading...</span>';

		// source: https://stackoverflow.com/questions/4005096/force-immediate-dom-update-modified-with-jquery-in-long-running-function
		$("#sources_loading_status").html("Loading" + spinnerHTML);
		$("#basketSelector").prop("disabled", true);
		$("#subdivisionSelector").prop("disabled", true);
		window.setTimeout(function() {
			// enable
			$("#current_subdivision_select_all").prop("disabled", false);
			$("#current_subdivision_select_none").prop("disabled", false);
			$("#current_subdivision_select_default").prop("disabled", false);
			$("#basketSelector").prop("disabled", false);
			$("#subdivisionSelector").prop("disabled", false);
		
			// clear model
			var selectedId = $("#basketSelector").val();
			GLOBAL_SOURCES_TOPBAR_CONTROLLER.user_selected_subdivision_ids = [];
			for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
				var thisBasket = saved_subdivisions_by_baskets[i];
				if (thisBasket.basket_id == selectedId) {
					GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_subdivisions_with_blank();
		
					for (var j = 0; j < thisBasket.subdivisions.length; j++) {
						var thisSubdivision = thisBasket.subdivisions[j];
		
						// populate list on Model
						GLOBAL_SOURCES_TOPBAR_CONTROLLER.user_selected_subdivision_ids.push(thisSubdivision.bsd_id);
		
						// populate list on View
						var htmlString = '<option value="' + thisSubdivision.bsd_id + '">'
						htmlString += thisSubdivision.subdivision_name;
						htmlString += '</option>';
						$("#subdivisionSelector").append(htmlString);
					}
				}
			}
		
			GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_using_selected_subdivision();
		
			$("#sources_loading_status").html("Ready.");
			update_counters();
		}, 0);
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

		for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
			var this_journal_id = user_selected_journal_ids_to_inspect[i];
			var journal_record = GLOBAL_MODEL_HELPER.get_master_record_by_journal_id(this_journal_id);
			
			// ISSN details
			var issnString = "<div>";
			issnString += GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html("SCOPUS_SOURCE_LOOKUP", journal_record.scopus_sourceid, "Scopus #" + journal_record.scopus_sourceid);
			issnString += "</div>";

			if (journal_record.issn && journal_record.issn.length > 0) {
				issnString += GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html("ISSN_LOOKUP", journal_record.issn, journal_record.issn);
				if (journal_record.issne && journal_record.issne.length > 0) {
					issnString += ", " + GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html("ISSN_LOOKUP", journal_record.issne, journal_record.issn);
				}
			} else if (journal_record.issne && journal_record.issne.length > 0) {
				issnString += GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html("ISSN_LOOKUP", journal_record.issne, journal_record.issn);
			}

			// Journal details
			var journal_name_string = "<div><strong>" + journal_record.journal_name + "</strong></div>";
			if (journal_record.scopus_coverage && journal_record.scopus_coverage.length > 0) {
				journal_name_string += "<div style='margin-top: 0.5rem;'>"
				journal_name_string += "Scopus coverage: " + journal_record.scopus_coverage;
				journal_name_string += "</div>"
			}

			if (journal_record.url && journal_record.url.length > 0) {
				journal_name_string += "<div style='margin-top: 0.5rem;'>"
				journal_name_string += "<a href='" + journal_record.url + "' target='_blank'>" + (journal_record.url.length > 60 ? journal_record.url.substring(0, 60) + "..." : journal_record.url) + "</a>";
				journal_name_string += "</div>"
			}

			var is_selected = user_selected_journal_ids_to_include.includes(journal_record.journal_id);

			var html_string = '<div class="list-group-item">';
			html_string += '<div class="list-view-pf-actions"><input id="switch_for_journal_'+ journal_record.journal_id +'" class="bootstrap-switch" ';
			html_string += 'onchange="GLOBAL_SOURCES_CONTROLLER.toggle_inclusion_of_journal_with_id(' + journal_record.journal_id + ')" type="checkbox"> </div> <div class="list-view-pf-main-info"> <div class="list-view-pf-body"> <div class="list-view-pf-description">';
			html_string += '<div class="list-group-item-heading">'+ issnString + '</div>';
			html_string += '<div class="list-group-item-text">'+ journal_name_string + '</div>'; 
			html_string += '</div>';
			html_string += '</div> </div> </div>';

			$("#journalsListView").append(html_string);
			$("#switch_for_journal_" + journal_record.journal_id).bootstrapSwitch();
			if (is_selected) {
				$("#switch_for_journal_" + journal_record.journal_id).bootstrapSwitch('state', true);
			}
		}
	}

	, download_csv: function() {
		var prepared_return = [
			[
				"Scopus Source ID",
				"Scopus Coverage",
				"Journal Name",
				"Journal ISSN",
				"Journal ISSN (e)",
				"Journal Website",
				"Listing Count"
			]
		];
		for (var i = 0; i < user_selected_journal_ids_to_include.length; i++) {
			var journal_id = user_selected_journal_ids_to_include[i];
			var journal_record = GLOBAL_MODEL_HELPER.get_master_record_by_journal_id(journal_id);
			prepared_return.push([
				nvl(journal_record["scopus_sourceid"], ""),
				nvl(journal_record["scopus_coverage"], ""),
				nvl(journal_record["journal_name"], ""),
				nvl(journal_record["issn"], ""),
				nvl(journal_record["issne"], ""),
				nvl(journal_record["url"], ""),
				nvl(journal_record["listing_count"], "")
			]);
		}
		console.log(prepared_return);

		// source: https://stackoverflow.com/a/24922761
		var processRow = function (row) {
			var finalVal = '';
			for (var j = 0; j < row.length; j++) {
				var innerValue = row[j] === null ? '' : row[j].toString();
				if (row[j] instanceof Date) {
					innerValue = row[j].toLocaleString();
				};
				var result = innerValue.replace(/"/g, '""');
				if (result.search(/("|,|\n)/g) >= 0)
					result = '"' + result + '"';
				if (j > 0)
					finalVal += ',';
				finalVal += result;
			}
			return finalVal + '\n';
		};

		var csvContent = '';
		for (var i = 0; i < prepared_return.length; i++) {
			csvContent += processRow(prepared_return[i]);
		}
		download(csvContent, "Litbaskets Export "+ (new Date().toISOString().replace(':','_')) +".csv", "text/csv");
	}

	, empty_litbasket: function() {
		for (var i = 0; i < user_selected_journal_ids_to_inspect.length; i++) {
			$("#switch_for_journal_" + user_selected_journal_ids_to_inspect[i]).bootstrapSwitch('state', false);
		}
		user_selected_journal_ids_to_include = [];
		update_sidebar_badges();
		update_counters();
	}
};