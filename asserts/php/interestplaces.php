<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
// echo $_REQUEST('lat');


$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $_REQUEST['country'] . '&key=045c8051e51c4de199262f7156f521fd&language=en&pretty=1';
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);
// echo $result;
// print_r($decode);
$list = array();

if ($decode['status']['code'] == "200") {

    for ($i = 0; $i < count($decode['results']); $i++) {
        if ($decode['results'][$i]['components']['country_code'] == strtolower($_REQUEST['countryCode'])) {
            $nlist = $decode['results'][$i]['geometry'];
            $nlist['desc'] = $decode['results'][$i]['formatted'];
            array_push($list, $nlist);
        };
    }
}



if ($decode['status']['code'] === 200) {
    $output['status'] = "200";
    $output['data'] = $list;
} else {
    $output['status'] = "400";
}

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
