<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

define('UNDER', 8);

$content = file_get_contents("./dummy/utilizationMap.json");
$data = json_decode($content);

if (empty($_GET)) {
	echo "Please provide needed data";
	return 0;
}

if ($_GET['get'] == 'users') {
	$total = $_GET['total'];
	$cooked = [];

	for ($i=0; $i < $total; $i++) { 
		$cooked[$i] = [
			"nik" => $data[$i]->nik,
			"name" => $data[$i]->name,
			"status" => $data[$i]->status,
			"assignment" => $data[$i]->assignment,
			"submited" => $data[$i]->submited,
			"approved" => $data[$i]->approved
		];
	}

	echo json_encode($cooked);
	return 0;
}

if ($_GET['get'] == "map") {
	$total = $_GET['total'];
	$start = explode('/', $_POST['start']);
	$end = explode('/', $_POST['end']);

	$temp = [];
	if (intval($start[1]) < intval($end[1])) {
		for ($y=intval($start[1]); $y <= intval($end[1]); $y++) { 
			for ($m=intval($start[0]); $m <= intval($end[0]) ; $m++) { 
				$days = date("t", mktime(0, 0, 0, $m, 1, $y));
				for ($d=1; $d <= $days; $d++) { 
					$temp[] = (Object) [
						"date" => date("d/m/Y", mktime(0,0,0, $m, $d, $y)),
						"isWarning" => false,
						"underUtil" => false,
						"value" => 0,
					];
				}
			}
		}
	} else {
		for ($m=intval($start[0]); $m <= intval($end[0]) ; $m++) { 
			$days = date("t", mktime(0, 0, 0, $m, 1, intval($end[1])));
			for ($d=1; $d <= $days; $d++) { 
				$temp[] = [
					"date" => date("d/m/Y", mktime(0,0,0, $m, $d, intval($end[1]))),
					"isWarning" => false,
					"underUtil" => false,
					"value" => 0,
				];
			}
		}
	}

	$cooked = [];
	for ($i=0; $i < $total; $i++) { 
		for ($j=0; $j < count($temp); $j++) { 
			$hour = 8;
			$randomize = rand(0, 9);
			if ($randomize == 0) {
				$hour = rand(0, 7);
			} else if($randomize >= 8) {
				$hour = rand(9, 12);
			}

			$temp[$j]['value'] = $hour;
			$temp[$j]['isWarning'] = rand(0, 9) > 7;
			$temp[$j]['underUtil'] = $hour < UNDER;
		}

		$cooked[$i] = [
			"nik" => $data[$i]->nik,
			"score" => $temp
		];
	}

	echo json_encode($cooked);
}

if ($_GET['get'] == "detail") {
	$nik = $_POST['nik'];
	$date = $_POST['date'];

	// this data is not required on actual api. dev only;
	$workhour = $_POST['workhour'];

	$json = file_get_contents("./dummy/utilizationMap.detail.json");
	$detail = json_decode($json);

	$total_work = rand(1, 4);
	shuffle($detail);

	$cooked = [];
	$allTrue = true;
	if ($total_work > 1) {
		for ($i=0; $i < $total_work; $i++) { 
			if ($i < $total_work - 1) {
				$thisHour = rand(1, intval($workhour)/2);
				$workhour -= $thisHour;
			} else {
				$thisHour = $workhour;
			}

			$cooked[$i] = $detail[$i];
			$cooked[$i]->workhour = $thisHour;
			if($cooked[$i]->status && $allTrue)  {
				if ($i == $total_work - 1) {
					$cooked[$i]->status = false;
				}
			} else {
				$allTrue = false;
			}
		}
	} else {
		$cooked[0] = $detail[0];
		$cooked[0]->status = false;
		$cooked[0]->workhour = $workhour;
	}

	echo json_encode($cooked);
}