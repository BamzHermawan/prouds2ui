<?php

header("Access-Control-Allow-Origin: *");

if(!empty($_GET["start"]) && !empty($_GET["finish"]) && !empty($_GET["workdays"])){
	$prep = [
		"duration" => rand(10, 50)
	];

	echo json_encode($prep);
	return 0;
}

