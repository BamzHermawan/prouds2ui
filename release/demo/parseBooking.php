<?php
header("Access-Control-Allow-Origin: *");

$content  = file_get_contents("./dummy/userBooking.json");
$resource = json_decode($content);

$prep = json_decode('{}');
foreach ($resource as $batch) {
	$id = $batch->batchId;
	unset($batch->batchId);
	$prep->{$id} = $batch;
}

echo json_encode($prep);