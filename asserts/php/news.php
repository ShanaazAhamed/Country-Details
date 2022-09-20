<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);
// echo $_REQUEST('lat');
$key = '9ead35c0b5444ce38d2384975e746f09';

$url = 'https://newsapi.org/v2/top-headlines?country=' . $_REQUEST['countryCode'] . '&category=business&apiKey=' . $key;
// $url='https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9ead35c0b5444ce38d2384975e746f09';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_USERAGENT, "country detials");

$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);




if ($decode['status'] === 'ok') {
    $output['status'] = "200";
    $output['totalResults'] = $decode['totalResults'];
    $output['articals'] = $decode['articles'];
    // $output['countryCode'] = strtoupper($decode['results'][0]['components']['country_code']);
} else {
    $output['status'] = "400";
}
header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);


// $result = $geocoder->geocode('41.40139, 2.12870'); # latitude,longitude (y,x)
// print $result['results'][0]['components']['country'];
// # 3 Rue de Rivarol, 30020 Nîmes, France
