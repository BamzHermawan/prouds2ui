<template>
	<div class="modal-card" style="width: auto">
		<form @submit="checkForm" :action="apiAction" method="post">
			<article class="message is-modal is-primary">
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
									<input
										type="hidden"
										:name="startDateName"
										v-model="formatedStart"
									/>
									<b-datepicker
										placeholder="DD/MM/YYYY"
										:min-date="minDate"
										v-model="start"
									>
									</b-datepicker>
								</b-field>
							</div>
							<div class="level-item"><p>-</p></div>
							<div class="level-item">
								<b-field>
									<input
										type="hidden"
										:name="endDateName"
										v-model="formatedEnd"
									/>
									<b-datepicker
										placeholder="DD/MM/YYYY"
										:min-date="minDateEnd"
										v-model="end"
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
									name="batchId"
									v-model="$root.batchId"
								/>
								<input
									type="hidden"
									name="projectId"
									v-model="selectedOptions"
								/>
								<input
									type="hidden"
									:name="userIdName"
									v-model="checkId"
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
										>{{ project.projectName }}
									</option>
								</b-select>
							</b-field>
						</div>
						<div class="column is-9">
							<data-table
								ref="resTable"
								title="Resource List"
								:data="fetchedRes"
								:fields="[]"
								detailed
								detail-key="userId"
								:show-detail-icon="false"
								:is-row-checkable="checkBookable"
								checkable
								@onCheck="passedCheckedRow"
								:checkbox-position="checkboxPosition"
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
										<span v-if="props.row.isBooked == true"
											>Full Booked</span
										>
										<span v-if="props.row.isBooked == false"
											>Available</span
										>
									</b-table-column>
									<b-table-column
										field="userId"
										label="⚡ Action"
									>
										<b-button
											:type="
												checkIfOpen(props.row.userId)
													? 'is-dark'
													: 'is-info'
											"
											size="is-small"
											@click="toggleDetail(props.row)"
											>{{
												checkIfOpen(props.row.userId)
													? "❌ Close"
													: "🔎 Detail"
											}}</b-button
										>
										<b-button
											type="is-danger"
											size="is-small"
											@click="removeResource(props.row)"
											>🚫 Remove</b-button
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
								<template slot="detail" slot-scope="props">
									<div class="columns">
										<div class="column">
											<p class="title is-size-5">
												{{ randomSmile(props.index) }}
												{{ props.row.name }}
											</p>
											<p class="subtitle is-size-6">
												NIK. {{ props.row.userId }}
											</p>
										</div>
										<div class="column">
											<p class="title is-size-6">
												🏢 Business Unit
											</p>
											<p class="subtitle is-size-5">
												{{ props.row.bu }}
											</p>
										</div>
									</div>
									<div class="columns">
										<div class="column">
											<div class="content">
												<p class="title is-size-6">
													📅 Available Date
												</p>
												<ol
													v-if="
														props.row.freeDate
															.length > 0
													"
													type="1"
												>
													<li
														v-for="(free,
														index) in props.row
															.freeDate"
														:key="index"
													>
														{{ free.start }} -
														{{ free.end }}
													</li>
												</ol>
												<p
													v-else
													class="tag is-warning"
												>
													Tidak Ada Data
												</p>
											</div>
										</div>
										<div class="column">
											<div class="content">
												<p class="title is-size-6">
													📅 Unavailable Date
												</p>
												<ol
													v-if="
														props.row.bookedDate
															.length > 0
													"
													type="1"
												>
													<li
														v-for="(booked,
														index) in props.row
															.bookedDate"
														:key="index"
													>
														{{ booked.start }} -
														{{ booked.end }}
													</li>
												</ol>
												<p
													v-else
													class="tag is-warning"
												>
													Tidak Ada Data
												</p>
											</div>
										</div>
									</div>
									<div class="columns">
										<div class="column">
											<div class="content">
												<p class="title is-size-6">
													🏆 Kemampuan (Skill)
												</p>
												<ol
													v-if="
														props.row.skills
															.length > 0
													"
													type="1"
												>
													<li
														v-for="(skill,
														index) in props.row
															.skills"
														:key="index"
													>
														<b>{{
															skill.skillName
														}}</b
														>:
														{{ skill.skillLevel }}
													</li>
												</ol>
												<p
													v-else
													class="tag is-warning"
												>
													Tidak Ada Data
												</p>
											</div>
										</div>
										<div class="column">
											<div class="content">
												<p class="title is-size-6">
													🎒 Training
												</p>
												<ol
													v-if="
														props.row.course
															.length > 0
													"
													type="1"
												>
													<li
														v-for="(course,
														index) in props.row
															.course"
														:key="index"
													>
														{{ course.courseName }}
													</li>
												</ol>
												<p
													v-else
													class="tag is-warning"
												>
													Tidak Ada Data
												</p>
											</div>
										</div>
										<div class="column">
											<div class="content">
												<p class="title is-size-6">
													📜 Certificate
												</p>
												<ol
													v-if="
														props.row.competency
															.length > 0
													"
													type="1"
												>
													<li
														v-for="(competency,
														index) in props.row
															.competency"
														:key="index"
													>
														{{
															competency.competencyName
														}}
													</li>
												</ol>
												<p
													v-else
													class="tag is-warning"
												>
													Tidak Ada Data
												</p>
											</div>
										</div>
									</div>
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
import Tools from "../../../tools.js";
import DataTable from "../../components/dataTable";
import moment from "moment";
import { start } from "repl";
export default {
	components: {
		DataTable
	},
	props: {
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
		apiCheckBooking: {
			type: String,
			required: true
		},
		apiDetailResource: {
			type: String,
			required: true
		}
	},
	data() {
		const today = new Date();

		return {
			canbook: [],
			date: new Date(),
			minDate: new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			),
			minDateEnd: new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			),
			start: new Date(),
			end: new Date(),
			fetchedRes: [],
			checkboxPosition: "left",
			searchQuery: "",
			searchList: true,
			listProject: LISTPROJECT,
			listProjectData: [],
			projectId: "",
			checkedRows: [],
			openedDetail: []
		};
	},
	computed: {
		formatedStart() {
			return moment(this.start).format("DD/MM/YYYY");
		},
		formatedEnd() {
			return moment(this.end).format("DD/MM/YYYY");
		},
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
		},
		checkId() {
			let a = [];
			this.checkedRows.forEach(row => {
				a.push(row.userId);
			});
			return a;
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
		},
		start: function(newdata,olddata){
			this.openedDetail = [];
			this.postDate();	
		},
		end: function(newdata,olddata){
			this.openedDetail = [];
			this.postDate();	
		}
	},
	methods: {
		randomSmile(index) {
			return Tools.randomSmile(index);
		},
		checkForm: function(e) {
			if (this.projectId === "") {
				Tools.notified(this.$toast).alert("Anda Belum Memilih Project");
				e.preventDefault();
			}
			if (this.checkedRows.length === 0) {
				Tools.notified(this.$toast).alert(
					"Anda Belum Memilih Resource"
				);
				e.preventDefault();
			}
		},
		checkIfOpen(detail) {
			let find = this.openedDetail.findIndex(
				bit => bit.userId === detail.userId
			);

			return find !== -1;
		},
		passedCheckedRow(check) {
			this.checkedRows = check;
		},
		removeResource(resource) {
			let findExist = this.fetchedRes.findIndex(
				bit => bit.userId === resource.userId
			);

			if (findExist > -1) {
				this.fetchedRes.splice(findExist, 1);
				Tools.loadStorage("selectedResource").then(selected => {
					let index = selected.resource.findIndex(
						bit => bit.userId === resource.userId
					);

					if (index > -1) {
						selected.resource.splice(index, 1);
						Tools.saveStorage("selectedResource", selected);
					}
				});
			}
		},
		closeModal() {
			this.searchQuery = "";
		},
		book() {
			var a = this.fetchedRes.length;
			let prep = [];
			for (var i = 0; i < a; i++) {
				if (!this.fetchedRes[i].isBooked) {
					prep.push(this.fetchedRes[i].userId);
				}
			}
			this.canbook = prep;
		},
		checkBookable(row) {
			return this.canbook.includes(row.userId);
		},
		postDate(users = undefined, passData = false) {
			this.openedDetail.forEach(detail => this.toggleDetail(detail));

			if (!passData) {
				users = this.fetchedRes.map(({ userId }) => userId);
			}

			let a = moment(this.start).isBefore(this.end);
			let b = moment(this.start).isBefore(this.start);
			if (!a) {
				this.end = this.start;
				this.minDateEnd = new Date(
					this.start.getFullYear(),
					this.start.getMonth(),
					this.start.getDate()
				);
			} else {
				this.minDateEnd = new Date(
					this.start.getFullYear(),
					this.start.getMonth(),
					this.start.getDate()
				);
			}

			let start = moment(this.start).format("DD/MM/YYYY");
			let end = moment(this.end).format("DD/MM/YYYY");
			this.$refs.resTable.clearChecked();

			var self = this;
			Axios.post(
				this.apiCheckBooking,
				{
					batchId: self.$root.batchId,
					users: users,
					start: start,
					end: end
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}
			)
				.then(function(response) {
					// self.fetchedRes = response.data.resource;
					response.data.resource.forEach(row => {
						let index = self.fetchedRes.findIndex(
							bit => bit.userId === row.userId
						);
						if(index!=(-1)){
							self.fetchedRes[index].isBooked = row.isBooked;
						}else {
							self.fetchedRes.push(row);
						}
					})
					self.book();

					if(passData){
						self.fetchedRes.forEach(row => {
							self.fetchDetail(row);
						})
					}
				})
				.catch(function(error) {
					console.log("ACB Error Fetching: 629");
					console.log(error);
					Tools.notified(self.$toast).error(
						"Mohon maaf terjadi sebuah kesalahan. Kami tidak dapat terhubung dengan server. Silakan ulangi beberapa saat lagi. 🙏"
					);
				});
		},
		toggleDetail(row) {
			
			this.$refs.resTable.toggleDetail(row);
			if (this.checkIfOpen(row)) {
				let indexAt = this.openedDetail.findIndex(
					detail => detail.userId === row.userId
				);
				this.openedDetail.splice(indexAt, 1);
			} else {
				this.openedDetail.push(row);
			}
		},
		fetchDetail(row) {
			let self = this;
			return Axios.get(this.apiDetailResource, {
				params: { userId: row.userId }
			})
				.then(function(response) {
					let detail = response.data;
					let idex = self.fetchedRes.findIndex(
						bit => bit.userId === row.userId
					);

					self.fetchedRes[idex].skills = detail.skills;
					self.fetchedRes[idex].course = detail.course;
					self.fetchedRes[idex].competency = detail.competency;
					// self.$refs.resTable.toggleDetail(row);
				})
				.catch(function(error) {
					console.log("ADR Error Fetching: 623");
					console.log(error);
					Tools.notified(self.$toast).error(
						"Mohon maaf terjadi sebuah kesalahan. Kami tidak dapat terhubung dengan server. Silakan ulangi beberapa saat lagi. 🙏"
					);
				});
		}
	},
	mounted() {
		let self = this;
		this.listProjectData = this.listProject;
		
		Tools.loadStorage("selectedResource").then(selected => {
			let saved = selected.resource.map(({ userId }) => userId);
			self.postDate(saved, true);
		});
	}
};
</script>
