<?php

header("Access-Control-Allow-Origin: *");
if(!empty($_GET["task_id"])){
	$content = file_get_contents("./dummy/teamWorkplan.json");
	echo $content;
}


