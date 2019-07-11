<template>
	<div class="loginPage">
		<section
			class="banner"
			:style="'background-image: url(' + getAttr('bg-image') + ');'"
		>
			<div class="welcoming">
				<p class="is-hidden-mobile">
					👋 Selamat Datang | Welcome Back 👋
				</p>
				<!-- <h1>PROUDS</h1>
				<p class="sub-title">
					Project Management and Resource Delivery System
				</p> -->
				<p class="has-text-centered">
					<img
						class="prouds-logo"
						:src="logo.prouds"
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
				class="login-form"
			/>
		</section>
		<img
			class="logo-telkomsigma"
			:src="logo.sigma"
			alt="Logo Telkomsigma"
		/>
		<b-notification
			class="con-alert has-text-centered"
			type="is-info"
			role="alert"
			:closable="false"
			v-if="!iconn"
		>
			😢 Sepertinya koneksi internet anda telah terputus, mohon untuk
			menghubungkan komputer anda ke koneksi internet dengan koneksi yang
			stabil. terimakasih 👍.
		</b-notification>
	</div>
</template>

<style lang="scss">
@import "../../../styles/_variable.scss";

.prouds-logo {
	width: 40%;
	margin-top: 15px;
}

.logo-telkomsigma {
	position: fixed;
	bottom: 10px;
	width: 150px;
	right: 10px;
}

.con-alert {
	position: fixed;
	top: 0px;
	width: 100% - 10%;
	margin: 1% 5%;
	padding: 10px 15px;
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
					color: #333;
					font-weight: bold;
					text-shadow: 2px 2px lighten(gray, 20%);

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

@media only screen and (max-width: 770px) {
	.loginPage {
		grid-template-columns: 1.3fr 0.7fr;
	}

	.prouds-logo {
		width: 70%;
	}
}

@media only screen and (max-width: 480px) {
	.loginPage {
		grid-template-columns: 1fr;
		grid-template-rows: 140px 1fr;

		section.banner {
			grid-template-rows: 1fr 50px;

			.banner-footer {
				font-size: 12px;
			}
		}
	}

	.prouds-logo {
		width: 70%;
		margin-top: 35px;
	}

	.login-form {
		margin-bottom: 30px;
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
	data() {
		return {
			iconn: true,
			logo: {
				prouds: "",
				sigma: ""
			}
		};
	},
	methods: {
		getAttr(attrName) {
			return APP_EL.getAttribute(attrName);
		},

		checkConnection() {
			this.iconn = window.navigator.onLine;
		}
	},
	mounted() {
		this.iconn = window.navigator.onLine;
		window.addEventListener("online", this.checkConnection);
		window.addEventListener("offline", this.checkConnection);

		this.logo.prouds = document
			.getElementById("logo-prouds")
			.getAttribute("data-url");
		this.logo.sigma = document
			.getElementById("logo-sigma")
			.getAttribute("data-url");
	}
};
</script>

