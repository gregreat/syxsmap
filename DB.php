<?php

// 	$odata['t'] = $_POST['t'];
// 	$odata['lng'] = $_POST['lng'];
// 	$odata['lat'] = $_POST['lat'];
// $loca = '{t:'.$odata['t'].',lng:'.$odata['lng'].',lat:'.$odata['lat'].'}'."\r";
// echo $odata['t'].' '.$odata['lng'].' '.$odata['lat'];
// echo $loca;
#Get data from html
$json = file_get_contents('php://input')."\n";
#echo $json;

#Write data to local file as simple database
$myfile = fopen("location.json", "a") or die("Unable to open file!");
fwrite($myfile, $json);
fclose($myfile);

?>