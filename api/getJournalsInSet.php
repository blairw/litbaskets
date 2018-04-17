<?php	
	// connect to mysql
	include ('secret.php');
	
	//
	// GROUP DETAILS
	//
	$resJ = $mysqli->query("
		SELECT
			journal_name,
			scopus_sourceid,
			abdc_rank
		FROM litfam_journals
		WHERE field_of_study = '0806'
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