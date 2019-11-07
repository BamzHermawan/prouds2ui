<?php

header("Access-Control-Allow-Origin: *");

if(!empty($_POST["start"]) && !empty($_POST["finish"]) && !empty($_POST["workdays"])){
	$prep = [
		"duration" => rand(10, 50)
	];

	echo json_encode($prep);
	return 0;
}


