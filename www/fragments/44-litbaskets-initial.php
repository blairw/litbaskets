<div id="litbaskets-initial" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">
	<h1>1. Choose Litbasket</h1>
	
	<p>
		We have a number of prepacked litbaskets from the smallest (Bo8) to the largest (L1: 847 journals!). The smaller packs start with the most "core" IS journals and the larger ones begin to include those that are not as "core" to IS (Management, Computer Science, etc.). The default litbasket, L5 (51 journals), balances recall and precision reasonably well for initial exploratory searches. However, depending on your research topic, you may need to set this to be narrower (e.g. if you're searching for common keywords like "user experience") or wider (e.g. if you're searching for rare keywords like "nomadicity").
	</p>

	<div style="text-align: center; margin-bottom: 4rem;">
		<img src="images/graph.png" style="width: 100%; padding-left: 3.3rem; padding-right: 8rem;" /> 

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
	</div>
</div>