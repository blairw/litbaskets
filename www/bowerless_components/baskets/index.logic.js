let API_ROOT = "../api/";
let SCOPUS_URL = "https://www.scopus.com/";
let SCOPUS_URL_USYD = "http://ezproxy.library.usyd.edu.au/login?url=scopus.com/"
let SCOPUS_URL_UTS = "http://ezproxy.lib.uts.edu.au/login?url=scopus.com/"
let SCOPUS_URL_UNSW = "https://www-scopus-com.wwwproxy1.library.unsw.edu.au/";
let RESULTS_SUFFIX = "results/results.uri?sort=plf-f&src=s&sot=a&s=";
var googleSuffix = "";
var scopusSuffix = "";
var savedAjaxResponse = [];

function bodyDidLoad() {
	getData();
}

function refreshPageElements() {
	buildScopusString();
	updateScopusHref();
	checkIfButtonEnabled();
}

function checkIfButtonEnabled() {
	let searchTerms = $("#searchTerms").val();
	console.log(searchTerms);
	if (searchTerms.length > 0) {
		$("#scopusSearch").removeClass("disabled");
	} else {
		$("#scopusSearch").addClass("disabled");
	}
}

function updateScopusHref() {
	let fullScopusSuffix = "TITLE-ABS-KEY(" + $("#searchTerms").val() + ") AND " + scopusSuffix;
	let encodedScopusSuffix = escape(fullScopusSuffix);

	let universityProxy = $("#universityProxy").val();
	var scopusUrl = SCOPUS_URL;
	switch (universityProxy) {
		case "none":
			break;
		case "unsw":
			scopusUrl = SCOPUS_URL_UNSW;
			break;
		case "usyd":
			scopusUrl = SCOPUS_URL_USYD;
			break;
		case "uts":
			scopusUrl = SCOPUS_URL_UTS;
			break;
		default:
			break;
	}

	let url = scopusUrl + RESULTS_SUFFIX + encodedScopusSuffix;
	$("#scopusSearch").attr("href", url);

	let openInNewTab = $("#openInNewTab").prop('checked');
	
	if (openInNewTab) {
		$("#scopusSearch").attr("target", "_blank");
	} else {
		$("#scopusSearch").attr("target", "_self");
	}
}

function getData() {
	$.get(API_ROOT + "getJournalsInSet.php", function(ajaxResponse) {
		savedAjaxResponse = ajaxResponse;
		buildScopusString();
	});
}

function buildScopusString() {
	var ranking = 1;
	let specifiedBaskets = $("#selectedBaskets").val();

	scopusSuffix = "(";

	var filteredResults = [];
	for (var i = 0; i < savedAjaxResponse.length; i++) {
		if (
			savedAjaxResponse[i].scopus_sourceid != null
			&& journalInSelectedBaskets(savedAjaxResponse[i], specifiedBaskets)
		) {
			filteredResults.push(savedAjaxResponse[i]);
		}
	}

	for (var i = 0; i < filteredResults.length; i++) {
		scopusSuffix += "SOURCE-ID(" + filteredResults[i].scopus_sourceid + ")";
		if (i == filteredResults.length - 1) {
			scopusSuffix += ")";
		} else {
			scopusSuffix += " OR ";
		}
	}

	console.log("scopusSuffix");
	console.log(scopusSuffix);
	console.log("/scopusSuffix");
}

function journalInSelectedBaskets(journal, baskets) {
	var preparedResponse = false;
	let journal_rank = journal.abdc_rank;

	for (var i = 0; i < baskets.length; i++) {
		let basket = baskets[i];
		console.log("journalInSelectedBaskets " + journal_rank + " " + basket);
		if (basket == "abdc-1" && journal_rank == "1") {
			preparedResponse = true;
		}
		if (basket == "abdc-2" && journal_rank == "2") {
			preparedResponse = true;
		}
		if (basket == "abdc-3" && journal_rank == "3") {
			preparedResponse = true;
		}
		if (basket == "abdc-4" && journal_rank == "4") {
			preparedResponse = true;
		}
	}

	return preparedResponse;
}