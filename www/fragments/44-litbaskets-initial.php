<div id="litbaskets-initial" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">
	<h1>Initial Net Size</h1>
	
	<div style="text-align: center; margin-bottom: 4rem;">
		<img src="images/graph.png" style="width: 100%; padding-left: 4rem; padding-right: 8rem;" /> 

		<div style="margin: 0 auto; padding-left: 10rem; padding-right: 10rem; padding-top: 3rem; padding-bottom: 3rem;">
			<input id="myslider" type="text"
				data-provide="slider"
				data-slider-ticks="[1, 2, 3, 4, 5, 6, 7, 8]"
				data-slider-ticks-labels='["<em>(least journals)</em>", "", "", "", "", "", "", "<em>(most journals)</em>"]'
				data-slider-min="1"
				data-slider-max="8"
				data-slider-step="1"
				data-slider-value="5"
				data-slider-tooltip="show"
				onchange="GLOBAL_INITIAL_CONTROLLER.user_did_change_threshold()"
			/>
		</div>
		<p>
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