<div id="litbaskets-sources" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">
	<h1>Sources</h1>
	<div class="container-fluid">
		<div class="row toolbar-pf">
			<div class="toolbar-pf-actions">
				<div class="col-sm-12">
					<div class="form-group">
						<label>Basket</label>
						<select id="basketSelector" class="custom-select form-control" onchange="user_did_select_basket()">
							<option value="" selected="selected" disabled>Select a Basket ...</option>
						</select>
					</div>
					<div class="form-group">
						<label>Subdivision</label>
						<select id="subdivisionSelector" class="custom-select bobox form-control" onchange="user_did_select_subdivision()">
						</select>
					</div>
					<div class="form-group">
						<label>
							Selected <span id="litbasket_sources_inclusion_count">0</span>
							of <span id="litbasket_sources_inspection_count">0</span>
							journals in this set
						</label>
						<div>
							Select:
							<?php
								$buttons = [
									  ["current_subdivision_select_all", "ALL", "success", "cs_select_all()"]
									, ["current_subdivision_select_none", "NONE", "danger", "cs_select_none()"]
									, ["current_subdivision_select_default", "DEFAULT", "primary", "cs_select_default()"]
								];

								for ($i = 0; $i < count($buttons); $i++) {
									echo '<button id="' . $buttons[$i][0] . '" class="btn btn-' . $buttons[$i][2] . '" onclick=\'' . $buttons[$i][3] . '\'>'
										. $buttons[$i][1]
										. '</button>'
									;
								}
							?>
						</div>
					</div>
				</div>
			</div>
			<!-- /col -->
		</div>
		<!-- /row -->
	</div>
	<div class="container-fluid">

		<div id="journalsListView" class="list-group list-view-pf list-view-pf-view">
		
		</div>
	</div>

</div>