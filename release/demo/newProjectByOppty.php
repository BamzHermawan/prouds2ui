<?php

header("Access-Control-Allow-Origin: *");

$json = file_get_contents("./dummy/oppty_to_project.json");
$oppty = json_decode($json);

if (!empty($_GET['id']) && !empty($_GET['year'])) {
	$id = $_GET['id'];
	$year = $_GET['year'];

	foreach ($oppty as $row) {
		if ($row->oppty_id == $id && $row->oppty_year == $year) {
			$result = [];
			$result['oppty_id'] = $row->oppty_id;
			$result['oppty_year'] = $row->oppty_year;
			$result['name'] = $row->name;
			$result['customer'] = $row->customer;

			$rand = rand(0, 1);
			$result['start_date'] = $rand == 1 ? $row->date->start:null;
			$result['end_date'] = $rand == 1 ? $row->date->end:null;

			$rand = rand(0, 1);
			$result['description'] = $rand == 1 ? $row->description:null;

			header("Content-type: application/json");
			echo json_encode($result);
			return 0;
		}
	}
}

http_response_code(404);
echo json_encode([
	"status" => false,
	"message" => "No Data Found"
]);