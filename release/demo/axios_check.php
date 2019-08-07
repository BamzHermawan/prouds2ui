<?php

header("Access-Control-Allow-Origin: *");

if(!empty($_GET['return'])){
	$prep = explode("-", $_GET['return']);
	if($prep[0] === "integer" && count($prep) == 4){
		$min = $prep[1];
		$max = $prep[2];
		$cooked[$prep[3]] = rand($min, $max);
		echo json_encode($cooked);
	}else{
		echo json_encode([
			"status" => true,
			"message" => "Success Fetching Data"
		]);
	}
}else{
	echo json_encode([
		"post" => $_POST,
		"get" => $_GET,
		"input" => json_decode(file_get_contents("php://input"))
	]);
}
