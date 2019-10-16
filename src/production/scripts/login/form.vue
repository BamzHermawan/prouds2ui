<template>
	<div>
		<article
			v-if="showError"
			class="message is-small is-warning animated fadeIn"
		>
			<div class="message-header">
				<p>Gagal Login</p>
				<a class="is-small">⚠</a>
			</div>
			<div class="message-body">
				{{ errorString }}
			</div>
		</article>
		<form :action="action" method="POST" @submit="doLogin">
			<div class="field no-margin-top">
				<label class="label" for="email">📧 Email</label>
				<div class="control">
					<input
						class="input"
						type="email"
						id="email"
						v-model="email"
						:name="emailName"
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
						:name="passwordName"
						placeholder="Your Password"
					/>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<button class="button is-dark is-fullwidth" type="submit">
						LOGIN
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<style lang="scss">
.button {
	margin-top: 30px;
}

.field {
	margin-top: 15px;

	&.no-margin-top {
		margin-top: 0px;
	}
}

.message-body {
	padding: 10px 15px !important;
}
</style>


<script>
export default {
	name: "vLogin",
	props: {
		emailName: {
			type: String,
			required: true
		},
		passwordName: {
			type: String,
			required: true
		},
		action: {
			type: String,
			required: true
		},
		loginAlert: {
			type: String,
			required: false
		}
	},
	data() {
		return {
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

			this.validation = window.navigator.onLine;
			if (!this.validation)
				this.errors.push("Koneksi Internet Tidak Terdeteksi");

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
		},
		showError() {
			return !this.validation || this.errors.length != 0;
		}
	},
	mounted() {
		if (this.loginAlert != "") this.errors.push(this.loginAlert);
	}
};
</script>

