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

    maybe_open_ais_elibrary();
    maybe_open_dblp();
    maybe_open_scopus(prepared_response);
}

function maybe_open_ais_elibrary() {
    if (newtab_for_ais_elibrary) {
        window.open("https://aisel.aisnet.org/do/search/?q=" + $("#litbaskets_search_textbox").val(), 'x');
        chrome.tabs.create({url: "https://aisel.aisnet.org/do/search/?q=" + $("#litbaskets_search_textbox").val()});
    }
}

function maybe_open_dblp() {
    if (newtab_for_dblp) {
        window.open("https://dblp.org/search?q=" + $("#litbaskets_search_textbox").val(), 'y');
        chrome.tabs.create({url: "https://dblp.org/search?q=" + $("#litbaskets_search_textbox").val()});
    }
}
function maybe_open_scopus(scopus_search_string) {
    if (newtab_for_scopus) {
        window.open("https://www.scopus.com/results/results.uri?sort=plf-f&src=s&sot=a&s=" + escape(scopus_search_string), 'z');
    }
}