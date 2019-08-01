<?php

header("Access-Control-Allow-Origin: *");

$content  = file_get_contents("./resource.json");
$resource = json_decode($content);
$iterate = 500;
$prep = array();
$filter = [
	"role" => empty($_GET['role']) ? '': $_GET['role'],
	"level" => empty($_GET['level']) ? '': $_GET['level'],
	"skill" => empty($_GET['skill']) ? '': $_GET['skill'],
	"cert" => empty($_GET['cert']) ? '': $_GET['cert'],
];

if(!empty($_GET)){
	foreach ($resource as $staff) {
		$checker = false;
		if($staff->testFilter->skill == $filter["skill"]){
			$checker = true;
		}

		if($staff->testFilter->role == $filter["role"]){
			$checker = true;
		}

		if($staff->testFilter->level == $filter["level"]){
			$checker = true;
		}

		if($staff->testFilter->cert == $filter["cert"]){
			$checker = true;
		}

		if($checker){
			$prep[] = $staff;
		}

		if(count($prep) >= $iterate){
			break;
		}
	}
}else{
	$prep = array_slice($resource, 0, $iterate);
}

echo json_encode($prep);