<div id="litbaskets-sources" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">
	<h1>2. Sources</h1>
	
	<p>
		Step 1 was a <em>quantitative</em> assessment of how big your starter pack needs to be.
		In step 2, you make a <em>qualitative</em> assessment of specific journals you need. For example, if your research question is about
		graphical user interface design, you might wish to select some HCI journals and deselect some Management journals.
	</p>

	<div class="container-fluid">
		<div class="row toolbar-pf">
			<div class="toolbar-pf-actions">
				<div class="col-sm-12">
					<div class="form-group">
						<label>Basket</label>
						<select id="basketSelector" class="custom-select form-control" onchange="GLOBAL_SOURCES_TOPBAR_CONTROLLER.user_did_select_basket()">
						</select>
					</div>
					<div class="form-group">
						<label>Subdivision</label>
						<select id="subdivisionSelector" class="custom-select bobox form-control" onchange="GLOBAL_SOURCES_TOPBAR_CONTROLLER.user_did_select_subdivision()">
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
									  ["current_subdivision_select_all", "ALL", "success", "GLOBAL_SOURCES_CONTROLLER.cs_select_all()"]
									, ["current_subdivision_select_none", "NONE", "danger", "GLOBAL_SOURCES_CONTROLLER.cs_select_none()"]
									, ["current_subdivision_select_default", "DEFAULT", "primary", "GLOBAL_SOURCES_CONTROLLER.cs_select_default()"]
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