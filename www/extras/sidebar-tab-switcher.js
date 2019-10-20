function userDidSelectTab(tabId) {
    console.log("SWITCHED TO: " + tabId);

    /*
    * OK, this is probably weird for you to read.
    * Essentially, we need this hack for the 'initial net size' tab
    * because the init_slider() function only works if the slider
    * is visible. The 
    */
    if (tabId == "litbaskets-initial") {
        GLOBAL_INITIAL_CONTROLLER.init_slider(function() {
            $("#litbaskets-container > div").css("display", "none");
            $("#litbaskets-initial").css("display", "block");
        });
    } else {
        $("#litbaskets-container > div").css("display", "none");
        $("#" + tabId).css("display", "block");
    }
}