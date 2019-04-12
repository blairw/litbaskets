function check_if_search_buttons_should_be_locked() {
    var should_lock = ($("#litbaskets_search_textbox").val().length == 0);
    
    $("#litbaskets_search_button").attr("disabled", should_lock);
    $("#litbaskets_extended_search_button").attr("disabled", should_lock);
}

function user_did_click_extended_search_button() {
    var scopus_ids = [];
    for (var i = 0; i < saved_journals_master_data.length; i++) {
        var this_journal = saved_journals_master_data[i];
        scopus_ids.push(this_journal.scopus_sourceid);
    }

    perform_search_with_journals(scopus_ids);
}

function user_did_click_search_button() {
    var scopus_ids = [];
	for (var i = 0; i < user_selected_journal_ids_to_include.length; i++) {
        var this_journal_id = user_selected_journal_ids_to_include[i];
        var this_journal = _.findWhere(saved_journals_master_data, {journal_id: this_journal_id});
        scopus_ids.push(this_journal.scopus_sourceid);
    }

    perform_search_with_journals(scopus_ids);
}

function perform_search_with_journals(list_of_journals) {
    $("#txt_copy_to_clipboard").text("");

    var prepared_response = "TITLE-ABS-KEY(" + $("#litbaskets_search_textbox").val() + ") AND (";

    for (var i = 0; i < list_of_journals.length; i++) {
        if (i > 0) {
            prepared_response += " OR ";
        }
        prepared_response += "SOURCE-ID(" + list_of_journals[i] + ")";
    }

    prepared_response += ")";


    $("#txt_copy_to_clipboard").val(prepared_response);

    // externals
    var prepared_scopus_link = "https://www.scopus.com/results/results.uri?sort=plf-f&src=s&sot=a&s=" + escape(prepared_response);
    console.log(prepared_scopus_link);
    
    $("#link_ais_elibrary").prop("href", "https://aisel.aisnet.org/do/search/?q=" + $("#litbaskets_search_textbox").val());
    $("#link_ais_dblp").prop("href", "https://dblp.org/search?q=" + $("#litbaskets_search_textbox").val());
    $("#link_for_scopus").prop("href", prepared_scopus_link);
}

function user_starts_new_search() {
    $('#litbaskets_search_textbox').val("");
}

$(document).on('hidden.bs.modal', '#modal_for_search_results', function () {
    $('#litbaskets_search_textbox').focus();
});

function navigate_to_sources_tab() {
    $("#link_for_nav_litbaskets_sources").click();
    return false;
}