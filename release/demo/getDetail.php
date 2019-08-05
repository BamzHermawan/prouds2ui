<?php

header("Access-Control-Allow-Origin: *");

$content  = file_get_contents("./resource.json");
$resource = json_decode($content);

if(!empty($_GET["userId"])){
	$found = array_search($_GET["userId"], array_column($resource, 'userId'));
	if($found !== FALSE){
		$prep = [
			"userId" => $resource[$found]->userId,
			"skills" => $resource[$found]->skills,
			"competency" => $resource[$found]->competency,
			"course" => $resource[$found]->course,
		];

		echo json_encode($prep);
		return 0;
	}
}

echo json_encode([
	"status" => FALSE
]);