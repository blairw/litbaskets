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
                <h2 style="margin-top: 0;">Scopus Query String</h2>

                <p class="litbaskets_modal_message_if_short_search">
                    <strong>We've tried to automatically execute a Scopus search that opened in a new tab.</strong>
                </p>

                <p class="litbaskets_modal_message_if_short_search">
                    In some cases, you might get a message saying that <strong>"this bookmarked page cannot be displayed"</strong>.    
                    This happens if your search is a bit more complex. If this happens, you should copy and paste the query string below
                    into the <a href="https://www.scopus.com/search/form.uri?display=advanced" target="_blank">Scopus advanced search</a>:
                </p>

                <p class="litbaskets_modal_message_if_long_search">
                    <strong>
                        Please copy and paste the query string below
                        into the <a href="https://www.scopus.com/search/form.uri?display=advanced" target="_blank">Scopus advanced search</a>:
                    </strong>
                </p>
                
                <textarea class="form-control" id="txt_copy_to_clipboard" readonly>TEST</textarea>
                
                <div style="margin-top: 1rem; margin-bottom: 2rem;">
                    <button id="btn_copy_to_clipboard" type="button" class="btn btn-success" data-clipboard-target="#txt_copy_to_clipboard">COPY TO CLIPBOARD</button>
                    <span id="lbl_copy_to_clipboard"></span>
                </div>

                <h2>Other Sources</h2>
                <ul>
                    <li><a id="link_ais_elibrary" href="#" target="blank">AIS eLibrary search with your search terms (opens in new tab)</a></li>
                    <li><a id="link_ais_dblp" href="#" target="blank">dblp search with your search terms (opens in new tab)</a></li>
                </ul>
            </div>
            <div class="modal-footer">
                If you're done here &mdash;&nbsp;
                <button type="button" class="btn btn-warning" data-dismiss="modal" onclick="user_starts_new_search()">START A NEW SEARCH</button>
            </div>
        </div>
    </div>
</div>