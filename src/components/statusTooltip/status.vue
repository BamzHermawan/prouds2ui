<template>
	<span>
		<b-tooltip :type="color" :label="active.label" :position="position">
			<span :class="mdi_icon_class"></span>
		</b-tooltip>
	</span>
</template>

<script>
export default {
	props: {
		status: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: "is-dark"
		},
		position: {
			type: String,
			default: "is-left"
		},
		icon: {
			type: String,
			default: "mdi"
		},
		options: {
			type: Array,
			default: []
		}
	},
	computed: {
		active() {
			if (this.options.length > 1) {
				let found = this.options.find(opt => opt.label === this.status);
				if (found) return found;
			} else if (this.options.length == 1) {
				return this.options[0];
			}

			return {
				label: "",
				icon: "mdi-checkbox-blank-outline"
			};
		},
		mdi_icon_class() {
			let kelas = this.icon.split(" ");
			if (this.active !== undefined) {
				let prep = this.active.icon.split(" ");
				if (prep.length > 1) {
					kelas = [...kelas, ...prep];
				} else {
					kelas.push(this.active.icon);
				}
			}

			return kelas;
		}
	}
};
</script>