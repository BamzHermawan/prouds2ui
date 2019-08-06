<?php

header("Access-Control-Allow-Origin: *");

$content  = file_get_contents("./resource.json");
$resource = json_decode($content);

$post = json_decode(file_get_contents("php://input"));
$cooked = [
	"batchId" => rand(1, 5),
	"resource" => []
];

foreach ($post->users as $user) {
	$found = array_search($user, array_column($resource, 'userId'));
	if($found !== FALSE){
		$cook = [
			"userId" => $resource[$found]->userId,
			"name" => $resource[$found]->name,
			"bu" => $resource[$found]->bu,
			"bookedDate" => $resource[$found]->bookedDate,
			"freeDate" => $resource[$found]->freeDate,
			"isBooked" => rand(0, 1) === 0
		];

		$cooked["resource"][] = $cook;
	}
}

echo json_encode($cooked);