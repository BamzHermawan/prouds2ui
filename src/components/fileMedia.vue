<template>
	<div :class="'file-item' + addOnClass">
		<div v-if="checkable" class="checkbox-container">
			<b-checkbox></b-checkbox>
		</div>
		<div class="filename">
			<a :href="href">
				<p>
					<span class="icon is-medium">
						<span
							:class="'mdi has-text-info ' + extention.icon"
						></span>
					</span>
					<span><slot></slot></span>
				</p>
			</a>
		</div>
		<div class="buttons is-right">
			<b-button
				v-if="editable"
				type="is-info"
				size="is-small"
				icon-right="pencil"
				@click="emit('edit')"
			></b-button>
			<b-button
				v-if="closable"
				type="is-danger"
				size="is-small"
				icon-right="close"
				@click="emit('close')"
			></b-button>
		</div>
	</div>
</template>

<script>
const FILETYPE = [
	{ ext: "xlsx", icon: "mdi-file-excel" },
	{ ext: "xls", icon: "mdi-file-excel" },
	{ ext: "docx", icon: "mdi-file-word" },
	{ ext: "doc", icon: "mdi-file-word" },
	{ ext: "pdf", icon: "mdi-file-pdf" },
	{ ext: "jpg", icon: "mdi-file-image" },
	{ ext: "jpeg", icon: "mdi-file-image" },
	{ ext: "png", icon: "mdi-file-image" },
	{ ext: "ppt", icon: "mdi-file-powerpoint" },
	{ ext: "pptx", icon: "mdi-file-powerpoint" }
];

export default {
	props: {
		ext: {
			type: String,
			default: ""
		},
		href: {
			type: String
		},
		editable: {
			type: Boolean,
			default: false
		},
		closable: {
			type: Boolean,
			default: false
		},
		checkable: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		extention() {
			let found = FILETYPE.find(type => this.ext == type.ext);
			if (found === undefined) {
				return {
					ext: this.ext,
					icon: "mdi-file"
				};
			} else {
				return found;
			}
		},
		addOnClass() {
			let addon = "";
			if (!this.checkable) {
				addon += " has-no-checkbox";
			}

			if (!this.editable && !this.closable) {
				addon += " has-no-buttons";
			} else if (!this.editable || !this.closable) {
				addon += " has-single-button";
			}

			return addon;
		}
	}
};
</script>