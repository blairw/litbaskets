<?php	
	// connect to mysql
	include ('secret.php');
	include ('cors.php');
	
	$journalsArray = array();
	$resJ = $mysqli->query("
		SELECT
			j.*, r.listing_count
		FROM litfam_journals j
			JOIN v_litbaskets_rankings r ON r.journal_id = j.journal_id
		WHERE j.scopus_sourceid IS NOT NULL
	");
	
	while ($row = $resJ->fetch_assoc()) {
		array_push($journalsArray, $row);
	}
	$resJ->close();	

	$mysqli->close();
	
	header('Content-type: application/json');
	echo json_encode($journalsArray, JSON_PRETTY_PRINT);
?>