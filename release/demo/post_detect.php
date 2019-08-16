<?php
header("Access-Control-Allow-Origin: *");
if(!empty($_POST)){
	$return['POST'] = $_POST;
	$status = 'is-success';
}else{
	$return['POST'] = [ 'error' => 'No Post Data Found'];
	$status = 'is-danger';
}

if(!empty($_GET)){
	$return['GET'] = $_GET;
}

if(!empty($_FILES)){
	$return['FILES'] = $_FILES;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>POST DETECT</title>
	<link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css">
	<style>
		.has-text-warning {
			color: #e4c23c!important;
		}
	</style>
</head>
<body>
	<section class="hero is-fullheight <?php echo $status;?> is-bold">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">
					This is for detecting PHP Form POST
				</h1>
				<h2 class="subtitle">
					<?php if($status == 'is-success'){
						echo "POST DATA DETECTED 😁";
					}else {
						echo "POST DATA NOT FOUND 😭";
					} ?>
				</h2>

				<br>

				<article class="message is-success">
					<div class="message-body">
						<pre id="json-container"></pre>
					</div>
				</article>
			</div>
		</div>
	</section>
	<script>
		function syntaxHighlight(json) {
			json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
				var cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'has-text-info';
					} else {
						cls = 'has-text-warning';
					}
				} else if (/true|false/.test(match)) {
					cls = 'has-text-primary';
				} else if (/null/.test(match)) {
					cls = 'has-text-primary';
				} else if (/[0-9]/.test(match)) {
					cls = 'has-text-danger';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			});
		}

		var json = <?php echo json_encode($return);?>;
		var str = JSON.stringify(json, undefined, 4);
		document.getElementById('json-container').innerHTML = syntaxHighlight(str);
	</script>
</body>
</html>