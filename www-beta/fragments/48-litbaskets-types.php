<div id="litbaskets-types" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">
    <h1>Configuration</h1>

    <form class="form-horizontal">
        <div class="form-group">
            <label for="reviews_only_switch" class="col-sm-2 control-label">Reviews only</label>
            <div class="col-sm-10">
                <input class="bootstrap-switch" id="reviews_only_switch" type="checkbox" 
                    onchange="check_review_only_switch()"
                >
                <span class="help-block">
                    This filters the resulting Scopus search to only include Review papers.
                </span>
            </div>
        </div>
    </form>
</div>