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
					v-show="!disableDownload"
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
		},
		start: {
			type: Date,
			required: true
		},
		end: {
			type: Date,
			required: true
		},
		dateFormat: {
			type: String,
			default: "DD.MM.YYYY"
		}
	},
	data() {
		return {
			hasDefault: false,
			unit: null
		};
	},
	computed: {
		disableDownload() {
			if (this.unitId === null) {
				return this.unit === null;
			} else {
				return false;
			}
		},
		downloadLink() {
			let unitID = this.unitId;
			if (this.unitId === null) {
				unitID = this.unit;
			}

			let bundle = {
				start: Moment(this.start).format(this.dateFormat),
				end: Moment(this.end).format(this.dateFormat),
				unit_id: unitID
			};

			return parsedURL(this.exportLink, bundle);
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