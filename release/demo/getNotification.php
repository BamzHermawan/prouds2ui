<?php
header("Access-Control-Allow-Origin: *");
if(!empty($_GET["user_id"])){
	$prep = [
		[
			"notif" => "1"
		],
		[
			"notif" => "2"
		],
		[
			"notif" => "3"
		],
		[
			"notif" => "4"
		],
		[
			"notif" => "5"
		],
		[
			"notif" => "6"
		],
		[
			"notif" => "7"
		],
		[
			"notif" => "8"
		],
		[
			"notif" => "9"
		],
		[
			"notif" => "10"
		],
		[
			"notif" => "11"
		],
		[
			"notif" => "12"
		],
		[
			"notif" => "13"
		],
		[
			"notif" => "14"
		],
		[
			"notif" => "15"
		]
	];
	echo json_encode($prep);
	return 0;
}
