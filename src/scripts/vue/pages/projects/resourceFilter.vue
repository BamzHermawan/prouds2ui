<template>
	<div class="modal-card" style="width: auto">
		<form :action="apiAction" method="post">
			<article class="message is-primary" style="min-height: 100vh;">
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
					<nav class="level">
						<div class="level-left">
							<div class="level-item">
								<a
									class="button is-danger"
									style="min-width: 150px;"
									type="button"
									@click="$parent.close()"
									@close="closeModal()"
								>
									◀ Back
								</a>
							</div>
						</div>
						<div class="level-right">
							<div class="level-item">
								<p class="subtitle is-5">📅 Booking Period:</p>
							</div>
							<div class="level-item">
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
							<div class="level-item"><p>-</p></div>
							<div class="level-item">
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
							<div class="level-item" style="min-width: 250px;">
								<button
									class="button is-success is-fullwidth"
									type="submit"
								>
									Send Booking Form 📬
								</button>
							</div>
						</div>
					</nav>
					<div class="columns">
						<div class="column is-3">
							<b-field label="🎯 Select Project">
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
										<span v-if="props.row.isBooked==true">Full Booked</span>
										<span v-if="props.row.isBooked==false">Available</span>
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
								<template slot="head-right">
									<span></span>
								</template>
								<template slot="top-right">
									<div class="field is-grouped">
										<div class="control">
											<div
												class="tags has-addons are-medium"
											>
												<span class="tag is-dark">
													Total Resource
												</span>
												<span class="tag is-success">{{
													fetchedRes.length
												}}</span>
											</div>
										</div>
									</div>
								</template>
							</data-table>
							<div class="card" style="margin-top: 25px;">
								<header class="card-header">
									<p class="card-header-title">
										Detail Resource
									</p>
									<a
										href="#"
										class="card-header-icon"
										aria-label="more options"
									>
										<span class="icon">
											<i
												class="fas fa-angle-down"
												aria-hidden="true"
											></i>
										</span>
									</a>
								</header>
								<div class="card-content">
									<div class="content">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit. Phasellus nec iaculis
										mauris.
										<a href="#">@bulmaio</a>.
										<a href="#">#css</a>
										<a href="#">#responsive</a>
										<br />
										<time datetime="2016-1-1"
											>11:09 PM - 1 Jan 2016</time
										>
									</div>
								</div>
							</div>
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
