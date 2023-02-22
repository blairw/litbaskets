/*
 * LitbasketsFiltersController
 * Instantiated in index.controller.js as GLOBAL_FILTERS_CONTROLLER
 */
LitbasketsFiltersController = {
	  is_reviews_only: false
	, is_editorials_only: false
	, has_been_init: false
	, limit_years: true
	, limit_years_data: 2013
	, currently_killing_one_of_the_type_filter_switches: false

	, init: function() {
		if (!this.has_been_init) {
			$("#limit_years_data").val(this.limit_years_data);
			$("#limit_years_switch").bootstrapSwitch('state', this.limit_years);

			
			var longslider = $("#longslider").slider({
				tooltip: 'always',
				reversed : false,
				formatter: function(value) {
					var journal_count = -1;
					var level_string = value + "";
					switch (value) {
						case 1: break;
						case 2: journal_count = 16; break;
						case 3: journal_count = 29; break;
						case 4: journal_count = 51; break;
						case 5: journal_count = 87; break;
						case 6: journal_count = 154; break;
						case 7: journal_count = 302; break;
						case 8: journal_count = 847; break;
					}
					if (value == 1) {
						GLOBAL_SEARCH_CONTROLLER.just_use_bo8 = true;
						return "AIS Basket of Eight";
					} else {
						GLOBAL_SEARCH_CONTROLLER.just_use_bo8 = false;
						return journal_count + " essential IS journals";
					}
				}
			});
			
			longslider.slider('setValue', GLOBAL_SEARCH_CONTROLLER.current_slider_value);

			this.has_been_init = true;
		}
	}

	/*
		Invoked when user clicks the switches for Scopus types (Editorials, Reviews)
	*/
	, user_did_change_type_filters: function(switch_user_clicked) {
		this.is_reviews_only = $("#reviews_only_switch").prop('checked');
		this.is_editorials_only = $("#editorials_only_switch").prop('checked');
	
		// Do not allow both filters on simultaneously. Kill previous one if required.
		if (
			this.is_editorials_only && switch_user_clicked == "REVIEWS"
			&& !this.currently_killing_one_of_the_type_filter_switches
		) {
			this.currently_killing_one_of_the_type_filter_switches = true;
			$("#editorials_only_switch").bootstrapSwitch('state', false);
			$("#reviews_only_switch").bootstrapSwitch('state', true);
		}
		if (
			this.is_reviews_only && switch_user_clicked == "EDITORIALS"
			&& !this.currently_killing_one_of_the_type_filter_switches
		) {
			this.currently_killing_one_of_the_type_filter_switches = true;
			$("#reviews_only_switch").bootstrapSwitch('state', false);
			$("#editorials_only_switch").bootstrapSwitch('state', true);
		}
		
		// done
		this.currently_killing_one_of_the_type_filter_switches = false;
	
		// update UI
		update_sidebar_badges();
	}

	/*
		Invoked when user clicks the switch to filter by year
	*/
	, check_limit_years_switch: function() {
		this.limit_years = $("#limit_years_switch").prop('checked');
		update_sidebar_badges();
	}

	/*
		Invoked when user changes the year to filter by year
	*/
	, check_limit_years_data: function() {
		console.log("check_limit_years_data");
		this.limit_years_data = $("#limit_years_data").val();
	}

	/*
	*/
	, update_sidebar_filter_count: function() {
		var filter_count = 0;
		if (this.limit_years) filter_count++;
		if (this.is_reviews_only) filter_count++;
		if (this.is_editorials_only) filter_count++;
		if (this.is_filters_only) filter_count++;
		$("#sidebar_badge_for_filters").html(filter_count > 0 ? filter_count : "");
	}
};