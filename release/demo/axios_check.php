<?php

header("Access-Control-Allow-Origin: *");

echo json_encode([
	"post" => $_POST,
	"get" => $_GET,
	"input" => json_decode(file_get_contents("php://input"))
]);