<?php
header("Access-Control-Allow-Origin: *");
$content = file_get_contents("./dummy/notification.json");

echo $content;
