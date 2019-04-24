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