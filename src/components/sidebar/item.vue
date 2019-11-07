<template>
	<li @mouseleave="closeDropdown" :class="listClass">
		<div class="media-content" @click="doAction">
			<linker
				v-show="!onEdit"
				:href="href === undefined ? '@refresh' : href"
			>
				<slot></slot>
			</linker>
			<input
				v-show="onEdit"
				ref="input"
				type="text"
				v-model="changedLabel"
			/>
		</div>
		<div v-if="!noEdit" class="media-right">
			<b-dropdown
				ref="setting"
				v-if="!onEdit"
				class="action"
				position="is-bottom-left"
				@active-change="closeAnyOpenEdit"
			>
				<span slot="trigger" class="mdi mdi-settings-outline"></span>

				<b-dropdown-item @click="openEdit">Rename</b-dropdown-item>
				<b-dropdown-item>Remove</b-dropdown-item>
			</b-dropdown>
			<div v-else class="field has-addons">
				<div class="control">
					<button class="button is-small is-success">
						<span class="mdi mdi-content-save"></span>
					</button>
				</div>
				<div class="control">
					<button
						class="button is-small is-danger"
						@click="cancelEdit"
					>
						<span class="mdi mdi-cancel"></span>
					</button>
				</div>
			</div>
		</div>
	</li>
</template>

<script>
import linker from "../linker";
export default {
	components: { linker },
	props: {
		href: {
			type: String,
			default: undefined
		},
		uniqID: {
			type: String,
			default: undefined
		},
		action: {
			type: Function,
			default: function() {
				return false;
			}
		},
		active: {
			type: Boolean,
			default: false
		},
		edit: {
			type: String,
			default: undefined
		}
	},
	data() {
		return {
			id: this.edit,
			onEdit: false,
			changedLabel: ""
		};
	},
	computed: {
		label() {
			if (this.$slots.default.length > 0) {
				return this.$slots.default[0].text;
			}

			return "";
		},
		noEdit() {
			return this.edit === undefined;
		},
		listClass() {
			let style = "side-item";
			style += !this.noEdit ? " media" : "";

			let currentPage = window.location.href.toLowerCase();
			let link = this.href !== undefined ? this.href.toLowerCase() : "";

			if (this.active) {
				style += " is-active";
			} else if (link === currentPage) {
				style += " is-active";
			}

			return style;
		}
	},
	methods: {
		closeDropdown() {
			if (this.$refs.hasOwnProperty("setting")) {
				if (this.$refs.setting === undefined) {
					return false;
				}

				if (this.$refs.setting.hasOwnProperty("isActive")) {
					if (this.$refs.setting.isActive) {
						this.$refs.setting.toggle();
					}
				} else {
					console.log("hidden " + this.edit);
				}
			}
		},
		closeAnyOpenEdit(dropdownShown) {
			if (dropdownShown) {
				if (typeof global.$sidebar.activeEdit === "object") {
					global.$sidebar.activeEdit.cancelEdit();
				}
			}
		},
		cancelEdit() {
			this.onEdit = false;
			global.$sidebar.activeEdit = undefined;
		},
		openEdit() {
			this.onEdit = true;
			this.changedLabel = this.label;
			let el = this.$refs.input;

			el.focus();
			setTimeout(function() {
				el.focus();
			}, 1);

			if (typeof global.$sidebar.activeEdit === "object") {
				global.$sidebar.activeEdit.cancelEdit();
			}

			global.$sidebar.activeEdit = {
				key: this.edit,
				cancelEdit: this.cancelEdit
			};
		},
		doAction() {
			if (this.href === undefined) {
				this.action();
			}
		}
	}
};
</script>