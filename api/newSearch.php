<?php	
	// connect to mysql
	include ('cors.php');
    include ('secret.php');
    
    if (!isset($_POST['search_terms'])) $is_valid = false;
    if (!isset($_POST['litbasket_size'])) $is_valid = false;
    if (!isset($_POST['filter_reviews_only'])) $is_valid = false;
    if (!isset($_POST['filter_editorials_only'])) $is_valid = false;
    if (!isset($_POST['year_limit_set'])) $is_valid = false;
    if (!isset($_POST['year_limit_data'])) $is_valid = false;
    
	//
	// BASKET DETAILS
	//
	$history_query = $mysqli->prepare("
        INSERT INTO litbaskets_stats_searches
        (
            search_terms,
            litbasket_size,
            filter_reviews_only,
            filter_editorials_only,
            year_limit_set,
            year_limit_data,
            web_browser
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $history_query->bind_param('ssiiiis', 
        $_POST['search_terms'],
        $_POST['litbasket_size'],
        $_POST['filter_reviews_only'],
        $_POST['filter_editorials_only'],
        $_POST['year_limit_set'],
        $_POST['year_limit_data'],
        $_SERVER['HTTP_USER_AGENT']
    );
    $history_query->execute();

	$mysqli->close();
?>