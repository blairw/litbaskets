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
			Welcome to Litbaskets! Before you proceed, <strong>please ensure that you are happy with the following</strong> which can be configured
			using the tabs on the left side of the screen:
		</p>
		<table class="homepage_steps_table">
			<tr>
				<td style="width: 17rem;">
					<span class="litbaskets-inline-button"><span class="fa fa-shopping-basket"></span> 1. Starter Pack</span>
				</td>
				<td>
					We have a number of starter packs from the smallest (Bo8) to the largest (L1: 847 journals!).
					The smaller packs start with the most "core" IS journals
					and the larger ones begin to include those that are not as "core" to IS (Management, Computer Science, etc.).
					The default starter pack, L5 (51 journals), balances recall and precision reasonably well in typical cases.
					However, depending on your research topic, you may need to set this to be narrower
					(e.g. if you're searching for common keywords like "user experience")
					or wider (e.g. if you're searching for rare keywords like "nomadicity").
				</td>
			</tr>
			<tr>
				<td style="width: 15rem;">
					<span class="litbaskets-inline-button"><span class="fa fa-database"></span> 2. Sources</span>
				</td>
				<td>
					Step 1 was a <em>quantitative</em> assessment of how big your starter pack needs to be.
					In step 2, you make a <em>qualitative</em> assessment of specific journals you need. For example, if your research question is about
					graphical user interface design, you might wish to select some HCI journals and deselect some Management journals.
				</td>
			</tr>
			<tr>
				<td style="width: 15rem;">
					<span class="litbaskets-inline-button"><span class="fa fa-filter"></span> 3. Filters</span>
				</td>
				<td>
					You may apply some additional criteria such as limiting to papers published since some given year (default: 2013), or limiting to "reviews only" / "editorials only".
				</td>
			</tr>
		</table>
		<br />
		<p>
			<strong>Litbaskets is realised through Scopus, you will need to have access to Scopus to use the search.</strong>
		</p>
	</div>
</div>