<div id="litbaskets-search" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">

	<div style="text-align: center;">
        <h1 style="color: rgb(128, 203, 196); font-size: 4rem; font-weight: bold;">Litbaskets <sub>beta</sub></h1>
        <img src="images/baskets500.png" alt="litbaskets.io" style="height: 25rem; padding: 1rem;" />

        <div style="margin-bottom: 1rem;">
            <input
                id="litbaskets_search_textbox"
                class="form-control"
                onchange="check_if_search_buttons_should_be_locked()"
                style="font-size: 2rem; padding: 2rem; display: inline-block;" 
                type="text" placeholder="e.g. Crowdfunding"
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
            id="litbaskets_search_bo8_button"
            onclick="user_did_click_search_bo8_button()"
            data-toggle="modal" data-target="#modal_for_search_results"
            style="font-size: 2rem;"
        >
            Search Bo8
        </button>
        <button class="btn btn-default"
            id="litbaskets_extended_search_button"
            onclick="user_did_click_extended_search_button()"
            data-toggle="modal" data-target="#modal_for_search_results" style="font-size: 2rem;"
        >
            Extended Search
        </button>
    </div>
    
    <div style="text-align: center; margin-top: 4rem;">
        <p>
            <strong>Litbaskets is realised through Scopus, you will need to have access to Scopus to use the search.</strong>
        </p>
        <p>
            <strong>Search</strong> includes a core set of thirty (30) core journals about Information Systems.
            <strong>Search Bo8</strong> includes only the set of eight (8) journals in the <a href="https://aisnet.org/page/SeniorScholarBasket">AIS Senior Scholars' Basket</a>.
            <strong>Extended Search</strong> includes all literature that
            may in some way be relevant to Information Systems researchers.
        </p>
        <p>
            The definition of the core set that drives the <strong>Search</strong> button be managed by accessing the 
            <span class="litbaskets-inline-button"><span class="fa fa-database"></span> Sources</span>
            tab.
        </p>
    </div>
</div>