<template>
	<b-button type="is-success is-light is-small is-fullwidth" @click="confirm">
		<b>Approve Workplan</b>
	</b-button>
</template>

<script>
import sd from "showdown";
export default {
	props: {
		action: {
			type: String,
			required: true
		},
		projectId: {
			type: String,
			required: true
		},
		title: {
			default: "Approve Workplan"
		},
		message: {
			type: String,
			default: "You **Sure** want to approve ?"
		},
		confirmText: {
			type: String,
			default: "Yes, I am"
		}
	},
	methods: {
		convert(md) {
			let converter = new sd.Converter();
			return converter.makeHtml(md);
		},
		confirm() {
			this.$dialog.confirm({
				title: this.title,
				message: this.convert(this.message),
				confirmText: this.confirmText,
				type: "is-success",
				onConfirm: this.submit
			});
		},
		submit() {
			let form = document.createElement("form");
			form.setAttribute("action", this.action);
			form.setAttribute("method", "POST");

			let input = document.createElement("input");
			input.value = this.projectId;
			form.setAttribute("type", "hidden");
			input.setAttribute("name", "project_id");
			form.appendChild(input);

			document.body.appendChild(form);
			form.submit();
		}
	}
};
</script>