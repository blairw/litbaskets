<div id="litbaskets-search" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">

	<div style="text-align: center;">
		<h1 style="color: rgb(128, 203, 196); font-size: 4rem; font-weight: bold;">LITBASKETS<sub style="font-style: italic; color: rgba(128, 203, 196, 0.5);">beta</sub></h1>
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
	</div>
	<div style="text-align: center; margin-top: 4rem;">

		<p>
			<strong>Litbaskets is realised through Scopus, you will need to have access to Scopus to use the search.</strong>
		</p>
		
		<p>
			<strong>Search</strong> includes a core set of fifty-three (53) core journals about Information Systems.
			This set can be customised at your discretion by using the 
			<span class="litbaskets-inline-button"><span class="fa fa-database"></span> Sources</span>
			tab, where you can select journals individually by searching through journal baskets.
		</p>
		<p>
			<strong>
				Or for quickly changing the "size of the net", adjust the threshold value below:
			</strong>
		</p>

		<div style="margin: 0 auto; padding-left: 10rem; padding-right: 10rem; padding-top: 3rem; padding-bottom: 3rem;">
		<input id="myslider" type="text"
			data-provide="slider"
			data-slider-ticks="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
			data-slider-ticks-labels='["<em>(most journals)</em>", "", "", "", "", "", "", "", "", "", "<em>(least journals)</em>"]'
			data-slider-min="1"
			data-slider-max="11"
			data-slider-step="1"
			data-slider-value="3"
			data-slider-tooltip="show"
			onchange="GLOBAL_SEARCH_CONTROLLER.user_did_change_threshold()" />
		</div>

		<p>
			<strong>Search Bo8</strong> includes only the set of eight (8) journals in the <a href="https://aisnet.org/page/SeniorScholarBasket">AIS Senior Scholars' Basket</a>.
		</p>
	</div>
</div>