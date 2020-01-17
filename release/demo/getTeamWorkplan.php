<?php

header("Access-Control-Allow-Origin: *");
if(!empty($_GET["task_id"])){
	$content = file_get_contents("./dummy/teamWorkplan.json");
	$data = json_decode($content);

	$total = rand(3, 20);
	echo json_encode(array_slice($data, 0, $total));
}


