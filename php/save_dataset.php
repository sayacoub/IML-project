<?php
if (isset($_POST["dataset"]) && isset($_POST["timestamp"]) && isset($_POST["algo_name"])) {
	$date = new DateTime();
	if($_POST["algo_name"] == "custom") {
		$file_name = "../result/".$_POST["timestamp"]."-custom-".(string)$date->getTimestamp(). ".tsp";
	}
	else {
		$file_name = "../result/".$_POST["algo_name"]."-".$_POST["timestamp"]. ".tsp";
	}
	$myfile = fopen($file_name, "w") or die("Unable to open file!");
	$txt = $_POST["dataset"];
	fwrite($myfile, $txt);
	fclose($myfile);
    
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($myfile));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($myfile));
    readfile($myfile);

}
?>

<?php
    $handle = fopen("file.txt", "w");
    fwrite($handle, "text1.....");
    fclose($handle);

    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename('file.txt'));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize('file.txt'));
    readfile('file.txt');
    exit;
?>
