<?php
	if(empty($_POST)) {
		header("Location: http://localhost:5501/login/login.html");
		die();
	}else{
		$email = $_POST['emailUser'];
		$password = $_POST['passwordUser'];
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>PHP Login Demo</title>

	<link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css">
</head>
<body>
	<section class="hero is-fullheight is-primary is-bold">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">
					This is demo PHP Login
				</h1>
				<h2 class="subtitle">
					Login credentials is succesfully catched!
				</h2>

				<br>

				<p class="is-size-5" style="margin-bottom: 7px;">Catched Login Email</p>
				<p class="title is-size-4 has-text-warning">📧 <?php echo $email; ?></p>

				<br>

				<p class="is-size-5" style="margin-bottom: 7px;">Catched Login Password</p>
				<p class="title is-size-4 has-text-warning">🔒 <?php echo $password; ?></p>

				<br>

				<p class="is-size-4">Do you wish to continue to home ?</p>
				<a href="http://localhost:5501/pages/index.html" class="button is-success">Yes, to Home we go! ✊</a>
				<a href="http://localhost:5501/login/login.html" class="button is-warning">No, lets back to login form 🙅‍</a>
			</div>
		</div>
	</section>

</body>
</html>