<?php
header("Access-Control-Allow-Origin: *");
$content = file_get_contents("./notification.json");

echo $content;
