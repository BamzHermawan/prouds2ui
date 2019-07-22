<?php

if(empty($_GET['nik'])){
	header("Location: https://picsum.photos/" . rand(480, 960));
	die();
}else if($_GET['nik'] == 'CRS2019119'){
	header("Location: http://localhost:5501/media/useravatar/CRS2019119.jpg");
	die();
}else if($_GET['nik'] == 'CRS2019016'){
	header("Location: http://localhost:5501/media/useravatar/CRS2019000.jpeg");
	die();
}else{
	header("Location: https://placekitten.com/g/" . rand(480, 960));
	die();
}