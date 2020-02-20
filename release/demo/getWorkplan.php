<?php 

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

define('TASK_TOTAL', 50);

// ambil dummy data performance index table
$json = file_get_contents("./dummy/workplan.json");
$tasks = json_decode($json);
$cooked = [];

$project_id = empty($_GET['project_id']) ? "WPT":$_GET['project_id'];
if (!empty($_GET['limit'])) {
	$limit = $_GET['limit'] < TASK_TOTAL ? TASK_TOTAL : $_GET['limit'];
	$tasks = array_slice($tasks, 0, $limit);
} else {
	$tasks = array_slice($tasks, 0, TASK_TOTAL);
}

shuffle($tasks);

$parent = [];
$start = rand(1, 4);
for ($i=0; $i < count($tasks); $i++) { 
	$tasks[$i]->id = $project_id . '-' . $i;

	if ($i > $start) {
		shuffle($parent);
		$tasks[$i]->parent = $parent[0]['id'];
		$tasks[$parent[0]['index']]->hasChild = TRUE;
	} else {
		$tasks[$i]->parent = NULL;
		$tasks[$i]->hasChild = FALSE;
	}

	$parent[] = [
		'id' => $tasks[$i]->id,
		'index' => $i
	];

	$cooked[$i] = $tasks[$i];
}

echo json_encode($cooked);