<?php
header("Access-Control-Allow-Origin: *");

	if(isset($_GET['activity'])){
		$activity = array(
			"title" => "test",
			"subtitle" => "@adewiranata - 11 juli 19 : 09.20", 
			"thumbnail"=> "http://localhost:5501/demo/user_avatar.php?nik=random3", 
			"body"=> "Lorem Ipsum dolar ipsem"
		);
	}

	echo json_encode($activity);
