<?php	
	// connect to mysql
	include ('cors.php');
	include ('secret.php');
	

	//
	// BASKET DETAILS
	//
	$resBaskets = $mysqli->query("
		SELECT
			*
		FROM litfam_baskets
		WHERE litbaskets_flag = 1
		ORDER BY seqno ASC, basket_name ASC
	");
	
	$basketsArray = array();
	while ($row = $resBaskets->fetch_assoc()) {
		array_push($basketsArray, $row);
	}
	$resBaskets->close();	


	for ($i = 0; $i < count($basketsArray); $i++) {
		$resJ = $mysqli->query("
			SELECT
				bsd.*
			FROM litfam_basket_subdivisions bsd
				JOIN litfam_baskets b ON bsd.basket_id = b.basket_id
			WHERE b.basket_id = " . $basketsArray[$i]["basket_id"] . "
			ORDER BY bsd.subdivision_name ASC
		");

		$basketsArray[$i]["subdivisions"] = array();
		while ($row = $resJ->fetch_assoc()) {
			array_push($basketsArray[$i]["subdivisions"], $row);
		}
		$resJ->close();	
	}

	$mysqli->close();
	
	header('Content-type: application/json');
	echo json_encode($basketsArray, JSON_PRETTY_PRINT);
?>