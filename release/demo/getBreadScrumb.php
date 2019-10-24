<?php

header("Access-Control-Allow-Origin: *");

$prep = [
		"link" => 'http://localhost:5500/project/list.html',
		"name" => 'Project Assignment'
	];

	echo json_encode($prep);
	return 0;


