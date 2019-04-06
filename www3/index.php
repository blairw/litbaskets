<?php
	include("fragments/00-preheader.php");
	include("fragments/10-header-and-open-body.php");
	include("fragments/20-top-bar.php");
	include("fragments/30-sidebar.php");
?>

<div id="litbaskets-container" class="container-fluid container-pf-nav-pf-vertical hide-nav-pf">
	<?php
		include("fragments/40-litbaskets-search.php");
		include("fragments/41-litbaskets-sources.php");
		include("fragments/42-litbaskets-configuration.php");
		include("fragments/50-litbaskets-about.php");
	?>
</div>
<script>
	userDidSelectTab('litbaskets-search');

	$(".bootstrap-switch").bootstrapSwitch();
	$('.selectpicker').selectpicker();

	// Initialize the vertical navigation
	$().setupVerticalNavigation(true);
</script>

<?php
	include("fragments/99-close-body-and-end.php");
?>