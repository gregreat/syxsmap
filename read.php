<?php
$fp = file("location.json");
$lastLocation = $fp[count($fp)-1];
echo $lastLocation;
?>
