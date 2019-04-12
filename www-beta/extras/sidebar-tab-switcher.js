function userDidSelectTab(tabId) {
    $("#litbaskets-container > div").css("display", "none");
    $("#" + tabId).css("display", "block");
}