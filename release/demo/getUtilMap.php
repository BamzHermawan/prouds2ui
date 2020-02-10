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
	$week = 1;
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
		$alertWeek = "0" + rand(1, 3);
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

if ($_GET['get'] == "complience") {
	$total = $_GET['total'];
	$start = explode('/', $_POST['start']);
	$end = explode('/', $_POST['end']);

	$temp = [];
	$week = 1;
	if (intval($start[2]) < intval($end[2])) {
		for ($y=intval($start[2]); $y <= intval($end[2]); $y++) { 
			for ($m=intval($start[1]); $m <= intval($end[1]) ; $m++) { 
				$days = date("t", mktime(0, 0, 0, $m, 1, $y));
				for ($d=1; $d <= $days; $d++) { 
					$temp[] = (Object) [
						"date" => date("d/m/Y", mktime(0,0,0, $m, $d, $y)),
						"alertWeek" => date("W", mktime(0,0,0, $m, $d, $y)),
						"value" => 0,
					];
				}
			}
		}
	} else {
		for ($m=intval($start[1]); $m <= intval($end[1]) ; $m++) { 
			$days = date("t", mktime(0, 0, 0, $m, 1, intval($end[2])));
			for ($d=1; $d <= $days; $d++) { 
				$temp[] = [
					"date" => date("d/m/Y", mktime(0,0,0, $m, $d, intval($end[2]))),
					"week" => date("W", mktime(0,0,0, $m, $d, intval($end[2]))),
					"alert" => false,
					"value" => 0,
				];
			}
		}
	}

	$cooked = [];
	$weekly = [];

	$endTime = mktime(0,0,0, intval($end[1]), intval($end[0]), intval($end[2]));
	$startTime = mktime(0,0,0, intval($start[1]), intval($start[0]), intval($start[2]));
	for ($i=0; $i < $total; $i++) { 
		for ($j=0; $j < count($temp); $j++) { 
			$hour = 8;
			$randomize = rand(0, 8);
			if ($randomize >= 7) {
				$hour = rand(0, 5);
			}

			if (array_key_exists($temp[$j]['week'], $weekly)) {
				$weekly[$temp[$j]['week']]['sum'] += $hour;
				$weekly[$temp[$j]['week']]['count']++;
			} else {
				$weekly[$temp[$j]['week']]['sum'] = $hour;
				$weekly[$temp[$j]['week']]['count'] = 1;
			}

			$temp[$j]['value'] = $hour;
		}

		$cook = [];
		for ($j=0; $j < count($temp); $j++) { 
			$thisDate = explode('/', $temp[$j]["date"]);
			$thisTime = mktime(0,0,0, intval($thisDate[1]), intval($thisDate[0]), intval($thisDate[2]));

			if ($endTime >= $thisTime && $thisTime >= $startTime) {
				$sum = $weekly[$temp[$j]['week']]['sum'] < 40;
				$count = $weekly[$temp[$j]['week']]['count'];
				$temp[$j]['alert'] = $sum && ($count == 7);

				$cook[] = $temp[$j];
			}
		}

		$cooked[$i] = [
			"nik" => $data[$i]->nik,
			"score" => $cook
		];

		$weekly = [];
	}

	echo json_encode($cooked);
}

// Timesheet Week Map
if ($_GET['get'] == "weekMap") {
	$json = file_get_contents("./dummy/timesheetComplience.json");
	$weekMap = json_decode($json);

	$year = $_GET['year'];
	for ($i=0; $i < count($weekMap); $i++) { 
		$month = explode("/", $weekMap[$i]->month);
		$start = explode("/", $weekMap[$i]->start);
		$end = explode("/", $weekMap[$i]->end);

		$weekMap[$i]->month = implode("/", [$month[0], $year]);
		$weekMap[$i]->start = implode("/", [$start[0], $start[1], $year]);
		$weekMap[$i]->end = implode("/", [$end[0], $end[1], $year]);
	}

	echo json_encode($weekMap);
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