/*
 * LitbasketsSourcesTopbarController
 * Instantiated in index.controller.js as GLOBAL_SOURCES_TOPBAR_CONTROLLER
 */
LitbasketsSourcesTopbarController = {
	/*
	* Inserts rows into the listview on screen 'Sources'
	*/
   populate_journals_in_listview_for_section: function(given_section) {
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
			var coverage_text = journal_record.scopus_coverage;
			if (coverage_text.includes(",")) {
				coverage_text = "See Scopus";
			}
			var col3 = GLOBAL_EXTERNAL_LOGIC_HELPER.generate_url_html(
				"SCOPUS_SOURCE_LOOKUP",
				journal_record.scopus_sourceid,
				coverage_text + "<img src='images/external-link.png' />"
			);

			var col2 = "<strong>" + journal_record.journal_name + "</strong>";
			col2 += "<a href='" + journal_record.url + "' target='_blank'><img src='images/external-link.png' /></a>"

			var is_selected = user_selected_journal_ids_to_include.includes(journal_record.journal_id);
			var col1 = '<input style="width: 100%;" id="switch_for_journal_'+ journal_record.journal_id +'" class="bootstrap-switch" ';
			col1 += 'onchange="GLOBAL_SOURCES_CONTROLLER.toggle_inclusion_of_journal_with_id(' + journal_record.journal_id + ')" type="checkbox">';

			var html_string = '<tr>';
			html_string += "<td style='padding: 0px;'>" + col1 + "&nbsp;" + col2 + "</td>"
			html_string += "<td>" + col3 + "</td>"
			html_string += '</td>';

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
};