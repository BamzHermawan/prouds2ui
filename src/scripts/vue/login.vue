<template lang="pug">
	form(method="POST", :action="post", @submit="doLogin")
		.row.justify-content-center
			.col-md-8.col-lg-10
				.card.mt-5
					.card-header Login PRouDS 2
					.card-body
						.alert.alert-warning(v-if="!validation") {{ errorString }}
						.form-group
							label(for="email") 📧 Email
							input.form-control(
								type="email", 
								id="email", 
								v-model="email", 
								:name="names.email", 
								placeholder="Your Sigma Email"
							)
						.form-group
							label(for="password") 🔒 Password
							input.form-control(
								type="password", 
								id="password", 
								v-model="password", 
								:name="names.password", 
								placeholder="Your Sigma Email"
							)
						.form-group
							button.btn.btn-primary.btn-block(type="submit") 🗝 LOGIN
</template>

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

