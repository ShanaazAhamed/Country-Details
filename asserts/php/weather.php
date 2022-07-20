<?php

// remove for production

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$url = 'https://api.openweathermap.org/data/2.5/weather?lat=' . $_REQUEST['lat'] . '&lon=' . $_REQUEST['lng'] . '&appid=27cd1cc54f3c5103f47d3451c78fc8e2';


$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
// echo $result;
curl_close($ch);
$decode = json_decode($result, true);

// echo $decode['weather'][0]['description'];


$output['status'] = "200";
$output['weather'] = $decode['weather'][0]['description'];

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
