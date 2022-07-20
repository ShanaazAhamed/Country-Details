<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$json = file_get_contents('countryBorders.geo.json');
$json_data = json_decode($json, true);
// print_r($json_data['features'][0]['properties']);


for ($i = 0; $i < count($json_data['features']); $i++) {
    $output[$json_data['features'][$i]['properties']['iso_a2']] = $json_data['features'][$i]['properties']['name'];
    // $geoJson[$json_data['features'][$i]['properties']['iso_a2']] = $json_data['features'][$i];
    // print_r($output[$i]);
}
asort($output);



echo json_encode($output);
header('Content-Type: application/json; charset=UTF-8');
