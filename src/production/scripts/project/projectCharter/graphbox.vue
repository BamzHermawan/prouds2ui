<template>
	<div class="graph-row">
		<div class="graphline-divider" v-if="index > 0 || editable">
			<div class="graph-line" v-if="index > 0">
				<div class="line"></div>
				<div class="down-arrow"></div>
			</div>
			<div class="graph-space" v-if="index > 0">
				<a
					class="button is-text is-small"
					@click="$emit('addbetween', level)"
					v-if="editable"
				>
					<span
						class="mdi mdi-plus-circle-outline is-marginless has-text-success"
					></span>
				</a>
			</div>
			<div class="graph-line" v-if="index > 0">
				<div class="line"></div>
				<div class="down-arrow"></div>
			</div>
			<div style="width:100%;margin-bottom:1.5rem;" v-if="index == 0">
				<b-button
					@click="$emit('addtop', null)"
					type="is-success is-light"
					class="is-fullwidth"
					size="is-small"
					tag="a"
				>
					<span
						class="mdi mdi-plus-circle-outline is-marginless"
					></span>
				</b-button>
			</div>
		</div>
		<input type="hidden" name="compath[]" :value="encoded" />
		<div class="graphbox-level">
			<div class="graphbox">
				<div :class="'graphbox-header ' + (edit ? 'has-edit-on' : '')">
					<p v-if="!edit">{{ leftTitle }}</p>
					<input
						v-else
						type="text"
						class="input is-small has-text-centered"
						v-model="left.title"
					/>
				</div>
				<div :class="'graphbox-body ' + (edit ? 'has-edit-on' : '')">
					<p v-if="!edit">{{ leftName }}</p>
					<input
						v-else
						type="text"
						class="input is-small has-text-centered"
						v-model="left.name"
					/>
				</div>
			</div>
			<div class="graph-line">
				<div class="left-arrow"></div>
				<div class="line"></div>
				<div class="right-arrow"></div>
			</div>
			<div class="graphbox">
				<div :class="'graphbox-header ' + (edit ? 'has-edit-on' : '')">
					<p v-if="!edit">{{ rightTitle }}</p>
					<input
						v-else
						type="text"
						class="input is-small has-text-centered"
						v-model="right.title"
					/>
				</div>
				<div :class="'graphbox-body ' + (edit ? 'has-edit-on' : '')">
					<p v-if="!edit">{{ rightName }}</p>
					<input
						v-else
						type="text"
						class="input is-small has-text-centered"
						v-model="right.name"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		index: {
			required: true
		},
		level: {
			type: String,
			required: true
		},
		leftTitle: {
			type: String,
			default: "-"
		},
		leftName: {
			type: String,
			default: "-"
		},
		rightTitle: {
			type: String,
			default: "-"
		},
		rightName: {
			type: String,
			default: "-"
		},
		edit: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			left: {
				title: this.leftTitle,
				name: this.leftName
			},
			right: {
				title: this.rightTitle,
				name: this.rightName
			}
		};
	},
	updated() {
		if (!this.edit) {
			this.left.title = this.leftTitle;
			this.left.name = this.leftName;

			this.right.title = this.rightTitle;
			this.right.name = this.rightName;
		}
	},
	computed: {
		editable() {
			return this.$root.viewAccess === "editable";
		},
		encoded() {
			return JSON.stringify({
				level: this.level,
				left: this.left,
				right: this.right
			});
		}
	}
};
</script>