<template>
	<table id="tablePlan" class="table is-fullwidth resource-table is-bordered">
		<thead>
			<th class="is-grey">Assigned Role</th>
			<th :class="type + ' is-bolder has-text-centered'">Qty</th>
			<th :class="type + ' is-bolder has-text-centered'">Day(s)</th>
			<th :class="type + ' is-bolder has-text-right'">Manday(s)</th>
			<th :class="type + ' is-bolder has-text-right'">Rate (Rp)</th>
			<th :class="type + ' is-bolder has-text-right'">Total Cost (Rp)</th>
		</thead>
		<tbody>
			<slot></slot>

			<!-- Template Jika Data Kosong -->
			<tr v-if="rowIsEmpty">
				<td colspan="6" class="is-light" style="border-color: grey;">
					<p class="subtitle has-text-centered">
						Data Unavailable
					</p>
				</td>
			</tr>
			<!-- Template Jika Data Kosong -->

			<tr>
				<th class="is-grey has-text-centered">Total</th>
				<td :class="type + ' is-bolder has-text-centered'">
					{{ total.qty | ifExist }}
				</td>
				<td :class="type + ' is-bolder has-text-centered'">
					{{ total.days | ifExist }}
				</td>
				<td :class="type + ' is-bolder has-text-right'">
					{{ total.mandays | ifExist }}
				</td>
				<td :class="type + ' is-bolder has-text-right'">
					{{ total.rate | ifExist | currency }}
				</td>
				<td :class="type + ' is-bolder has-text-right'">
					{{ total.cost | ifExist | currency }}
				</td>
			</tr>

			<slot name="after"></slot>
		</tbody>
	</table>
</template>

<script>
import resRow from "./resourceRow";
import { isEmpty } from "helper-tools";
export default {
	components: { resRow },
	props: {
		type: {
			type: String,
			default: "is-light"
		}
	},
	data() {
		return {
			row: []
		};
	},
	computed: {
		total() {
			let cooked = {
				qty: 0,
				days: 0,
				rate: 0,
				mandays: 0,
				cost: 0
			};

			for (let i = 0; i < this.row.length; i++) {
				const row = this.row[i];
				for (const key in cooked) {
					if (cooked.hasOwnProperty(key)) {
						if (row.hasOwnProperty(key)) {
							cooked[key] = row[key] + cooked[key];
						}
					}
				}
			}

			return cooked;
		},
		rowIsEmpty() {
			return this.row.length == 0;
		}
	},
	methods: {
		pushRow(row) {
			this.row.push(row);
		}
	},
	filters: {
		ifExist(val) {
			if (val !== 0) {
				return val;
			} else {
				return "—";
			}
		}
	}
};
</script>