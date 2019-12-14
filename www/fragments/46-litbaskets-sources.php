<?php
	// $url = $API_SERVER . "getJournalsForJournalExplorer.php";
	$url = "https://api.litbaskets.io/getJournalsForJournalExplorer.php";
	$contents = json_decode(file_get_contents($url), true);

	$array_htmlstrings = array();
	foreach (array("2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl") as $value) {
		$array_htmlstrings[$value] = array();
	}
		
	for ($i = 0; $i < count($contents); $i++) {
		$journal_record = $contents[$i];

		$coverage_text = $journal_record["scopus_coverage"];
		if (strpos($coverage_text, ",") !== false) {
			$coverage_text = "See Scopus";
		}
		if (strpos($coverage_text, "cancelled") !== false) {
			$coverage_text = "See Scopus";
		}
		if (strpos($coverage_text, "from") !== false) {
			$coverage_text = "See Scopus";
		}
		$col3 = '<a href="https://www.scopus.com/sourceid/' . $journal_record["scopus_sourceid"] .'">'
			. $coverage_text
			. '</a>'
			. "<img src='images/external-link.png' />"
		;

		$col2 = "<strong>" . $journal_record["journal_name"] . "</strong>";
		$col2 = $col2 . "<a href='" . $journal_record['url'] . "' target='_blank'><img src='images/external-link.png' /></a>";

		$col1 = '<input style="width: 100%;" id="switch_for_journal_' . $journal_record["journal_id"] . '" class="bootstrap-switch" ';
		$col1 = $col1 . 'onchange="GLOBAL_SOURCES_CONTROLLER.toggle_inclusion_of_journal_with_id(' . $journal_record["journal_id"] . ')" type="checkbox">';

		$html_string = '<tr>'
			. "<td style='padding: 0px;'>" . $col1 . "&nbsp;" . $col2 . "</td>"
			. "<td>" . $col3 . "</td>"
			. '</td>'
		;

		$listing_count = intval($journal_record["listing_count"]);
		if (intval($journal_record["is_bo8"]) == 1) {
			array_push($array_htmlstrings["2xs"], $html_string);
		} else if ($listing_count >= 7) {
			array_push($array_htmlstrings["xs"], $html_string);
		}
		if ($listing_count == 6) array_push($array_htmlstrings["s"], $html_string);
		if ($listing_count == 5) array_push($array_htmlstrings["m"], $html_string);
		if ($listing_count == 4) array_push($array_htmlstrings["l"], $html_string);
		if ($listing_count == 3) array_push($array_htmlstrings["xl"], $html_string);
		if ($listing_count == 2) array_push($array_htmlstrings["2xl"], $html_string);
		if ($listing_count == 1) array_push($array_htmlstrings["3xl"], $html_string);
	}
?>

<div id="litbaskets-sources" style="display: none; width: 90%; max-width: 90rem; margin: 0 auto; padding: 1rem;">
	<h1>Journals</h1>
	
    <div style="margin-top: 0.5rem;">
        <button style="min-width: 12.5rem;" id="download_csv" onclick="GLOBAL_SOURCES_TOPBAR_CONTROLLER.download_csv()" class="btn btn-primary">
            DOWNLOAD CSV
        </button>
    </div>
    
	<!-- 2XS -->
	<h2>Basket '2XS'</h2>
	<p>Basket '2XS' (Extra Extra Small) is the AIS Basket of Eight, consisting of the following journals:
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView_2xs">
			<?php
				foreach ($array_htmlstrings["2xs"] as $line) {
					echo $line;
				}
			?>
		</tbody>
	</table>

	<!-- XS -->
	<h2>Basket 'XS'</h2>
	<p>Basket 'XS' (Extra Small) consists of the '2XS' basket, plus the following journals:
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView_xs">
			<?php
				foreach ($array_htmlstrings["xs"] as $line) {
					echo $line;
				}
			?>
		</tbody>
	</table>

	<!-- S -->
	<h2>Basket 'S'</h2>
	<p>Basket 'S' (Small) consists of the 'XS' basket, plus the following journals:
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView_s">
			<?php
				foreach ($array_htmlstrings["s"] as $line) {
					echo $line;
				}
			?>
		</tbody>
	</table>
	
	<!-- M -->
	<h2>Basket 'M'</h2>
	<p>Basket 'M' (Medium) consists of the 'S' basket, plus the following journals:
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView_m">
			<?php
				foreach ($array_htmlstrings["m"] as $line) {
					echo $line;
				}
			?>
		</tbody>
	</table>
	
	<!-- L -->
	<h2>Basket 'L'</h2>
	<p>Basket 'L' (Large) consists of the 'M' basket, plus the following journals:
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView_l">
			<?php
				foreach ($array_htmlstrings["l"] as $line) {
					echo $line;
				}
			?>
		</tbody>
	</table>
	
	<!-- XL -->
	<h2>Basket 'XL'</h2>
	<p>Basket 'XL' (Extra Large) consists of the 'L' basket, plus the following journals:
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView_xl">
			<?php
				foreach ($array_htmlstrings["xl"] as $line) {
					echo $line;
				}
			?>
		</tbody>
	</table>
	
	<!-- 2XL -->
	<h2>Basket '2XL'</h2>
	<p>Basket '2XL' (Extra Extra Large) consists of the 'XL' basket, plus the following journals:
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView_2xl">
			<?php
				foreach ($array_htmlstrings["2xl"] as $line) {
					echo $line;
				}
			?>
		</tbody>
	</table>

	<!-- 3XL -->
	<h2>Basket '3XL'</h2>
	<p>Basket '3XL' (Largest) consists of the '2XL' basket, plus the following journals:
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>
					Title
				</th>
				<th style="width: 15rem;">
					Coverage
				</th>
			</tr>
		</thead>
		<tbody id="journalsListView_3xl">
			<?php
				foreach ($array_htmlstrings["3xl"] as $line) {
					echo $line;
				}
			?>
		</tbody>
	</table>
</div>