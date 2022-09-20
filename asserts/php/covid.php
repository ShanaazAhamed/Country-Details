<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);
// echo $_REQUEST('lat');

// $url = 'https://corona.lmao.ninja/v2/countries/' . $_REQUEST['countryCode'] . '?yesterday&strict&query';
$url = 'https://api.covid19api.com/total/country/' . $_REQUEST['countryCode'];
// $url = 'https://api.covid19api.com/total/country/lk';

// $url = 'https://corona.lmao.ninja/v2/countries/Italy?yesterday&strict&query';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);


$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);

header('Content-Type: application/json; charset=UTF-8');

echo json_encode(end($decode));


// $result = $geocoder->geocode('41.40139, 2.12870'); # latitude,longitude (y,x)
// print $result['results'][0]['components']['country'];
// # 3 Rue de Rivarol, 30020 Nîmes, France
