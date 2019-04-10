var savedJournalsBySubdivisions = [];
var savedSubdivisionsByBaskets = [];

function bodyDidLoad() {
    loadObjects();
}

function loadObjects() {
	$.get(API_ROOT + "getSubdivisionsByBaskets.php", function(subdivisionsByBaskets) {
		savedSubdivisionsByBaskets = subdivisionsByBaskets;
			
		$.get(API_ROOT + "getJournalsBySubdivisions.php", function(journalsBySubdivisions) {
            savedJournalsBySubdivisions = journalsBySubdivisions;
            
            console.log("savedJournalsBySubdivisions");
            console.log("savedSubdivisionsByBaskets");
            console.log(savedJournalsBySubdivisions);
            console.log(savedSubdivisionsByBaskets);
		});
	});
}