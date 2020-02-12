<template>
	<b-field label="Business Unit">
		<div class="field is-grouped">
			<b-select
				v-if="!hasDefault"
				placeholder="Select Business Unit"
				@input="selectUnit"
				v-model="unit"
				expanded
			>
				<slot></slot>
			</b-select>
			<p v-else class="control">
				<b-button type="is-static is-light-blend">
					<slot></slot>
				</b-button>
			</p>
			<p class="control">
				<b-button
					tag="a"
					type="is-link"
					icon-right="download"
					:href="downloadLink"
				></b-button>
			</p>
		</div>
	</b-field>
</template>

<script>
import Moment from "helper-moment";
import { parsedURL } from "helper-apis";
export default {
	props: {
		unitId: {
			type: String,
			default: null
		},
		exportLink: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			hasDefault: false,
			unit: null
		};
	},
	computed: {
		downloadLink() {
			let start = this.$parent.$data.filterStart;
			let end = this.$parent.$data.filterEnd;

			if (start instanceof Date) {
				if (!(end instanceof Date)) {
					end = start;
				}

				let bundle = {
					start: Moment(start).format("MM.YYYY"),
					end: Moment(end).format("MM.YYYY"),
					unit_id: this.unitId
				};

				return parsedURL(this.exportLink, bundle);
			} else {
				return "#";
			}
		}
	},
	methods: {
		selectUnit(unit) {
			this.$emit("input", unit);
		}
	},
	beforeMount() {
		if (this.unitId !== null) {
			this.hasDefault = true;
			this.$parent.$data.unitID = this.unitId;
		}
	}
};
</script>