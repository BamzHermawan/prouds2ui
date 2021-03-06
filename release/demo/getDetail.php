<?php

header("Access-Control-Allow-Origin: *");

$content  = file_get_contents("./dummy/resource.json");
$resource = json_decode($content);

if(!empty($_GET["userId"])){
	$found = array_search($_GET["userId"], array_column($resource, 'userId'));
	if($found !== FALSE){
		$prep = [
			"userId" => $resource[$found]->userId,
			"skills" => $resource[$found]->skills,
			"competency" => $resource[$found]->competency,
			"course" => $resource[$found]->course,
			"workload" => rand(1, 10) . " Projects",
		];

		echo json_encode($prep);
		return 0;
	}
}
