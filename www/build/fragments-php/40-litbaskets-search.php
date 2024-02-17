<div id="litbaskets-search" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">

	<div style="text-align: center;">
		<h1 style="color: rgb(128, 203, 196); font-size: 4rem; font-weight: bold;">LITBASKETS<sub style="font-style: italic; color: rgba(128, 203, 196, 0.5);">beta</sub></h1>
		<img src="assets/images/baskets500.png" alt="litbaskets.io" style="height: 25rem; padding: 1rem;" />

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
			id="litbaskets_advopt_button"
			data-toggle="modal" data-target="#modal_for_advanced_search"
			style="font-size: 2rem;"
		>
			Advanced Options
		</button>
	</div>

	<div style="text-align: left; font-size: 12pt; margin-top: 4rem;">
		<p>
			This website allows you to search through Literature Baskets, which we call <em>Litbaskets</em>.
			The <strong>default</strong> Litbasket has 51 journals that we believe are a great starting point for most IS research topics.
			If you are <strong>getting too many results</strong>, you can <strong>adjust the slider below</strong> to select smaller Litbaskets, all the way down to 2XS (AIS Basket of Eight).
		</p>
		<div style="margin-bottom: 4rem;">
			<div style="margin: 0 auto; padding-left: 10rem; padding-right: 10rem; padding-top: 3rem; padding-bottom: 3rem;">
				<div id="searchpage_shortslider_container">
					<table style="width: 100%;">
						<tr>
							<td style="text-align: left; width: 50%;">
								<em>Smallest Litbasket<br />Least journals</em>
							</td>
							<td style="text-align: right; width: 50%;">
								<em>Default Litbasket<br />More journals</em>
							</td>
						</tr>
					</table>
					<input id="shortslider" type="text"
						data-provide="slider"
						data-slider-ticks="[1, 2, 3, 4]"
						data-slider-ticks-labels='["2XS", "XS&nbsp;&nbsp;", "S&nbsp;&nbsp;", "M"]'
						data-slider-min="1"
						data-slider-max="4"
						data-slider-step="1"
						data-slider-value="4"
						data-slider-tooltip="show"
						onchange="GLOBAL_SEARCH_CONTROLLER.user_did_change_slider_value()"
					/>
				</div>
				
				<div id="searchpage_advopt_notice" style="background-color: lightgray; padding: 2.8rem; display: none; text-align: center;">
					You have used the Advanced Options to set the slider to a larger Litbasket.
				</div>
			</div>
		</div>
		<br />
		<p>
			<strong>Litbaskets is realised through Scopus, you will need to have access to Scopus to use the search.</strong>
			If you want to know more about how Litbaskets works or if you want to refer to Litbaskets in your
			research, please see the <strong>Help</strong> section.
			
			 <!-- or have a look at our paper:
			<em>
			<a href="https://www.researchgate.net/publication/336868520_wwwlitbasketsio_an_IT_Artifact_Supporting_Exploratory_Literature_Searches_for_Information_Systems_Research">
			www.litbaskets.io, an IT Artifact Supporting Exploratory Literature Searches for Information Systems Research</a></em>. -->
			
		</p>
	</div>
</div>
