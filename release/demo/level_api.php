<?php
header("Access-Control-Allow-Origin: *");

$role = strtolower($_GET['role']);
if(empty($_GET['role'])){
	echo json_encode([
		'error' => 'No Data Role Found in Request, please provide which role.'
	]);
}else if(strpos($role, "senior") === false && strpos($role, "junior") === false){
	echo '["Junior","Senior","Intermediate","Advance","Beginner","Fresh-Graduate", "Master"]';
}else{
	// echo json_encode(array());
}