<template>
	<div class="modal-card" style="width: auto">
		<form :action="apiAction" method="post">
			<article class="message is-primary">
				<div class="message-header">
					<p>
						<span
							class="tag is-warning is-medium"
							style="padding: 0px 8px; margin-right: 7px;"
							>👨‍💼</span
						>
						Resource Booking
					</p>
				</div>
				<div class="message-body">
					<div class="columns">
						<div class="column is-3">
							<a
								class="button is-danger is-fullwidth"
								type="button"
								@click="$parent.close()"
								@close="closeModal()"
							>
								Back
							</a>
						</div>
						<div class="column is-3">
							<b-field label="Start Booking Period 📅">
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
						<div class="column is-3" style="margin-left:50px">
							<b-field label="End Booking Period 📅">
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
						<div class="column is-1">
							<button
								class="button is-success is-fullwidth"
								type="submit"
								style="margin-top:30px; margin-left:50px"
							>
								Submit
							</button>
						</div>
					</div>
					<div class="columns">
						<div class="column is-3">
							<b-field>
								<b-input
									placeholder="Search Project..."
									type="search"
									icon="magnify"
									v-model="searchQuery"
								>
								</b-input>
							</b-field>
							<b-field>
								<input
									type="hidden"
									name="projectId"
									v-model="selectedOptions"
								/>
								<b-select
									multiple
									expanded
									native-size="7"
									v-model="selectedOptions"
								>
									<option
										v-for="(project,
										index) in listProjectData"
										:key="index"
										:value="project.projectId"
										>👨‍💼 {{ project.projectName }}
									</option>
								</b-select>
							</b-field>
							<!-- <p class="content">
								<b>selected</b>: {{ selectedOptions }}
							</p> -->
						</div>
						<div class="column is-9">
							<data-table
								title="Resource List"
								:data="fetchedRes"
								checkbox-position="left"
								:fields="[]"
								:is-row-checkable="checkBookable"
								checkable
							>
								<template slot-scope="props">
									<b-table-column
										field="name"
										label="👨‍💼 Nama"
									>
										<span>{{ props.row.name }}</span>
									</b-table-column>
									<b-table-column field="bu" label="🏢 bu">
										<span>{{ props.row.bu }}</span>
									</b-table-column>
									<b-table-column
										field="status"
										label="Status"
									>
										<span>{{ props.row.status }}</span>
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
						</div>
					</div>
				</div>
			</article>
		</form>
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
			// checkedRows: [],
			searchQuery: "",
			searchList: true,
			listProject: LISTPROJECT,
			listProjectData: [],
			projectId: ""
		};
	},
	computed: {
		selectedOptions: {
			get: function() {
				return [this.projectId];
			},
			set: function(newValue = []) {
				if (newValue.length > 0) {
					let self = this;
					this.projectId = newValue.shift();
				} else {
					this.projectId = "";
				}
			}
		}
	},
	watch: {
		searchQuery: function(newQuery, oldQuery) {
			if (this.searchQuery !== "") {
				let self = this;
				this.listProjectData = this.listProject.filter(project =>
					Object.keys(project).find(key => {
						if (typeof project[key] === "string") {
							return project[key]
								.toLowerCase()
								.includes(self.searchQuery.toLowerCase());
						} else {
							return project[key]
								.toString()
								.toLowerCase()
								.includes(self.searchQuery.toLowerCase());
						}
					})
				);
			} else {
				this.listProjectData = this.listProject;
			}
		}
	},
	methods: {
		closeModal() {
			this.searchQuery = "";
		},
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
		this.listProjectData = this.listProject;
		this.fetchResource();
		this.book();
	}
};
</script>
