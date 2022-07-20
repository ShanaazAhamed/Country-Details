<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$json = file_get_contents('countryBorders.geo.json');
$json_data = json_decode($json, true);


for ($i = 0; $i < count($json_data['features']); $i++) {
    if ($json_data['features'][$i]['properties']['iso_a2'] == $_REQUEST['country']) {
        // if ($json_data['features'][$i]['properties']['iso_a2'] == 'AR') {
        $output['geoJson'] = $json_data['features'][$i];
    }
}


echo json_encode($output);
// header('Content-Type: application/json; charset=UTF-8');
