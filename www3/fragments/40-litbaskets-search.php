<div id="litbaskets-search" style="display: none;  width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">

	<div style="text-align: center;">
        <h1 style="font-size: 4rem; font-weight: bold;">Lit Baskets <sub>beta</sub></h1>
        <img src="images/baskets500.png" alt="litbaskets.io" style="height: 25rem; padding: 1rem;" />

        <div style="margin-bottom: 1rem;">
            <input
                class="form-control"
                style="font-size: 2rem; padding: 2rem; display: inline-block;" 
                type="text" placeholder="e.g. Sociomateriality"
            />
        </div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" style="font-size: 2rem;">
            Search
        </button>
        <button class="btn btn-default" data-toggle="modal" data-target="#myModal" style="font-size: 2rem;">
            Extended Search
        </button>
    </div>
    

    <p style="margin-top: 4rem;" class="paragraph-that-contains-inline-buttons">
        <strong>Search</strong> includes only 'core' literature relating to Information Systems.
        <strong>Extended Search</strong> automatically includes all literature in Scopus that
        may in some way be relevant to Information Systems researchers, and also automatically opens new
        browser tabs performing searches on dblp and the AIS eLibrary. These options can be managed
        by accessing the 
        <a class="litbaskets-inline-button" href=""><span class="fa fa-database"></span> Scopus Sources</a>
        and
        <a class="litbaskets-inline-button" href=""><span class="fa fa-cogs"></span> Configuration</a>
        tabs on the left-hand side of the screen.
    </p>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close">
                        <span class="pficon pficon-close"></span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Modal Title</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-3 control-label" for="textInput">Field One</label>
                            <div class="col-sm-9">
                                <input type="text" id="textInput" class="form-control"></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label" for="textInput2">Field Two</label>
                            <div class="col-sm-9">
                                <input type="text" id="textInput2" class="form-control"></div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label" for="textInput3">Field Three</label>
                            <div class="col-sm-9">
                                <input type="text" id="textInput3" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>