<?php header("Access-Control-Allow-Origin: *");

$users = [
	[
		"nik" => "CRSXXXXXX1",
		"nama" => "Ade Wiranta Putra",
		"avatar" => "http://localhost:5501/demo/user_avatar.php",
		"userBU" => "Project Management Office"
	],
	[
		"nik" => "CRSXXXXXX2",
		"nama" => "Zeid bin Zubair",
		"avatar" => "http://localhost:5501/demo/user_avatar.php",
		"userBU" => "Project Management Office"
	],
	[
		"nik" => "CRSXXXXXX3",
		"nama" => "Boy",
		"avatar" => "http://localhost:5501/demo/user_avatar.php",
		"userBU" => "Project Management Office"
	],
	[
		"nik" => "CRSXXXXXX4",
		"nama" => "Zaid Makmur Jaya",
		"avatar" => "http://localhost:5501/demo/user_avatar.php",
		"userBU" => "Project Management Office"
	],
	[
		"nik" => "CRSXXXXXX5",
		"nama" => "Ario Widiatmoko",
		"avatar" => "http://localhost:5501/demo/user_avatar.php",
		"userBU" => "Project Management Office"
	],
];

if(!empty($_GET['nik'])){
	foreach($users as $user) {
		if ($_GET['nik'] == $user['nik']) {
			echo json_encode($user);
			break;
		}
	}
}else{
	shuffle($users);
	echo json_encode(end($users));
}
