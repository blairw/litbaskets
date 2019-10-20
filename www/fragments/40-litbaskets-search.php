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
</div>