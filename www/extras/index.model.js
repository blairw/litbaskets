// saving API requests
var saved_journals_by_subdivisions = [];
var saved_subdivisions_by_baskets = [];

// derived from API requests
var saved_journals_master_data = [];
var saved_journals_bo8_only = [];
var saved_journals_litbaskets_ext_only = [];

// storing user selections
var user_selected_subdivision_ids = [];
var user_selected_journal_ids_to_inspect = [];
var user_selected_journal_ids_to_include = [];

function lbl_copy_to_clipboard_fadeout() {
	document.getElementById("lbl_copy_to_clipboard").style.opacity = '0';
}

function loadObjects() {
	$.get(API_ROOT + "getSubdivisionsByBaskets.php", function(x) {
		saved_subdivisions_by_baskets = x;
			
		$.get(API_ROOT + "getJournalsBySubdivisions.php", function(y) {
			saved_journals_by_subdivisions = y;
			
			generate_journal_master_data();
			generate_litbaskets_ext_master_data();
			generate_bo8_master_data();
			populate_baskets();

			populate_subdivisions_with_blank();
			things_to_do_after_data_loaded_from_api();
		});
	});
}

function generate_journal_master_data() {
	for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
		var this_subdivision = saved_journals_by_subdivisions[i];
		for (var j = 0; j < this_subdivision.journals.length; j++) {
			var this_journal = this_subdivision.journals[j];
			saved_journals_master_data.push(this_journal);
		}
	}

	// https://stackoverflow.com/questions/9923890/removing-duplicate-objects-with-underscore-for-javascript
	saved_journals_master_data = _.uniq(saved_journals_master_data, function(x){
		return JSON.stringify(x);
	});

	// set default on/off
	for (var i = 0; i < saved_journals_master_data.length; i++) {
		var this_journal = saved_journals_master_data[i];

		if (this_journal.is_core == 1) {
			user_selected_journal_ids_to_include.push(this_journal.journal_id);
			this_journal.is_selected = true;
		} else {
			this_journal.is_selected = false;
		}
	}

	console.log("generate_journal_master_data completed!");
	console.log(saved_journals_master_data);
}

function generate_litbaskets_ext_master_data() {
	var bsd_id_for_litbaskets_ext = -1;

	// get Basket of 8 bsd_id
	for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
		var this_basket = saved_subdivisions_by_baskets[i];
		if (this_basket.basket_name == "Litbaskets Sets") {
			bsd_id_for_litbaskets_ext = this_basket.subdivisions[0].bsd_id;
		}
	}

	// Push to saved_journals_litbaskets_ext_only
	for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
		var this_subdivision = saved_journals_by_subdivisions[i];
		if (this_subdivision.bsd_id == bsd_id_for_litbaskets_ext) {
			saved_journals_litbaskets_ext_only = this_subdivision.journals;
		}
	}
	
}

function generate_bo8_master_data() {
	var bsd_id_for_bo8 = -1;

	// get Basket of 8 bsd_id
	for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
		var this_basket = saved_subdivisions_by_baskets[i];
		if (this_basket.basket_name == "AIS Senior Scholars Basket") {
			bsd_id_for_bo8 = this_basket.subdivisions[0].bsd_id;
		}
	}

	// Push to saved_journals_bo8_only
	for (var i = 0; i < saved_journals_by_subdivisions.length; i++) {
		var this_subdivision = saved_journals_by_subdivisions[i];
		if (this_subdivision.bsd_id == bsd_id_for_bo8) {
			saved_journals_bo8_only = this_subdivision.journals;
		}
	}
}

function populate_baskets() {
	for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
		var htmlString = '<option value="' + saved_subdivisions_by_baskets[i].basket_id + '">'
		htmlString += saved_subdivisions_by_baskets[i].basket_name;
		htmlString += '</option>';

		$("#basketSelector").append(htmlString);
	}
}

function populate_subdivisions_with_blank() {
	$("#subdivisionSelector").html("<option value='-1' selected='selected'>(all subdivisions)</option>");
}

function generate_url(mode, search_terms) {
	var preparedReturn = "";
	if (mode == "ISSN_LOOKUP") {
		preparedReturn = "https://portal.issn.org/api/search?search[]=MUST=notcanc,notinc,notissn,notissnl=" + search_terms;
	}
	if (mode == "AIS_ELIBRARY_SEARCH") {
		preparedReturn = "https://aisel.aisnet.org/do/search/?q=" + search_terms;
	}
	if (mode == "DBLP_SEARCH") {
		preparedReturn = "https://dblp.org/search?q=" + search_terms;
	}
	if (mode == "SCOPUS_SOURCE_LOOKUP") {
		preparedReturn = "https://www.scopus.com/sourceid/" + search_terms;
	}
	if (mode == "SCOPUS_SEARCH_QUERY") {
		preparedReturn = "https://www.scopus.com/results/results.uri?sort=plf-f&src=s&sot=a&s=" + search_terms;
	}

	return preparedReturn;
}

function generate_url_html(mode, search_terms, label) {
	return "<a href='" + generate_url(mode, search_terms) + "' target='_blank'>" + label + "</a>";
}