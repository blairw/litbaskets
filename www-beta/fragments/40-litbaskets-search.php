<div id="litbaskets-search" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">

	<div style="text-align: center;">
        <h1 style="font-size: 4rem; font-weight: bold;">Lit Baskets <sub>beta</sub></h1>
        <img src="images/baskets500.png" alt="litbaskets.io" style="height: 25rem; padding: 1rem;" />

        <div style="margin-bottom: 1rem;">
            <input
                id="litbaskets_search_textbox"
                class="form-control"
                onchange="check_if_search_buttons_should_be_locked()"
                onkeyup="check_if_search_buttons_should_be_locked()"
                style="font-size: 2rem; padding: 2rem; display: inline-block;" 
                type="text" placeholder="e.g. Sociomateriality"
            />
        </div>
        <button class="btn btn-primary" 
            id="litbaskets_search_button"
            onclick="user_did_click_search_button()"
            data-toggle="modal" data-target="#modal_for_search_results"
            style="font-size: 2rem;"
        >
            Search
        </button>
        <button class="btn btn-default"
            id="litbaskets_extended_search_button"
            onclick="user_did_click_extended_search_button()"
            data-toggle="modal" data-target="#modal_for_search_results" style="font-size: 2rem;"
        >
            Extended Search
        </button>
    </div>
    

    <p style="margin-top: 4rem;" class="paragraph-that-contains-inline-buttons">
        <strong>Search</strong> includes only 'core' literature relating to Information Systems.
        <strong>Extended Search</strong> automatically includes all literature in Scopus that
        may in some way be relevant to Information Systems researchers. The definition of 'core' literature
        can be managed by accessing the 
        <a class="litbaskets-inline-button" onclick="navigate_to_sources_tab()" href="#"><span class="fa fa-database"></span> Scopus Sources</a>
        tab.
    </p>
</div>