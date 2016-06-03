<?php

if (isset($_POST["dataset"]) && isset($_POST["nb_points"]) && isset($_POST["algo_name"])) {
	$date = new DateTime();
	if($_POST["algo_name"] == "custom") {
		$file_name = "../result/custom/".$_POST["nb_points"]."-custom-".(string)$date->getTimestamp(). ".tsp";
	}
	else {
		$file_name = "../result/defined_datasets/".$_POST["algo_name"]."-".(string)$date->getTimestamp(). ".tsp";
	}
	$myfile = fopen($file_name, "w") or die("Unable to open file!");
	$txt = $_POST["dataset"];
	fwrite($myfile, $txt);
	fclose($myfile);
}
?>