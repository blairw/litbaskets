function userDidSelectTab(tabId) {
    console.log("SWITCHED TO: " + tabId);

    /*
    * OK, this is probably weird for you to read.
    * Essentially, we need this hack for the 'initial net size' tab
    * because the init() function only works if the slider
    * is visible.
    */
    if (tabId == "litbaskets-initial")
    {
        GLOBAL_INITIAL_CONTROLLER.init(function() {
            $("#litbaskets-container > div").css("display", "none");
            $("#litbaskets-initial").css("display", "block");
        }, function(){});
    }
    else if (tabId == "litbaskets-filters")
    {
        GLOBAL_FILTERS_CONTROLLER.init(
            function() {
                $("#litbaskets-container > div").css("display", "none");
                $("#litbaskets-filters").css("display", "block");
            },
            function() {}
        );
    }
    else
    {
        $("#litbaskets-container > div").css("display", "none");
        $("#" + tabId).css("display", "block");
    }
}