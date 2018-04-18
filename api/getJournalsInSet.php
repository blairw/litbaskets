<?php	
	// connect to mysql
	include ('secret.php');
	include ('cors.php');
	
	//
	// GROUP DETAILS
	//
	$resJ = $mysqli->query("
		SELECT
			j.journal_name,
			j.scopus_sourceid,
			j.field_id,
			b.basket_id
		FROM litfam_journals j
			JOIN litfam_journal_basket_membership bm ON j.journal_id = bm.journal_id
			JOIN litfam_journal_baskets b ON b.basket_id = bm.basket_id
		WHERE j.scopus_sourceid IS NOT NULL AND j.field_id IS NOT NULL
	");
	
	$outputArray = array();
	while ($row = $resJ->fetch_assoc()) {
		array_push($outputArray, $row);
	}
	$resJ->close();	
	$mysqli->close();
	
	header('Content-type: application/json');
	echo json_encode($outputArray, JSON_PRETTY_PRINT);
?>