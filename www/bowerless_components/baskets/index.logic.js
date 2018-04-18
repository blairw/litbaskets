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
	$.get(API_ROOT + "getFieldsOfStudy.php", function(resFieldsOfStudy) {
		populateFields(resFieldsOfStudy);

		$.get(API_ROOT + "getBaskets.php", function(resBaskets) {
			populateBaskets(resBaskets);
			
			$.get(API_ROOT + "getJournalsInSet.php", function(ajaxResponse) {
				savedAjaxResponse = ajaxResponse;
				buildScopusString();
				$('select').formSelect();
			});
		});
	});
}

function populateBaskets(resBaskets) {
	for (var i = 0; i < resBaskets.length; i++) {
		var htmlString = '<option value="' + resBaskets[i].basket_id + '">'
		htmlString += resBaskets[i].basket_name;
		htmlString += '</option>';

		$("#selectedBaskets").append(htmlString);
	}
}

function populateFields(resFieldsOfStudy) {
	for (var i = 0; i < resFieldsOfStudy.length; i++) {
		var htmlString = '<option value="' + resFieldsOfStudy[i].field_id + '">'
		htmlString += resFieldsOfStudy[i].field_name;
		htmlString += '</option>';
		$("#selectedFields").append(htmlString);
	}
}

function buildScopusString() {
	var ranking = 1;
	let specifiedFields = $("#selectedFields").val();
	let specifiedBaskets = $("#selectedBaskets").val();


	scopusSuffix = "(";

	var filteredResults = [];
	for (var i = 0; i < savedAjaxResponse.length; i++) {
		if (
			savedAjaxResponse[i].scopus_sourceid != null
			&& journalMatchesCriteria(savedAjaxResponse[i], specifiedFields, specifiedBaskets)
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

function journalMatchesCriteria(journal, fields, baskets) {
	let fieldCheckPassed = ($.inArray(journal.field_id, fields) >= 0);
	let basketCheckPassed = ($.inArray(journal.basket_id, baskets) >= 0);

	let preparedResponse = (fieldCheckPassed && basketCheckPassed);
	console.log("preparedResponse = " + preparedResponse);
	return preparedResponse;
}