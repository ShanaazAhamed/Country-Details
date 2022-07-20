<?php


ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);
// echo $_REQUEST($_REQUEST['code']);


$url = 'http://api.geonames.org/wikipediaBoundingBoxJSON?formatted=true&north=' . $_REQUEST['north'] . '&south=' . $_REQUEST['south'] . '&east=' . $_REQUEST['east'] . '&west=' . $_REQUEST['west'] . '&username=sohailparwany&style=full';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);
$list = array();
$country = "";

for ($i = 0; $i < count($decode["geonames"]); $i++) {
    if (isset($decode["geonames"][$i]['countryCode'])) {
        if ($decode["geonames"][$i]['countryCode'] == $_REQUEST["countryCode"]) {

            $nlist = array();
            $nlist['lat'] = $decode["geonames"][$i]['lat'];
            $nlist['lng'] = $decode["geonames"][$i]['lng'];
            $nlist['title'] = $decode["geonames"][$i]['title'];
            $nlist['url'] = $decode["geonames"][$i]['wikipediaUrl'];
            $nlist['summary'] = $decode["geonames"][$i]['summary'];
            array_push($list, $nlist);
        }
    }
}

$output['status'] = "200";
$output['data'] = $list;


header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
