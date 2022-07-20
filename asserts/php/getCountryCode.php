<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$url = 'http://api.geonames.org/countryInfoJSON?formatted=true&country=' . $_REQUEST['country'] . '&username=sohailparwany&style=full';


$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);



$output['status'] = "200";
$output['population'] = $decode['geonames'][0]['population'];
$output['capital'] = $decode['geonames'][0]['capital'];
$output['north'] = $decode['geonames'][0]['north'];
$output['west'] = $decode['geonames'][0]['west'];
$output['south'] = $decode['geonames'][0]['south'];
$output['east'] = $decode['geonames'][0]['east'];
$output['currencyCode'] = $decode['geonames'][0]['currencyCode'];

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
