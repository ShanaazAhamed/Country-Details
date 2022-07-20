<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
// echo $_REQUEST('lat');
$key = '55587ae173';

$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $_REQUEST['country'] . '&key=045c8051e51c4de199262f7156f521fd&language=en&pretty=1';
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
