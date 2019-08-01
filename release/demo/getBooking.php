<?php

header("Access-Control-Allow-Origin: *");

$content  = file_get_contents("./booking.json");
$resource = json_decode($content);
$iterate = 500;
$prep = array();

$prep = array_slice($resource, 0, $iterate);


echo json_encode($prep);