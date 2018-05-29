let SCOPUS_URL = "https://www.scopus.com/";
let SCOPUS_URL_USYD = "http://ezproxy.library.usyd.edu.au/login?url=scopus.com/"
let SCOPUS_URL_UTS = "http://ezproxy.lib.uts.edu.au/login?url=scopus.com/"
let SCOPUS_URL_UNSW = "https://www-scopus-com.wwwproxy1.library.unsw.edu.au/";
let RESULTS_SUFFIX = "results/results.uri?sort=plf-f&src=s&sot=a&s=";
var googleSuffix = "";
var searchIsValid = false;
var fullScopusTerms = "";
var savedJournalsBySubdivisions = [];
var savedSubdivisionsByBaskets = [];

function bodyDidLoad() {
	getData();
}

function refreshPageElements() {
	refreshSubdivisionsInSelectedBaskets();
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
	$.get(API_ROOT + "getSubdivisionsByBaskets.php", function(subdivisionsByBaskets) {
		savedSubdivisionsByBaskets = subdivisionsByBaskets;
		populateBaskets(subdivisionsByBaskets);
			
		$.get(API_ROOT + "getJournalsBySubdivisions.php", function(journalsBySubdivisions) {
			savedJournalsBySubdivisions = journalsBySubdivisions;
			buildScopusString();
			$('select').formSelect();
		});
	});
}

function populateBaskets(subdivisionsByBaskets) {
	for (var i = 0; i < subdivisionsByBaskets.length; i++) {
		var htmlString = '<option value="' + subdivisionsByBaskets[i].basket_id + '">'
		htmlString += subdivisionsByBaskets[i].basket_name;
		htmlString += '</option>';

		$("#selectedBaskets").append(htmlString);
	}
}

function refreshSubdivisionsInSelectedBaskets() {
	console.log("refreshSubdivisionsInSelectedBaskets");
	let specifiedBaskets = $("#selectedBaskets").val();

	$("#selectedSubdivisions").empty();
	for (var i = 0; i < savedSubdivisionsByBaskets.length; i++) {
		let basketCheckPassed = ($.inArray(savedSubdivisionsByBaskets[i]["basket_id"], specifiedBaskets) >= 0); 
		if (basketCheckPassed) {
			console.log("basketCheckPassed == true")
			for (var j = 0; j < savedSubdivisionsByBaskets[i]["subdivisions"].length; j++) {
				let thisOne = savedSubdivisionsByBaskets[i]["subdivisions"][j];
			
				var htmlString = '<option value="' + thisOne["bsd_id"] + '" selected="true">'
				htmlString += thisOne["subdivision_name"]
				htmlString += '</option>';

				console.log(thisOne["bsd_id"]);
				$("#selectedSubdivisions").append(htmlString);
			}
		}
	}

	M.AutoInit();
}

function buildScopusString() {
	let specifiedSubdivisions = $("#selectedSubdivisions").val();

	// generate basket selection
	var filteredResults = [];
	for (var i = 0; i < savedJournalsBySubdivisions.length; i++) {
		let subdivisionCheckPassed = ($.inArray(savedJournalsBySubdivisions[i]["bsd_id"], specifiedSubdivisions) >= 0); 
		if (subdivisionCheckPassed) {
			for (var j = 0; j < savedJournalsBySubdivisions[i]["journals"].length; j++) {
				let thisOne = savedJournalsBySubdivisions[i]["journals"][j];

				if (thisOne["scopus_sourceid"] != null) {
					filteredResults.push(thisOne);
				}
			}
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

		fullScopusTerms += " AND (";
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