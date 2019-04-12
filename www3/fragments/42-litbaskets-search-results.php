<div class="modal fade" id="modal_for_search_results" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close">
                    <span class="pficon pficon-close"></span>
                </button>
                <h4 class="modal-title" id="myModalLabel">Next steps...</h4>
            </div>
            <div class="modal-body">
                <h2 style="margin-top: 0;">Scopus Search String</h2>
                <p>We've generated a <strong>Scopus search string</strong> for you to use. You can copy it below.</p>
                <textarea class="form-control" id="txt_copy_to_clipboard" readonly>TEST</textarea>
                
                <div style="margin-top: 1rem; margin-bottom: 2rem;">
                    <button id="btn_copy_to_clipboard" type="button" class="btn btn-success" data-clipboard-target="#txt_copy_to_clipboard">COPY TO CLIPBOARD</button>
                    <span id="lbl_copy_to_clipboard"></span>
                </div>

                <p style="font-weight: bold;">
                    You should copy and paste this search string into <a href="https://www.scopus.com/" target="blank">Scopus (opens in new tab)</a>.
                </p>

                <p>
                    Alternatively, we've also automatically generated a <a id="link_for_scopus" href="#" target="blank">custom Scopus URL (opens in new tab)</a>
                    which will perform this search for you. This will not work for more complex queries.
                </p>

                <h2>Other Sources</h2>
                <ul>
                    <li><a id="link_ais_elibrary" href="#" target="blank">AIS eLibrary search with your search terms (opens in new tab)</a></li>
                    <li><a id="link_ais_dblp" href="#" target="blank">dblp search with your search terms (opens in new tab)</a></li>
                </ul>
            </div>
            <div class="modal-footer">
                If you're done here &mdash;&nbsp;
                <button type="button" class="btn btn-default" data-dismiss="modal" onclick="user_starts_new_search()">Start a new search</button>
            </div>
        </div>
    </div>
</div>