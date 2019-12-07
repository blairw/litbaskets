<div id="litbaskets-sources" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">
	<h1>Journals</h1>
	
	<p>
		You can make personal adjustments to include or exclude specific journals you need. For example, if your research question is about graphical user interface design, you might wish to select some HCI journals and deselect some Management journals.
		Use 'Baskets' to chose the Litbasket you want to use as starting point for your customization. You can start with any of the journal lists we identified (see FAQ) or simply use 'All' to make customization based on the full journal set. 'Subdivision' allows you to further narrow within a journal list.
	</p>

	<div class="container-fluid">
		<div class="row toolbar-pf">
			<div class="toolbar-pf-actions">
				<div class="form-group" style="padding-left: 0px;">
					<label>Basket</label>
					<select id="basketSelector" class="custom-select form-control" onchange="GLOBAL_SOURCES_TOPBAR_CONTROLLER.user_did_select_basket()">
					</select>
					<label style="margin-top: 1rem;">Subdivision</label>
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
					<div id="sources_loading_status" style="font-weight: bold; margin-top: 1rem;">
						
					</div>
				</div>
				<div class="form-group">
					<label>
						Other options:
					</label>
					<div>
						<button style="min-width: 12.5rem;" id="empty_litbasket" onclick="GLOBAL_SOURCES_TOPBAR_CONTROLLER.empty_litbasket()" class="btn btn-danger">
							EMPTY LITBASKET
						</button>
						<div style="margin-top: 0.5rem;">
							<button style="min-width: 12.5rem;" id="download_csv" onclick="GLOBAL_SOURCES_TOPBAR_CONTROLLER.download_csv()" class="btn btn-primary">
								DOWNLOAD CSV
							</button>
						</div>
					</div>
				</div>
			</div>
			<!-- /col -->
		</div>
		<!-- /row -->
	</div>
	<table class="table table-striped table-bordered table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView">
		</tbody>
	</table>

</div>