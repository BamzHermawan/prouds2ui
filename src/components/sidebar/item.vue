<template>
	<li :class="listClass">
		<div class="media-content" @click="doAction">
			<a v-show="!onEdit" :href="href">
				<slot></slot>
			</a>
			<input
				v-show="onEdit"
				ref="input"
				type="text"
				v-model="changedLabel"
			/>
		</div>
		<div v-if="!noEdit" class="media-right">
			<span
				v-if="!onEdit"
				class="mdi mdi-pencil"
				@click="openEdit"
			></span>
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
export default {
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
			style += this.active ? " is-active" : "";
			style += !this.noEdit ? " media" : "";

			return style;
		}
	},
	methods: {
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
			} else {
				window.location = this.href;
			}
		}
	}
};
</script>