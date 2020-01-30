<template>
	<b-dropdown
		aria-role="list"
		position="is-bottom-left"
		class="is-small"
		trap-focus
	>
		<span slot="trigger" class="mdi mdi-menu-custom mdi-24px"></span>
		<b-dropdown-item :focusable="false" custom>
			<form :action="endPoint" method="post">
				<input type="hidden" name="auto" v-model="auto" />
				<b-field label="Adjust Timesheet Date">
					<b-checkbox v-model="auto_select" type="is-info">
						<b-tooltip
							label="If checked, system will automaticly select empty date within start-finish of task"
							type="is-info"
							multilined
							animated
						>
							Auto Select Date
						</b-tooltip>
					</b-checkbox>
				</b-field>
				<b-field>
					<b-datepicker
						expanded
						icon="calendar"
						size="is-small"
						:focusable="false"
						:disabled="auto_select"
						:placeholder="placeholder"
						:focused-date="minDate"
						:min-date="minDate"
						:max-date="maxDate"
						name="date"
					></b-datepicker>
				</b-field>
				<b-field>
					<button class="button is-fullwidth is-success">
						Submit
					</button>
				</b-field>
			</form>
		</b-dropdown-item>
	</b-dropdown>
</template>

<script>
import { parsedURL } from "helper-apis";
import Moment from "helper-moment";
export default {
	props: {
		action: {
			type: String,
			required: true
		},
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			auto_select: true
		};
	},
	computed: {
		placeholder() {
			if (this.auto_select) {
				return "Input Disabled";
			} else {
				return "Manual Select Date";
			}
		},
		endPoint() {
			return parsedURL(this.action, this.data);
		},
		minDate() {
			if (this.data.hasOwnProperty("start")) {
				return new Date(Moment(this.data.start, "DD/MM/YYYY"));
			} else {
				return undefined;
			}
		},
		maxDate() {
			if (this.data.hasOwnProperty("end")) {
				return new Date(Moment(this.data.end, "DD/MM/YYYY"));
			} else {
				return undefined;
			}
		},
		auto() {
			return this.auto_select ? "TRUE" : "FALSE";
		}
	}
};
</script>