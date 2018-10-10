function refreshPageElements() {
    let proposedSearchTerm = $("#searchTerms").val();
	if (proposedSearchTerm.length > 0) {
		$("#scopusSearch").removeClass("disabled");
		$("#scopusSearchBo8").removeClass("disabled");
	} else {
		$("#scopusSearch").addClass("disabled");
		$("#scopusSearchBo8").addClass("disabled");
    }
}