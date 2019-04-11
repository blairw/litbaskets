// saving API requests
var saved_journals_by_subdivisions = [];
var saved_subdivisions_by_baskets = [];

// derived from API requests
var saved_journals_master_data = [];

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
			populate_baskets();
			populate_subdivisions_with_blank();
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

function populate_baskets() {
	for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
		var htmlString = '<option value="' + saved_subdivisions_by_baskets[i].basket_id + '">'
		htmlString += saved_subdivisions_by_baskets[i].basket_name;
		htmlString += '</option>';

		$("#basketSelector").append(htmlString);
	}
}

function populate_subdivisions_with_blank() {
	$("#subdivisionSelector").html("<option value='' selected='selected'>(All subdivisions, no filter applied)</option>");
}

/*
 * Inserts rows into the listview on screen 'Scopus Sources'
 */
function populate_journals_in_listview() {
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

		if (user_selected_journal_ids_to_inspect.includes(thisJournal.journal_id)) {
			var html_string = '<div class="list-group-item">';
			html_string += '<div class="list-view-pf-actions"><input id="switch_for_journal_'+ thisJournal.journal_id +'" class="bootstrap-switch" ';
			html_string += 'id="bootstrap-switch-state" type="checkbox" ' + (thisJournal.is_selected ? 'checked' : '') + '> </div> <div class="list-view-pf-main-info"> <div class="list-view-pf-body"> <div class="list-view-pf-description">';
			html_string += '<div class="list-group-item-heading">'+ thisJournal.journal_code +'</div>';
			html_string += '<div class="list-group-item-text">'+ thisJournal.journal_name +'</div>'; 
			html_string += '</div> <div class="list-view-pf-additional-info"> additional info </div> </div> </div> </div>';

			$("#journalsListView").append(html_string);
			$("#switch_for_journal_" + thisJournal.journal_id).bootstrapSwitch();
		}
	}	
}