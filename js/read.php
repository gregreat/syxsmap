<?php
$myfile = fopen("location.json", "r") or die("Unable to open file!");
fgets($myfile, $json);
fclose($myfile);

$fp = file("location.json");
echo $fp[count($fp)-1]
?>