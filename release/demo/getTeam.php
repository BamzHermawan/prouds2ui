<?php

header("Access-Control-Allow-Origin: *");
if(!empty($_GET["task_id"])){
	$content = file_get_contents("./team.json");
	echo $content;
}


