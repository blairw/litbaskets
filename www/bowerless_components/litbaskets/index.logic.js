let SCOPUS_URL = "https://www.scopus.com/";
let SCOPUS_URL_USYD = "http://ezproxy.library.usyd.edu.au/login?url=scopus.com/"
let SCOPUS_URL_UTS = "http://ezproxy.lib.uts.edu.au/login?url=scopus.com/"
let SCOPUS_URL_UNSW = "https://www-scopus-com.wwwproxy1.library.unsw.edu.au/";
let RESULTS_SUFFIX = "results/results.uri?sort=plf-f&src=s&sot=a&s=";
var googleSuffix = "";
var searchIsValid = false;
var fullScopusTerms = "";
var savedAjaxResponse = [];

function bodyDidLoad() {
	getData();
}

function refreshPageElements() {
	buildScopusString();
	updateScopusHref();
	approveSearch();
}

function approveSearch() {
	if (searchIsValid) {
		$("#scopusSearchString").html(fullScopusTerms);
		$("#scopusSearch").removeClass("disabled");
	} else {
		$("#scopusSearchString").html("(not available)");
		$("#scopusSearch").addClass("disabled");
	}

}

function updateScopusHref() {
	let encodedScopusSuffix = escape(fullScopusTerms);

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
	let specifiedFields = $("#selectedFields").val();
	let specifiedBaskets = $("#selectedBaskets").val();

	// generate basket selection
	var filteredResults = [];
	for (var i = 0; i < savedAjaxResponse.length; i++) {
		if (
			savedAjaxResponse[i].scopus_sourceid != null
			&& journalMatchesCriteria(savedAjaxResponse[i], specifiedFields, specifiedBaskets)
		) {
			filteredResults.push(savedAjaxResponse[i]);
		}
	}

	// check basket selection valid
	var scopusSuffixIsValid = false;
	var preparedScopusSuffix = "(";
	for (var i = 0; i < filteredResults.length; i++) {
		preparedScopusSuffix += "SOURCE-ID(" + filteredResults[i].scopus_sourceid + ")";
		console.log("scopusSuffixIsValid");
		scopusSuffixIsValid = true;

		if (i == filteredResults.length - 1) {
			preparedScopusSuffix += ")";
		} else {
			preparedScopusSuffix += " OR ";
		}
	}

	// check search term valid
	var scopusTermIsValid = false;
	let proposedSearchTerm = $("#searchTerms").val();
	if (proposedSearchTerm.length > 0) {
		console.log("scopusTermIsValid");
		scopusTermIsValid = true;
	}

	// check validity
	if (scopusSuffixIsValid && scopusTermIsValid) {
		console.log("scopusSuffixIsValid && scopusTermIsValid");
		searchIsValid = true;
	}

	// interim complete
	fullScopusTerms = "TITLE-ABS-KEY(" + proposedSearchTerm + ")" 

	// do doctypes
	let docTypes = $("#documentTypes").val();
	if (docTypes.length > 0) {

		fullScopusTerms += "AND (";
		for (var i = 0; i < docTypes.length; i++) {
			fullScopusTerms += "DOCTYPE(" + docTypes[i] + ")";

			if (i == docTypes.length - 1) {
				fullScopusTerms += ")";
			} else {
				fullScopusTerms += " OR ";
			}
		}
	}

	// final complete
	fullScopusTerms = fullScopusTerms + " AND " + preparedScopusSuffix;
}

function journalMatchesCriteria(journal, fields, baskets) {
	let fieldCheckPassed = ($.inArray(journal.field_id, fields) >= 0);
	let basketCheckPassed = ($.inArray(journal.basket_id, baskets) >= 0);

	let preparedResponse = (fieldCheckPassed && basketCheckPassed);
	console.log("preparedResponse = " + preparedResponse);
	return preparedResponse;
}