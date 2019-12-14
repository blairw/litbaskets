<?php
	// $WWW_SERVER = "https://litbaskets.b-cdn.net/";
	// $WWW_SERVER = "https://localhost/dev/litbaskets/www/";
	// $WWW_SERVER = "https://www-beta.litbaskets.io/";
	$WWW_SERVER = "https://www.litbaskets.io/";

	// $API_SERVER = "http://localhost/dev/litbaskets/api/";
	$API_SERVER = "https://api.litbaskets.io/";

	include("fragments/00-preheader.php");
	include("fragments/10-header-and-open-body.php");
	include("fragments/20-top-bar.php");
	include("fragments/30-sidebar.php");
?>

<div id="litbaskets-container" class="container-fluid container-pf-nav-pf-vertical hide-nav-pf">
	<?php
		include("fragments/39-loading.php");
		include("fragments/40-litbaskets-search.php");
		include("fragments/41-litbaskets-advanced-search.php");
		include("fragments/43-litbaskets-search-results.php");
		include("fragments/46-litbaskets-sources.php");
		include("fragments/50-litbaskets-about.php");
		include("fragments/60-litbaskets-libraries.php");
	?>
</div>

<?php
	include("fragments/99-close-body-and-end.php");
?>