<template>
	<div class="modal-card" style="width: auto">
		<section class="columns">
			<div
				class="column is-section is-12-desktop is-4-tablet is-hidden-touch has-background-light"
			>
				<header class="modal-card-head">
					<p class="modal-card-title">Resource Booking</p>
				</header>
				<form :action="apiAction" method="post">
					<section class="info">
						<div class="columns">
							<div
								class="column is-1-desktop"
								style="margin-left:85px;"
							>
								<a
									class="button is-danger is-fullwidth"
									type="button"
									@click="$parent.close()"
								>
									Back
								</a>
							</div>
							<div
								class="column is-2-desktop"
								style="margin-left:34px; margin-top:5px;"
							>
								<p>Start Booking Period</p>
							</div>
							<div
								class="column is-2-desktop"
								style="margin-left:-50px"
							>
								<b-field>
									<b-datepicker
										placeholder="DD/MM/YYYY"
										:min-date="minDate"
										@input="postDate"
										v-model="start"
										:name="startDateName"
									>
									</b-datepicker>
								</b-field>
							</div>
							<div
								class="column is-2-desktop"
								style="margin-left:34px; margin-top:5px;"
							>
								<p>End Booking Period</p>
							</div>
							<div
								class="column is-2-desktop"
								style="margin-left:-50px"
							>
								<b-field>
									<b-datepicker
										placeholder="DD/MM/YYYY"
										:min-date="minDate"
										@input="postDate"
										v-model="end"
										:name="endDateName"
									>
									</b-datepicker>
								</b-field>
							</div>
							<div
								class="column is-1-desktop"
								style="margin-left:85px;"
							>
								<button
									class="button is-success is-fullwidth"
									type="submit"
								>
									Submit
								</button>
							</div>
						</div>
					</section>
					<section class="info">
						<data-table
							title="Resource List"
							:data="fetchedRes"
							:checked-rows.sync="checkedRows"
							checkbox-position="left"
							:fields="[]"
							:is-row-checkable="checkBookable"
							checkable
						>
							<template slot-scope="props">
								<b-table-column field="name" label="👨‍💼 Nama">
									<span>{{ props.row.name }}</span>
								</b-table-column>
								<b-table-column field="bu" label="🏢 bu">
									<span>{{ props.row.bu }}</span>
								</b-table-column>
								<b-table-column field="status" label="Status">
								</b-table-column>
								<b-table-column
									field="userId"
									label="⚡ Action"
								>
									<b-button type="is-info" size="is-small"
										>🔎 Detail</b-button
									>
								</b-table-column>
							</template>
						</data-table>
					</section>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
import Axios from "axios";
import DataTable from "../../components/dataTable";
import moment from "moment";
export default {
	components: {
		DataTable
	},
	props: {
		apiSearchEngine: {
			type: String,
			required: true
		},
		startDateName: {
			type: String,
			required: true
		},
		endDateName: {
			type: String,
			required: true
		},
		userIdName: {
			type: String,
			required: true
		},
		apiAction: {
			type: String,
			required: true
		},
		testAction: {
			type: String,
			required: true
		}
	},
	data() {
		const today = new Date();

		return {
			canbook: [],
			status_book: [],
			date: new Date(),
			minDate: new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			),
			start: new Date(),
			end: new Date(),
			fetchedRes: [],
			checkboxPosition: "left",
			checkedRows: []
		};
	},
	methods: {
		fetchResource() {
			let self = this;
			Axios.get(this.apiSearchEngine, {
				params: self.paresedFilter
			})
				.then(function(response) {
					self.fetchedRes = response.data;
					self.book();
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		book() {
			var a = this.fetchedRes.length;
			for (var i = 0; i < a; i++) {
				if (!this.fetchedRes[i].isBooked) {
					this.canbook.push(this.fetchedRes[i].userId);
				}
			}
		},
		checkBookable(row) {
			return this.canbook.includes(row.userId);
		},
		postDate() {
			let self = this;
			Axios.post(
				this.testAction,
				{
					start: self.start,
					end: self.end,
					users: [
						"0000000000",
						"0000000000",
						"0000000000",
						"0000000000",
						"0000000000"
					]
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}
			)
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	mounted() {
		this.fetchResource();
		this.book();
	}
};
</script>
