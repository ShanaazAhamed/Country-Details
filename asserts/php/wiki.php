<?php

// remove for production

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$url = 'http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=' . $_REQUEST['country'] . '&maxRows=10&username=sohailparwany&style=full';
// $url = 'http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=Italy&maxRows=10&username=sohailparwany&style=full';


$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);
for ($i = 0; $i < count($decode["geonames"]); $i++) {
    if ($decode["geonames"][$i]["title"] == str_replace("%20", " ", $_REQUEST['country'])) {
        // if ($decode["geonames"][$i]["title"] == str_replace("%20", " ", "Italy")) {
        $decode['geonames'] = $decode["geonames"][$i];
        break;
    }
}


// echo $decode['geonames'][0]['wikipediaUrl'];

$output['status'] = "200";
$output['data'][0] = $decode['geonames'];


header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
