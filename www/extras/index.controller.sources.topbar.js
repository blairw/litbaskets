/*
 * LitbasketsSourcesTopbarController
 * Instantiated in index.controller.js as GLOBAL_SOURCES_TOPBAR_CONTROLLER
 */
LitbasketsSourcesTopbarController = {
	/*
	* Inserts rows into the listview on screen 'Sources'
	*/
	has_been_init: false

	, init: function(beforeStarting, afterStarting) {
		beforeStarting();

		if (!GLOBAL_SOURCES_TOPBAR_CONTROLLER.has_been_init) {
			do_long_task("JOURNAL_EXPLORER");

			window.setTimeout(function() {
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_for_section("journalsListView_2xs");
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_for_section("journalsListView_xs");
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_for_section("journalsListView_s");
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_for_section("journalsListView_m");
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_for_section("journalsListView_l");
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_for_section("journalsListView_xl");
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_for_section("journalsListView_2xl");
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.populate_journals_in_listview_for_section("journalsListView_3xl");
				GLOBAL_SOURCES_TOPBAR_CONTROLLER.has_been_init = true;
				finished_long_task("JOURNAL_EXPLORER");
			}, 300);
		}

		afterStarting();
	}

   	, populate_journals_in_listview_for_section: function(given_section) {
		console.log("populate_journals_in_listview_for_section: " + given_section);
		// clear model and view
		journals_to_include = [];
		
		for (var i = 0; i < saved_journals_master_data.length; i++) {
			var this_journal = saved_journals_master_data[i];
			var include_this_journal = false;
			var this_listing_count = parseInt(this_journal.listing_count);

			if (given_section == "journalsListView_2xs" && parseInt(this_journal.is_bo8) == 1) include_this_journal = true;
			if (given_section == "journalsListView_xs" && this_listing_count >= 7 && parseInt(this_journal.is_bo8) != 1) include_this_journal = true;
			if (given_section == "journalsListView_s" && this_listing_count == 6) include_this_journal = true;
			if (given_section == "journalsListView_m" && this_listing_count == 5) include_this_journal = true;
			if (given_section == "journalsListView_l" && this_listing_count == 4) include_this_journal = true;
			if (given_section == "journalsListView_xl" && this_listing_count == 3) include_this_journal = true;
			if (given_section == "journalsListView_2xl" && this_listing_count == 2) include_this_journal = true;
			if (given_section == "journalsListView_3xl" && this_listing_count == 1) include_this_journal = true;

			if (include_this_journal) {
				journals_to_include.push(this_journal);
			}
		}

		for (var i = 0; i < journals_to_include.length; i++) {
			var journal_record = journals_to_include[i];
			var is_selected = user_selected_journal_ids_to_include.includes(journal_record.journal_id);
			
			console.log("bootstrapSwitch: " + journal_record.journal_id);
			if (is_selected) {
				$("#switch_for_journal_" + journal_record.journal_id).bootstrapSwitch('state', true);
			} else {
				$("#switch_for_journal_" + journal_record.journal_id).bootstrapSwitch('state', false);
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
		for (var i = 0; i < user_selected_journals_to_include.length; i++) {
			var journal_id = user_selected_journals_to_include[i];
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