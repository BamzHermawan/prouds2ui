<?php

header("Access-Control-Allow-Origin: *");
if(!empty($_GET["task_id"])){
	$content = file_get_contents("./resourceWorkplan.json");
	echo $content;
}


