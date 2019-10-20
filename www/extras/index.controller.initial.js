LitbasketsInitialNetSizeController = {
	current_threshold: 5 /* default threshold */
	, just_use_bo8: false

	, init_slider: function(beforeStarting) {
		beforeStarting();

		var sd = $("#myslider").slider({
			tooltip: 'always',
			reversed : true,
			formatter: function(value) {
				var journal_count = -1;
				var level_string = value + "";
				switch (value) {
					case 1: journal_count = 847; break;
					case 2: journal_count = 302; break;
					case 3: journal_count = 154; break;
					case 4: journal_count = 87; break;
					case 5: journal_count = 51; break;
					case 6: journal_count = 29; break;
					case 7: journal_count = 16; level_string = "7-11"; break;
					case 8: break;
				}
				if (value == 8) {
					GLOBAL_INITIAL_CONTROLLER.just_use_bo8 = true;
					return "Basket of Eight";
				} else {
					GLOBAL_INITIAL_CONTROLLER.just_use_bo8 = false;
					return journal_count + " journals (" + "Starter Pack L" + level_string + ")";
				}
			}
		});
		
		sd.slider('setValue', this.current_threshold);
	}

	, user_did_change_threshold: function() {
		var sd = $("#myslider").slider();
		this.current_threshold = sd.slider('getValue');

		GLOBAL_MODEL_HELPER.launch_sequence_after_api_load();
	}
}