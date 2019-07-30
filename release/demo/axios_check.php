<?php

header("Access-Control-Allow-Origin: *");

echo json_encode([
	"post" => $_POST,
	"get" => $_GET
]);