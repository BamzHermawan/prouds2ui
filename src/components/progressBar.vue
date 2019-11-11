<template>
	<div
		:class="
			'progress-stacked' + (noMargin ? ' has-no-margin' : '') + ' ' + size
		"
	>
		<div
			:key="idx"
			v-for="(bar, idx) in cooked"
			:class="parseClass(bar.color)"
			:style="parseStyle(bar.width)"
		>
			<span v-if="!cleanBar">{{ parseText(bar) }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		bars: {
			type: Array,
			default: () => {
				return [
					{
						data: 0,
						color: "is-success"
					}
				];
			}
		},
		value: {
			default: undefined
		},
		text: {
			type: String,
			default: undefined
		},
		type: {
			type: String,
			default: "is-success"
		},
		maxValue: {
			type: String,
			default: "100"
		},
		size: {
			type: String,
			default: "is-normal"
		},
		cleanBar: {
			type: Boolean,
			default: false
		},
		noMargin: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		parseClass(type) {
			return "progress-bar " + type;
		},
		parseStyle(size) {
			return "width: " + size + "%";
		},
		parseText(bar) {
			if (bar.text === undefined) {
				return bar.data + "%";
			} else {
				return bar.text.replace("{$value}", bar.data);
			}
		}
	},
	data() {
		return {
			cooked: []
		};
	},
	mounted() {
		let max = parseInt(this.maxValue);
		let cook = this.bars;
		if (this.value !== undefined) {
			let justOne = {
				data: this.value,
				value: this.value,
				color: this.type
			};

			if (this.text !== undefined) justOne.text = this.text;
			cook = [justOne];
		}

		let past = 0;
		for (let i = 0; i < cook.length; i++) {
			let bar = cook[i];
			if (bar.data > 0 && max !== 100) {
				bar.data = (bar.data / max) * 100;
			}

			let current = bar.data - past;
			if (current >= 0) {
				past = past + current;
				bar.width = current;
			} else {
				bar.width = 0;
				bar.data = past;
			}

			this.cooked.push(bar);
		}
	}
};
</script>