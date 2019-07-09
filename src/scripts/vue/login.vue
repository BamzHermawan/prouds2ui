<template>
	<div class="login">
		<div class="sidebar">
			<div class="container">
				<h1>Login Prouds 2</h1>
			</div>
		</div>
		<div class="sidebar">
			<div class="container">
				<form :action="post" method="POST" @submit="doLogin">
					<div class="field">
						<label class="label" for="email">📧 Email</label>
						<div class="control">
							<input
								class="input"
								type="email"
								id="email"
								v-model="email"
								:name="names.email"
								placeholder="Your Sigma Email"
							/>
						</div>
					</div>
					<div class="field">
						<label class="label" for="email">🔒 Password</label>
						<div class="control">
							<input
								class="input"
								type="password"
								id="password"
								v-model="password"
								:name="names.password"
								placeholder="Your Password"
							/>
						</div>
					</div>
					<div class="field">
						<div class="control">
							<button class="button is-link" type="submit">
								🗝 LOGIN
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.login {
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 100vw;
	height: 100vh;

	.sidebar {
		align-self: center;

		.container {
			margin-left: 32px;
			margin-right: 32px;
		}
	}
}
</style>


<script>
const APP_EL = document.querySelector("#app");
export default {
	data() {
		return {
			post: "",
			names: {
				email: "email",
				password: "password"
			},
			email: "",
			password: "",
			validation: true,
			errors: []
		};
	},
	methods: {
		doLogin(e) {
			this.errors = [];
			this.validation = this.email != "";
			if (!this.validation) this.errors.push("Email Tidak Boleh Kosong");

			this.validation = this.password != "";
			if (!this.validation)
				this.errors.push("Password Tidak Boleh Kosong");

			if (!this.validation) {
				e.preventDefault();
			}
		},
		getAttr(attrName) {
			return APP_EL.getAttribute(attrName);
		}
	},
	computed: {
		errorString() {
			return this.errors.join(", ");
		}
	},
	mounted() {
		this.post = this.getAttr("action");
		this.names.email = this.getAttr("email-name");
		this.names.password = this.getAttr("password-name");
	}
};
</script>

