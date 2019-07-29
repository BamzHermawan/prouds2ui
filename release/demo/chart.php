<?php
header("Access-Control-Allow-Origin: *");

	$ran = rand(1,100);
	if(isset($_GET['entry'])){
		$array['entry'] = [
			[
				"Entry", $ran
			],
			[
				"Empty", (100-$ran)
			]
		];
	}
	if(isset($_GET['utilization'])){
		$array['utilization'] = [
			[
				"utilization", $ran
			],
			[
				"Empty", (100-$ran)
			]
		];
	}
	echo json_encode($array);
