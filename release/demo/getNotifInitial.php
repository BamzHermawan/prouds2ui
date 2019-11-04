<?php
header("Access-Control-Allow-Origin: *");
if(!empty($_GET["project_id"])){
	$prep = "";
	echo json_encode($prep);
	return 0;
}
