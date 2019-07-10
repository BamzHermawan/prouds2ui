<template>
	<div class="loginPage">
		<section
			class="banner"
			:style="'background-image: url(' + getAttr('bg-image') + ');'"
		>
			<div class="welcoming">
				<p>👋 Selamat Datang | Welcome Back 👋</p>
				<!-- <h1>PROUDS</h1>
				<p class="sub-title">
					Project Management and Resource Delivery System
				</p> -->
				<p class="has-text-centered">
					<img
						class="prouds-logo"
						src="../../../images/full-logo.png"
						alt="Prouds Logo"
					/>
				</p>
			</div>
			<div class="banner-footer">
				<p>
					Silakan Login Menggunakan Akun Email Sigma.co.id Anda Untuk
					Dapat Mengakses PROUDS.
				</p>
			</div>
		</section>
		<section class="form">
			<login-form
				:emailName="getAttr('emailName')"
				:passwordName="getAttr('passwordName')"
				:action="getAttr('action')"
				:loginAlert="getAttr('loginAlert')"
			/>
		</section>
	</div>
</template>

<style lang="scss">
@import "../../../styles/_variable.scss";

.prouds-logo {
	width: 540px;
	margin-top: 15px;
}

.loginPage {
	display: grid;
	grid-template-columns: 1.5fr 0.5fr;
	width: 100%;
	height: 100vh;
	justify-items: center;
	background-color: lighten($primary, 5%);

	section {
		align-self: center;
		width: 70%;

		&.banner {
			background-size: cover;
			background-position-x: center;
			background-blend-mode: color-burn;
			margin: 0px;
			height: 100%;
			width: 100%;

			display: grid;
			grid-template-rows: 1fr 45px;
			justify-items: center;

			.welcoming {
				align-self: center;
				width: 100%;
				display: grid;

				h1 {
					$sizing: 7em;

					font-family: $h2_font;
					text-align: center;
					font-size: $sizing;
					line-height: ($sizing + 1em) / 10;
					margin: 0px;
					margin-top: 10px;
				}

				p {
					font-family: $p_font;
					text-align: center;
					font-size: 1.5em;
					margin-bottom: 0px;
					color: $warning;
					font-weight: bold;
					text-shadow: 2px 3px 1px #333;

					&.sub-title {
						font-size: 1em;
					}
				}
			}

			.banner-footer {
				align-self: end;
				background-color: lighten($warning, 10%);
				width: 100%;
				text-align: center;
				padding: 7px;
				font-weight: bold;
			}
		}
	}
}
</style>

<script>
import loginForm from "../components/loginForm";

const APP_EL = document.getElementById("vapp");
export default {
	components: {
		loginForm
	},
	methods: {
		getAttr(attrName) {
			return APP_EL.getAttribute(attrName);
		}
	}
};
</script>

