<?php
	// CORS
	if(isset($_SERVER['HTTP_ORIGIN'])) {
		$http_origin = $_SERVER['HTTP_ORIGIN'];
		if ($http_origin == "https://litbaskets.io/")
		{  
			header("Access-Control-Allow-Origin: $http_origin");
		}
	}
?>