<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$key = '045c8051e51c4de199262f7156f521fd';

$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $_REQUEST['capital'] . '&key=045c8051e51c4de199262f7156f521fd&language=en&pretty=1';
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);


$output =  $decode["results"][0]["geometry"];
// header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
