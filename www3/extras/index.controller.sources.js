function user_did_select_basket() {
	// clear model
	user_selected_subdivision_ids = [];

	var selectedId = $("#basketSelector").val();
	for (var i = 0; i < saved_subdivisions_by_baskets.length; i++) {
		var thisBasket = saved_subdivisions_by_baskets[i];
		if (thisBasket.basket_id == selectedId) {
			populate_subdivisions_with_blank();

			for (var j = 0; j < thisBasket.subdivisions.length; j++) {
				var thisSubdivision = thisBasket.subdivisions[j];

				// populate list on Model
				user_selected_subdivision_ids.push(thisSubdivision.bsd_id);

				// populate list on View
				var htmlString = '<option value="' + thisSubdivision.bsd_id + '">'
				htmlString += thisSubdivision.subdivision_name;
				htmlString += '</option>';
				$("#subdivisionSelector").append(htmlString);
			}
		}
	}

	populate_journals_in_listview();
}


function user_did_select_subdivision() {
	// clear model
	user_selected_subdivision_ids = [];

	// update model
	user_selected_subdivision_ids.push($("#subdivisionSelector").val());

	// thank u, next
	populate_journals_in_listview();
}