<?php 

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$TASK_TOTAL = 20;
$WEEK_TOTAL = 48;

function randProgress($sum, $single = false) {
	$progress = [];
	
	if (!$single) {
		for ($i=0; $i < $sum; $i++) { 
			$progress[$i] = [
				'plan' => rand(100, 10000) / 100,
				'actual' => rand(100, 10000) / 100
			];
		}
	} else {
		for ($i=0; $i < $sum; $i++) { 
			$progress[$i] = rand(100, 10000) / 100;
		}
	}

	return $progress;
}

if ($_GET['get'] == 'table') {
	// ambil dummy data performance index table
	$json = file_get_contents("./dummy/pIndexTable.json");
	$parsed = json_decode($json);

	if(!empty($_GET['week_start']) && !empty($_GET['week_end'])) {
		$count = intval($_GET['week_end']) - intval($_GET['week_start']);
		$parsed->total_weekly_progress = randProgress($count);
		$parsed->delta_progress = randProgress($count, true);
		$parsed->sigma_progress = randProgress($count);

		$parsed->week_count = $count;
		$parsed->week_start = intval($_GET['week_start']);
		$parsed->week_end = intval($_GET['week_end']);

		for ($key=0; $key < count($parsed->task); $key++) { 
			$parsed->task[$key]->weekly_progress = randProgress($count);
		}
	}

	echo json_encode($parsed);
	return 0;
} 

if ($_GET['get'] == 'tasks') {
	// ambil dummy data performance index table
	$json = file_get_contents("./dummy/tasks.json");
	$parsed = json_decode($json);

	$project_id = empty($_GET['project_id']) ? $parsed->project_id : $_GET['project_id'];
	$tasks = $parsed->tasks;
	$cooked = [];

	if (!empty($_GET['limit'])) {
		$limit = $_GET['limit'] < $TASK_TOTAL ? $TASK_TOTAL : $_GET['limit'];
		$tasks = array_slice($tasks, 0, $limit);
	} else {
		$tasks = array_slice($tasks, 0, $TASK_TOTAL);
	}

	if (!empty($_POST['parent'])) {
		shuffle($tasks);
		$limiting = rand(5, count($tasks) - 1);

		$cook = [];
		for ($i=0; $i < $limiting; $i++) {
			$tasks[$i]->id = $_POST['parent'].'-'.$i;
			$tasks[$i]->parent = $_POST['parent'];
			$cook[] = $tasks[$i];
		}

		$cooked['project_id'] = $project_id;
		$cooked['parent'] = $_POST['parent'];
		$cooked['tasks'] = $cook;
	} else {
		$limiting = rand(4, 6);
		$start = rand(1, 2);
		$parent = [];
		for ($i=0; $i < count($tasks); $i++) { 
			$tasks[$i]->id = $project_id . '-' . $i;

			if ($i > $start) {
				shuffle($parent);
				$tasks[$i]->parent = $parent[0]['id'];
				$tasks[$parent[0]['index']]->hasChild = TRUE;
			} else {
				$tasks[$i]->parent = NULL;
				$tasks[$i]->hasChild = TRUE;
			}

			$parent[] = [
				'id' => $tasks[$i]->id,
				'index' => $i
			];
		}

		$cooked['project_id'] = $project_id;
		$cooked['tasks'] = $tasks;
	}

	echo json_encode($cooked);
	return 0;
}

if ($_GET['get'] == 'weekly') {
	$json = file_get_contents("./dummy/tasks.json");
	$parsed = json_decode($json);

	$project_id = empty($_GET['project_id']) ? $parsed->project_id : $_GET['project_id'];
	$cooked = json_decode('{}');

	if(!empty($_POST['week_limit']) && !empty($_POST['tasks'])) {
		$count = intval($_POST['week_limit']);

		$cooked->week_count = $count;
		$cooked->week_start = intval($_POST['week_start']);
		$cooked->week_end = $cooked->week_start + (intval($_POST['week_limit']));
		if($cooked->week_end > $WEEK_TOTAL) {
			$count = $WEEK_TOTAL - $cooked->week_start;
			$cooked->week_end = $WEEK_TOTAL;
		};

		$cooked->week_total = $WEEK_TOTAL;
		$cooked->total = randProgress($count);
		$cooked->delta = randProgress($count, true);
		$cooked->sigma = randProgress($count);

		$tasks = $_POST['tasks'];
		$cooked->tasks = array();
		for ($i=0; $i < count($tasks); $i++) { 
			$prep['id'] = $tasks[$i];
			$prep['weekly'] = randProgress($count);

			$cooked->tasks[$i] = $prep;
		}

		echo json_encode($cooked);
		return 0;
	} else {
		http_response_code(400);
		echo "Required Property is not found";
		return 0;
	}
}

if ($_GET['get'] == 'chart') {
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

	return 0;
} 

if ($_GET['get'] == 'falling') {
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

	return 0;
}

echo json_encode($_GET);