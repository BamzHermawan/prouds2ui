<template>
	<div class="field">
		<div class="control">
			<b-dropdown position="is-bottom-left" trap-focus paddingless>
				<input
					class="input"
					type="text"
					:placeholder="placeholder"
					slot="trigger"
				/>

				<b-dropdown-item custom :focusable="false">
					<div class="modal-card" style="width:225px;">
						<section class="modal-card-body is-paddingless">
							<b-field>
								<b-select expanded placeholder="Month">
									<option
										v-for="(month, index) in months"
										:key="'month-' + index"
										:value="index"
										>{{ month }}</option
									>
								</b-select>
								<b-select placeholder="Year">
									<option
										v-for="year in years"
										:key="'year-' + year"
										>{{ year }}</option
									>
								</b-select>
							</b-field>
						</section>
					</div>
				</b-dropdown-item>
				<hr class="dropdown-divider" />
				<b-dropdown-item>Action</b-dropdown-item>
				<b-dropdown-item>Action</b-dropdown-item>
				<b-dropdown-item>Action</b-dropdown-item>
			</b-dropdown>
		</div>
	</div>
</template>

<script>
import Moment from "helper-moment";
export default {
	props: {
		placeholder: {
			type: String,
			default: "Select date of week"
		}
	},
	computed: {
		years() {
			let yearList = [];
			const today = parseInt(Moment().format("YYYY"));
			for (let y = today; y >= 1989; y--) {
				yearList.push(y);
			}

			return yearList;
		},
		months() {
			let monthList = [];
			for (let m = 1; m <= 12; m++) {
				monthList.push(Moment(m.toString(), "M").format("MMMM"));
			}

			return monthList;
		}
	},
	data() {
		return {
			model: null
		};
	}
};
</script>