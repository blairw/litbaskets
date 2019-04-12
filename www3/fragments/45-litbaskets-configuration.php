<div id="litbaskets-configuration" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">
    <h1>Configuration</h1>
    <p>
        These settings meow meow lorem ipsum dolor sit amet.
        These settings meow meow lorem ipsum dolor sit amet.
        These settings meow meow lorem ipsum dolor sit amet.
        These settings meow meow lorem ipsum dolor sit amet.
    </p>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Open a tab for AIS eLibrary</label>
            <div class="col-sm-10">
                <input
                    class="bootstrap-switch" 
                    id="switch_for_ais_elibrary_newtab"
                    type="checkbox"
                    onchange="check_newtab_switches()"
                >
                <span class="help-block">
                    <ul>
                        <li>
                            The Association for Information Systems (AIS) eLibrary website hosts a set of 
                            journals and conference proceedings, which may be relevant for your research.
                        </li>
                        <li>
                            This option opens a new tab for the AIS eLibrary, and searches using your search terms.
                        </li>
                        <li>
                            This option does not filter according to the Scopus sources.
                        </li>
                        <li>
                            Default: off. <a href="#" onclick="reset_switch_to_default('#switch_for_ais_elibrary_newtab')">Reset to default.</a>
                        </li>
                    </ul>
                </span>
            </div>
        </div>
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Open a tab for dblp</label>
            <div class="col-sm-10">
                <input
                    class="bootstrap-switch"
                    id="switch_for_dblp_newtab"
                    type="checkbox"
                    onchange="check_newtab_switches()"
                >
                <span class="help-block">
                    <ul>
                        <li>This option opens a new tab for dblp, and searches using your search terms.</li>
                        <li>This option does not filter according to the Scopus sources.</li>
                        <li>
                            Default: off. <a href="#" onclick="reset_switch_to_default('#switch_for_dblp_newtab')">Reset to default.</a>
                        </li>
                    </ul>
                </span>
            </div>
        </div>
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">Open a tab for Scopus</label>
            <div class="col-sm-10">
                <input
                    class="bootstrap-switch"
                    id="switch_for_scopus_newtab"
                    type="checkbox"
                    onchange="check_newtab_switches()"
                >
                <span class="help-block">
                    <ul>
                        <li>This option opens a new tab for Scopus, and attempts to automatically execute the search string.</li>
                        <li>This option works for simple queries, but for complex queries, Scopus will return an error and you will need to manually copy and paste the search string as per usual.</li>
                        <li>
                            Default: off. <a href="#" onclick="reset_switch_to_default('#switch_for_scopus_newtab')">Reset to default.</a>
                        </li>
                    </ul>
                </span>
            </div>
        </div>
    </form>
</div>