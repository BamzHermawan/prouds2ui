<template>
	<option :value="value">{{ label }}: {{ sdate }} ⇒ {{ edate }}</option>
</template>

<script>
import Moment from "helper-moment";
export default {
	props: {
		value: {
			type: String,
			required: true
		},
		selected: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			required: true
		},
		start: {
			type: String,
			required: true
		},
		end: {
			type: String,
			required: true
		}
	},
	computed: {
		sdate() {
			return Moment(this.start, "DD/MM/YYYY").format("D MMMM YYYY");
		},
		edate() {
			return Moment(this.end, "DD/MM/YYYY").format("D MMMM YYYY");
		}
	},
	created() {
		this.$root.addVersion({
			label: this.label,
			id: this.value,
			start: this.start,
			end: this.end,
			selected: this.selected
		});

		if (this.selected) {
			this.$root.setVersion(this.value);
		}
	}
};
</script>