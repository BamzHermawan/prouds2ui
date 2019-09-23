<template> </template>

<script>
import { notified } from "../../tools";
export default {
	props: {
		message: {
			type: String,
			required: true
		},
		mode: {
			type: String,
			default: "notification"
		},
		color: {
			type: String,
			default: "primary"
		}
	},
	methods: {
		determineActor() {
			if (this.mode === "toast") {
				return this.$toast;
			}

			if (this.mode === "snackbar") {
				return this.$snackbar;
			}

			return this.$notification;
		},
		launchNotified(entity) {
			if (this.color === "success") {
				return entity.success(this.message);
			}

			if (this.color === "warning") {
				return entity.alert(this.message);
			}

			if (this.color === "info") {
				return entity.info(this.message);
			}

			if (this.color === "danger") {
				return entity.error(this.message);
			}

			if (this.color === "light") {
				return entity.light(this.message);
			}

			if (this.color === "dark") {
				return entity.dark(this.message);
			}

			return entity.primary(this.message);
		}
	},
	mounted() {
		this.launchNotified(notified(this.determineActor()));
	}
};
</script>