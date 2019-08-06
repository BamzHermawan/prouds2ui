<?php

header("Access-Control-Allow-Origin: *");

$content  = file_get_contents("./resource.json");
$resource = json_decode($content);

if(!empty($_GET["userId"])){
	$found = array_search($_GET["userId"], array_column($resource, 'userId'));
	if($found !== FALSE){
		echo json_encode($resource[$found]);
	}else{
		echo json_encode([
			"status" => FALSE
		]);
	}
}
