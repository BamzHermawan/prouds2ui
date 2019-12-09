<template>
	<div :class="'file-item' + addOnClass">
		<div v-if="checkable" class="checkbox-container has-text-right">
			<label class="b-checkbox checkbox">
				<input type="checkbox" :true-value="true" v-model="checked" />
				<span class="check is-success"></span>
			</label>
		</div>
		<div class="filename">
			<a :href="href" :target="target">
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
		<p class="has-text-right">
			<a
				v-if="editable"
				@click="emitButton('edited')"
				class="has-text-info"
			>
				<span class="mdi mdi-pencil mdi-24px"></span>
			</a>
			<a
				v-if="closable"
				@click="emitButton('closed')"
				class="has-text-danger"
			>
				<span class="mdi mdi-close mdi-24px"></span>
			</a>
		</p>
	</div>
</template>

<script>
import { isEmpty } from "helper-tools";
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
		filename: {
			type: String,
			default: ""
		},
		href: {
			type: String,
			default: new URL("#", window.location.href).href
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
		},
		openNewTab: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			selected: false
		};
	},
	methods: {
		emitButton(eventName) {
			this.$emit(eventName, this);
		},
		extractExt(str, fromURL = false) {
			if (fromURL) {
				let parsed = new URL(str).pathname.split("/");
				str = parsed[parsed.length - 1];
			}

			let splited = str.split(".");
			return splited[splited.length - 1];
		}
	},
	computed: {
		checked: {
			get() {
				return this.selected;
			},
			set(val) {
				this.$emit("checked", val);
				this.selected = val;
			}
		},
		extention() {
			let ext = this.ext;

			// check if ext not passed extract extention from filename props
			if (isEmpty(ext)) {
				ext = this.extractExt(this.filename);
			}

			// check if ext still empty extract extention from href props
			if (isEmpty(ext)) {
				ext = this.extractExt(this.href);
			}

			let found = FILETYPE.find(type => ext == type.ext);
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
		},
		target() {
			if (this.openNewTab) {
				return "_blank";
			} else {
				return "_self";
			}
		}
	}
};
</script>