<?php
header("Access-Control-Allow-Origin: *");
if(!empty($_POST)){

	$current = DateTime::createFromFormat('d/m/Y', $_POST['start']);

	$end = DateTime::createFromFormat('d/m/Y', $_POST['end']);
	$today = new DateTime('now');
	if($today < $end){
		$end = $today;
	}

	$cook = [];
	while($current < $end){
		if(rand(0,1) == 1){
			$cook[] = $current->format('d/m/Y');
		}

		$current->modify('+1 day');
	}

	echo json_encode($cook);
}else{
	echo "no data post found";
}