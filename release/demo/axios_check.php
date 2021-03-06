<?php

header("Access-Control-Allow-Origin: *");

if (!empty($_GET['dum'])) {
	echo file_get_contents("./dummy/".$_GET['dum'].".json");
	return 1;
}

if(!empty($_GET['scopework_add'])) {
	if($_GET['scopework_add'] == '404') {
		http_response_code(404);
		echo json_encode([
			"status" => false,
			"message" => 'Some message to deliver'
		]);
	} else {
		$prep = explode("-", $_GET['scopework_add']);
		echo json_encode([
			"status" => true,
			"scope_id" =>  rand($prep[0], $prep[1])
		]);
	}
	return 1;
}

if(!empty($_GET['return'])){
	$prep = explode("-", $_GET['return']);
	if($prep[0] === "integer" && count($prep) == 4){
		$min = $prep[1];
		$max = $prep[2];
		$cooked[$prep[3]] = rand($min, $max);
		echo json_encode($cooked);
	}if($prep[0] === "false" && count($prep) === 2){
		echo json_encode([
			"status" => false,
			"message" => $prep[1]
		]);
	}if($_GET['return'] == '404'){
		http_response_code(404);
		echo json_encode([
			"status" => false,
			"message" => 'Some message to deliver'
		]);
	}if($_GET['return'] == '200'){
		http_response_code(200);
		echo json_encode([
			"status" => true,
			"message" => 'Some message to deliver'
		]);
	}else{
		echo json_encode([
			"status" => true,
			"warning" => rand(0, 1) === 0,
			"message" => "Success Fetching Data"
		]);
	}
}else{
	echo json_encode([
		"post" => $_POST,
		"get" => $_GET,
		"file" => $_FILES,
		"input" => json_decode(file_get_contents("php://input"))
	]);
}
