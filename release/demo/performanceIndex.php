<?php header("Access-Control-Allow-Origin: *");

if($_GET['get'] == 'table'){
	// ambil dummy data performance index table
	echo file_get_contents("./dummy/pIndexTable.json");
} else if($_GET['get'] == 'chart') {
	// ambil dummy data performance index chart
	echo file_get_contents("./dummy/pIndexChart.json");
} else {
	// lempar get data untuk debug test
	echo json_encode($_GET);
}