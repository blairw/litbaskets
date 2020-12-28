/*
 * LitbasketsExternalLogicHelper
 * Instantiated in index.controller.js as GLOBAL_EXTERNAL_LOGIC_HELPER
 */
LitbasketsExternalLogicHelper = {
	
	generate_url: function (mode, search_terms) {
		var preparedReturn = "";

		if (mode == "ISSN_LOOKUP") {
			preparedReturn = "https://portal.issn.org/api/search?search[]=MUST=notcanc,notinc,notissn,notissnl=" + search_terms;
		}
		if (mode == "AIS_ELIBRARY_SEARCH") {
			preparedReturn = "https://aisel.aisnet.org/do/search/?q=" + search_terms;
		}
		if (mode == "DBLP_SEARCH") {
			preparedReturn = "https://dblp.org/search?q=" + search_terms;
		}
		if (mode == "SCOPUS_SOURCE_LOOKUP") {
			preparedReturn = GLOBAL_SEARCH_CONTROLLER.get_current_scopus_url() + "sourceid/" + search_terms;
		}
		if (mode == "SCOPUS_SEARCH_QUERY") {
			preparedReturn = GLOBAL_SEARCH_CONTROLLER.get_current_scopus_url() + "results/results.uri?sort=plf-f&src=s&sot=a&s=" + search_terms;
		}

		return preparedReturn;
	}

	, generate_url_html: function(mode, search_terms, label) {
		return "<a href='" + this.generate_url(mode, search_terms) + "' target='_blank'>" + label + "</a>";
	}
}