<template>
	<section
		class="has-background-white-bis"
		style="padding: 1.5rem; overflow:hidden;"
	>
		<nav class="level">
			<div class="level-left content is-marginless">
				<h3 class="has-text-weight-light is-marginless is-uppercase">
					{{ title }}
				</h3>
			</div>
			<div class="level-right">
				<b-button
					class="is-danger is-small is-long"
					@click="$parent.close()"
					>Exit</b-button
				>
			</div>
		</nav>

		<div class="field has-addons">
			<div class="control is-expanded">
				<span
					v-html="formatLabel(wpA)"
					class="button is-static is-info-blend is-fullwidth"
				>
				</span>
			</div>
			<p class="control">
				<span
					class="button is-static is-dark-blend"
					style="width: 100px;"
				>
					<b>vs</b>
				</span>
			</p>
			<div class="control is-expanded">
				<span
					v-html="formatLabel(wpB)"
					class="button is-static is-info-blend is-fullwidth"
				>
				</span>
			</div>
		</div>

		<hr style="margin-bottom:1px; background-color:grey;" />
		<div class="workplan-compare-container">
			<wp-table
				:version-id="version.wpA"
				:project-id="project_id"
				@loaded="() => (loaded.wpA = true)"
				type="workplan-A"
			></wp-table>
			<wp-table
				:version-id="version.wpB"
				:project-id="project_id"
				@loaded="() => (loaded.wpB = true)"
				type="workplan-B"
			></wp-table>
		</div>
		<b-loading :is-full-page="true" :active.sync="isLoaded"></b-loading>
	</section>
</template>

<script>
import Moment from "helper-moment";
import wpTable from "./wpTable";
export default {
	components: { wpTable },
	props: {
		title: {
			type: String,
			default: ""
		},
		project_id: {
			type: String,
			required: true
		},
		wpA: {
			type: Object,
			default() {
				return {
					label: "Not Found",
					id: undefined,
					start: undefined,
					end: undefined
				};
			}
		},
		wpB: {
			type: Object,
			default() {
				return {
					label: "Not Found",
					id: undefined,
					start: undefined,
					end: undefined
				};
			}
		}
	},
	data() {
		return {
			loaded: {
				wpA: false,
				wpB: false
			}
		};
	},
	computed: {
		version() {
			const wpA = this.wpA.id == undefined ? "" : this.wpA.id;
			const wpB = this.wpB.id == undefined ? "" : this.wpB.id;

			return { wpA, wpB };
		},
		isLoaded() {
			return !(this.loaded.wpA && this.loaded.wpB);
		}
	},
	methods: {
		formatLabel(wp) {
			if (wp.id !== undefined) {
				const start = Moment(wp.start, "DD/MM/YYYY").format(
					"D MMMM YYYY"
				);
				const end = Moment(wp.end, "DD/MM/YYYY").format("D MMMM YYYY");
				return (
					"<b class='has-text-dark' style='margin-right:5px;'>" +
					wp.label +
					".</b> " +
					start +
					" ⇒ " +
					end
				);
			}

			return wp.label;
		}
	}
};
</script>