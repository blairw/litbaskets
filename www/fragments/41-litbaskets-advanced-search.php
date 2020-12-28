<div class="modal fade" id="modal_for_advanced_search" tabindex="-1" role="dialog" aria-labelledby="modal_for_advanced_search_LABEL"
	aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close">
					<span class="pficon pficon-close"></span>
				</button>
				<h4 class="modal-title" id="modal_for_advanced_search_LABEL">Advanced Options</h4>
			</div>
			<div class="modal-body">
				<!-- FILTERS -->
				<h2 style="margin-top: 0;">Filters</h2>
				<p style="margin-bottom: 4rem;">
					You can apply criteria such as limiting to papers published since some given year (default: 2013), or limiting to "reviews only" / "editorials only".
				</p>
				<form class="form-horizontal">
					<div class="form-group">
						<label for="reviews_only_switch" class="col-sm-3 control-label">Reviews only</label>
						<div class="col-sm-9">
							<input class="bootstrap-switch" id="reviews_only_switch" type="checkbox" 
								onchange="GLOBAL_FILTERS_CONTROLLER.user_did_change_type_filters('REVIEWS')"
							>
						</div>
					</div>
					<div class="form-group">
						<label for="editorials_only_switch" class="col-sm-3 control-label">Editorials only</label>
						<div class="col-sm-9">
							<input class="bootstrap-switch" id="editorials_only_switch" type="checkbox" 
								onchange="GLOBAL_FILTERS_CONTROLLER.user_did_change_type_filters('EDITORIALS')"
							>
							<span class="help-block">
								Selecting only editorials is a good filter for identifying special issues.
							</span>
						</div>
					</div>
					<div class="form-group">
						<label for="minimum_year" class="col-sm-3 control-label">Limit by year</label>
						<div class="col-sm-9">
							<input class="bootstrap-switch" id="limit_years_switch" type="checkbox" 
								onchange="GLOBAL_FILTERS_CONTROLLER.check_limit_years_switch()"
							/>
							
							<span style="margin-left: 3rem; display: inline-block;">
								published after
							</span>
							<span style="display: inline-block;">
								<input class="form-control" id="limit_years_data"
									type="number"
									onchange="GLOBAL_FILTERS_CONTROLLER.check_limit_years_data()"
									onkeydown="GLOBAL_FILTERS_CONTROLLER.check_limit_years_data()"
									onkeyup="GLOBAL_FILTERS_CONTROLLER.check_limit_years_data()"
									style="max-width: 10rem; border-top: none; border-left: none; border-right: none; box-shadow: none;"
								/>
							</span>
						</div>
					</div>
				</form>

				<!-- LARGER LITBASKETS -->
				<h2 style="margin-top: 6rem;">Larger Litbaskets</h2>
				<p style="margin-bottom: 4rem;">
					You can use larger litbaskets beyond the range [2XS .. M].
					However, please be warned that for these larger Litbaskets, you will need to
					manually copy and paste a Scopus search string that will be generated for you.
				</p>
				<div>
					<table style="width: 100%;">
						<tr>
							<td style="text-align: left; width: 50%;">
								<em>Smallest Litbasket<br />Least journals</em>
							</td>
							<td style="text-align: right; width: 50%;">
								<em>Largest Litbasket<br />Most journals</em>
							</td>
						</tr>
					</table>
					<input id="longslider" type="text"
						data-provide="slider"
						data-slider-ticks="[1, 2, 3, 4, 5, 6, 7, 8]"
						data-slider-ticks-labels='["2XS", "XS", "&nbsp;&nbsp;S", "&nbsp;&nbsp;&nbsp;M", "&nbsp;&nbsp;&nbsp;L", "&nbsp;&nbsp;XL", "2XL", "3XL"]'
						data-slider-min="1"
						data-slider-max="8"
						data-slider-step="1"
						data-slider-value="4"
						data-slider-tooltip="show"
						onchange="GLOBAL_SEARCH_CONTROLLER.user_did_change_longslider_value()"
					/>
				</div>

				<!-- PROXY -->
				<h2 style="margin-top: 6rem;">Proxy</h2>
				<p style="margin-bottom: 4rem;">
					You can set a proxy if required.
				</p>
			</div>
			<div class="modal-footer">
				If you're done here &mdash;&nbsp;
				<button type="button" class="btn btn-success" data-dismiss="modal">CLOSE ADVANCED OPTIONS</button>
			</div>
		</div>
	</div>
</div>