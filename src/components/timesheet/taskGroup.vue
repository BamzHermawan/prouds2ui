<template>
	<div :class="'task-grouped ' + type + ' ' + checkAlwaysShow">
		<div @click="toggle" class="task-group-header">
			<p>{{ title }}</p>
			<span v-if="alwaysShow" class="tag">{{ today }}</span>
			<span v-else>
				<span v-if="shown" class="mdi mdi-chevron-up"></span>
				<span v-else class="mdi mdi-chevron-down"></span>
			</span>
		</div>
		<div v-show="shown" class="task-container animated fadeIn">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import Moment from "helper-moment";
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		value: {
			type: Boolean,
			default: true
		},
		type: {
			type: String,
			default: ""
		},
		alwaysShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			shown: this.value
		};
	},
	computed: {
		checkAlwaysShow() {
			return this.alwaysShow ? "is-always-show" : "";
		},
		today() {
			return Moment().format("dddd, DD MMMM YYYY");
		}
	},
	methods: {
		input(value) {
			this.shown = value;
			this.$emit("input", value);
		},
		toggle() {
			if (this.alwaysShow) {
				this.input(true);
			} else {
				this.input(!this.shown);
			}
		}
	}
};
</script>

<style>
</style>