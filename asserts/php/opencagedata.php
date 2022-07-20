<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
// echo $_REQUEST('lat');

// $url = 'https://api.opencagedata.com/geocode/v1/json?q=7%2C80&key=045c8051e51c4de199262f7156f521fd&language=en&pretty=1';
$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $_REQUEST['lat'] . '%2C%20' . $_REQUEST['lng'] . '&key=045c8051e51c4de199262f7156f521fd&language=en&pretty=1';
// $url = 'https://api.opencagedata.com/geocode/v1/json?q=6.9016086%2C%2080.0087746&key=045c8051e51c4de199262f7156f521fd&language=en&pretty=1';
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);
// echo  strtoupper($decode['results'][0]['components']['country_code']);



if ($decode['status']['code'] === 200) {
    $output['status'] = "200";
    // $output['country'] = $decode['results'][0]['components']['country'];
    $output['countryCode'] = strtoupper($decode['results'][0]['components']['country_code']);
    // $output['currency'] = $decode['results'][0]['currencyCode']['country'];
} else {
    $output['status'] = "400";
}
header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);


// $result = $geocoder->geocode('41.40139, 2.12870'); # latitude,longitude (y,x)
// print $result['results'][0]['components']['country'];
// # 3 Rue de Rivarol, 30020 Nîmes, France
