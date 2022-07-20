<?php
// echo $_SERVER;
// remove for production
$key = 'b909671f08ac4f7c888845a69d3cdc9d';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$url = 'https://openexchangerates.org/api/latest.json?app_id=' . $key;
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);



$output['status'] = "200";
$output['rate'] = $decode['rates'][$_REQUEST['currencyCode']];




// header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
