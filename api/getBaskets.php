<?php	
	// connect to mysql
	include ('cors.php');
	include ('secret.php');
	
	//
	// GROUP DETAILS
	//
	$resJ = $mysqli->query("
		SELECT
			*
		FROM litfam_journal_baskets
		WHERE litbaskets_flag = 1
		ORDER BY seqno ASC, basket_name ASC
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