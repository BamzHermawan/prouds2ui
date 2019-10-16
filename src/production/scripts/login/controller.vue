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

<script>
import loginForm from "./form";

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

<style lang="scss">
@import "../../../styles/login.scss";
</style>