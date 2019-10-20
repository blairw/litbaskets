<div id="litbaskets-search" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">

	<div style="text-align: center;">
		<h1 style="color: rgb(128, 203, 196); font-size: 4rem; font-weight: bold;">LITBASKETS<sub style="font-style: italic; color: rgba(128, 203, 196, 0.5);">beta</sub></h1>
		<img src="images/baskets500.png" alt="litbaskets.io" style="height: 25rem; padding: 1rem;" />

		<div style="margin-bottom: 1rem;">
			<input
				id="litbaskets_search_textbox"
				class="form-control"
				onchange="GLOBAL_SEARCH_CONTROLLER.check_if_search_buttons_should_be_locked()"
				style="font-size: 2rem; padding: 2rem; display: inline-block;" 
				type="text" placeholder="e.g. Crowdfunding"
			/>
		</div>
		<button class="btn btn-primary" 
			id="litbaskets_search_button"
			onclick="GLOBAL_SEARCH_CONTROLLER.user_did_click_search_button()"
			data-toggle="modal" data-target="#modal_for_search_results"
			style="font-size: 2rem;"
		>
			Search
		</button>
		<button class="btn btn-default" 
			id="litbaskets_search_bo8_button"
			onclick="GLOBAL_SEARCH_CONTROLLER.user_did_click_search_bo8_button()"
			data-toggle="modal" data-target="#modal_for_search_results"
			style="font-size: 2rem;"
		>
			Search Bo8
		</button>
	</div>

	<div style="text-align: left; margin-top: 4rem;">
		<p>
			Welcome to Litbaskets! Before you proceed, you should ensure that you are happy with the following:
		</p>
		<table class="homepage_steps_table">
			<tr>
				<td style="width: 15rem;">
					<span class="litbaskets-inline-button"><span class="fa fa-shopping-basket"></span> 1. Net Size</span>
				</td>
				<td>
					The default is a set of 51 journals that balances recall and precision reasonably well most of the time.
				</td>
			</tr>
		</table>
		<ul>
			
			
		</ul>

			<strong>Search</strong> can be customised. You can easily change the "size of the net" (amount of journals) by adjusting
			the slider above (default level L5 = 51 journals, up to 847 journals). Or, use the
			<span class="litbaskets-inline-button"><span class="fa fa-database"></span> Sources</span>
			tab to customise your selection of journals.
		</p>
		<p>
			<strong>Search Bo8</strong> includes only the set of eight (8) journals in the <a href="https://aisnet.org/page/SeniorScholarBasket">AIS Senior Scholars' Basket</a>.
		</p>
		<p>
			<strong>Litbaskets is realised through Scopus, you will need to have access to Scopus to use the search.</strong>
		</p>
	</div>
</div>