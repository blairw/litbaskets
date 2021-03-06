<?php	
	// connect to mysql
	include ('secret.php');
	include ('cors.php');
	
	//
	// SUBDIVISIONS DETAILS
	//
	$resSubdivisions = $mysqli->query("
		SELECT DISTINCT bsd_id
		FROM litfam_basket_subdivisions sd
		JOIN litfam_baskets b ON sd.basket_id = b.basket_id
	");
	
	$subdivisionsArray = array();
	while ($row = $resSubdivisions->fetch_assoc()) {
		array_push($subdivisionsArray, $row);
	}
	$resSubdivisions->close();	

	for ($i = 0; $i < count($subdivisionsArray); $i++) {
		$resJ = $mysqli->query("
			SELECT
				j.*, r.listing_count
			FROM litfam_journals j
				JOIN litfam_basket_membership bm ON j.journal_id = bm.journal_id
				JOIN v_litbaskets_rankings r ON r.journal_id = j.journal_id
			WHERE bm.bsd_id = " . $subdivisionsArray[$i]["bsd_id"] . "
			AND j.scopus_sourceid IS NOT NULL
		");
		
		$subdivisionsArray[$i]["journals"] = array();
		while ($row = $resJ->fetch_assoc()) {
			array_push($subdivisionsArray[$i]["journals"], $row);
		}
		$resJ->close();	
	}

	$mysqli->close();
	
	header('Content-type: application/json');
	echo json_encode($subdivisionsArray, JSON_PRETTY_PRINT);
?>