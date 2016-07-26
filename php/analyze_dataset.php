<?php
	$path    = '../result';
	$files = array_diff(scandir($path), array('.', '..'));
	$dataset_1= "Number;Number of pauses;Number of changes;Distance of tour;User number;Tour\n";
	$name_dataset_1="burma14";
    $dataset_2= "Number;Number of pauses;Number of changes;Distance of tour;User number;Tour\n";
    $name_dataset_2="ulysses22";
    $dataset_3= "Number;Number of pauses;Number of changes;Distance of tour;User number;Tour\n";
    $name_dataset_3="bayg29";
    $nb_row=1;
    $current_dataset= "";
	foreach ($files as $value){
	    //echo $value . "\n";
	    $tmp = explode("-", $value);
		$nb_user = explode(".", $tmp[1])[0];
		$name_algo= $tmp[0];
	    if(strcmp($name_algo,$current_dataset) != 0) {
	    	$nb_row=1;
	    	$current_dataset=$name_algo;
	    }
	    $tmp_string = $nb_row . ";";
	    $handle = fopen("../result/".$value, "r");
		if ($handle) {
			
		    while (($line = fgets($handle)) !== false) {
		    	$line = str_replace("\n", "", $line);
		        //echo "	", substr($line,0,10);
		        switch (substr($line,0,5)) {
		        	case 'NAME:':
		        		break;
		        	case 'NB_PA':
		        		$tmp_string .= explode(" ", $line)[1] . ";";
		        		break;
		        	case 'NB_CH':
		        		$tmp_string .= explode(" ", $line)[1] . ";";
		        		break;
		        	case 'DISTA':
		        		$tmp_string .= explode(" ", $line)[1] . ";";
		        		$tmp_string .= $nb_user . ";";
		        		break;
		        	case 'TOUR_':
		        		break;
		        	default:
		        		if(strcmp($line, "-1") != 0 && strcmp($line, "EOF") != 0) {
		        			$tmp_string .= $line . "-";
		        		}
		        		break;
		        }
		    }
		    $tmp_string .= "\n";
		    //echo $tmp_string;
		    switch ($name_algo) {
		    	case $name_dataset_1:
		    		$dataset_1 .= $tmp_string;
		    		break;
		    	case $name_dataset_2:
		    		$dataset_2 .= $tmp_string;
		    		break;
		    	case $name_dataset_3:
		    		$dataset_3 .= $tmp_string;
		    		break;
		    	default:
		    		# code...
		    		break;
		    }
		    $nb_row++;
		    fclose($handle);
		} else {
			echo "	error\n";
		    // error opening the file.
		} 
	}

	$myfile = fopen("../result/".$name_dataset_1.".csv", "w") or die("Unable to open file!");
	$txt = $dataset_1;
	fwrite($myfile, $txt);
	fclose($myfile);

	$myfile = fopen("../result/".$name_dataset_2.".csv", "w") or die("Unable to open file!");
	$txt = $dataset_2;
	fwrite($myfile, $txt);
	fclose($myfile);

	$myfile = fopen("../result/".$name_dataset_3.".csv", "w") or die("Unable to open file!");
	$txt = $dataset_3;
	fwrite($myfile, $txt);
	fclose($myfile);
    
    /*header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($myfile));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($myfile));
    readfile($myfile);*/
?>
