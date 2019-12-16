<?php header("Access-Control-Allow-Origin: *");

if ($_GET['get'] == 'table') {
	// ambil dummy data performance index table
	echo file_get_contents("./dummy/pIndexTable.json");
} else if ($_GET['get'] == 'chart') {
	// ambil dummy data performance index chart

	$chart = [
		"plan" => NULL,
		"actual" => NULL,
		"sigma_plan" => NULL,
		"sigma_actual" => NULL,
		"gap" => NULL
	];

	foreach (array_keys($chart) as $key) {
		for ($i=0; $i < 48; $i++) { 
			$chart[$key][] = rand(100, 10000) / 100;
		}
	}

	echo json_encode($chart);

	// ambil dummy data performance index table
	// echo file_get_contents("./dummy/pIndexChart.json");
} else if ($_GET['get'] == 'falling') {
	$json = file_get_contents("./dummy/pIndexFalling.json");
	$parsed = json_decode($json);

	$project_id = empty($_GET['project_id']) ? $parsed->project_id:$_GET['project_id'];
	$task_id = empty($_GET['task_id']) ? $parsed->project_id:$_GET['task_id'];
	$list_member = [];

	$member_total = 10;
	$members = $parsed->members;
	shuffle($members);

	for ($i=0; $i < $member_total; $i++) { 
		$list_member[] = $members[$i];
	}

	echo json_encode([
		"project_id" => $project_id,
		"task_id" => $task_id,
		"members" => $list_member
	]);
} else {
	// lempar get data untuk debug test
	echo json_encode($_GET);
}