<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<form :action="actionEvent" method="POST" enctype="multipart/form-data">
			<section class="modal-card-body">
				<div class="columns">
					<div class="column is-2">
						<p class="label">Task Name</p>
					</div>
					<div class="column">
						<b-message type="is-info" class="is-on-field">
							<p class="has-text-dark">{{ taskName }}</p>
						</b-message>
					</div>
				</div>

				<div class="columns">
					<div class="column">
						<div class="columns">
							<div class="column is-4">
								<p class="label">Start Date</p>
							</div>
							<div class="column">
								<b-message type="is-info" class="is-on-field">
									<p class="has-text-dark">
										{{ start | moment }}
									</p>
								</b-message>
							</div>
						</div>
					</div>
					<div class="column">
						<div class="columns">
							<div class="column is-4">
								<p class="label">End Date</p>
							</div>
							<div class="column">
								<b-message type="is-info" class="is-on-field">
									<p class="has-text-dark">
										{{ finish | moment }}
									</p>
								</b-message>
							</div>
						</div>
					</div>
					<input type="hidden" name="users" v-model="checkId" />
				</div>

				<div class="columns">
					<div class="column is-6">
						<b-message
							type="is-light"
							class="has-paddingless-body"
							:closable="false"
							:title="
								'Currently assigned (' +
									task.resource.length +
									')'
							"
						>
							<br />
							<data-table-no-card
								:data="task.resource"
								:fields="[]"
								ref="widget"
								striped
								:per-page="5"
							>
								<template slot-scope="props">
									<b-table-column
										field="name"
										label="Name"
										sortable
										class="align-middle"
									>
										<p>{{ props.row.name }}</p>
									</b-table-column>
									<b-table-column
										field="assigned_role"
										label="Assigned Role"
										sortable
										class="align-middle"
									>
										<p>{{ props.row.role }}</p>
									</b-table-column>
									<b-table-column
										field="action"
										label="Action"
										width="75"
										centered
										class="align-middle"
									>
										<b-button
											tag="a"
											size="is-small"
											type="is-success"
											style="min-width:95px"
											@click="setComplete(props.row)"
											>Set Complete</b-button
										>
									</b-table-column>
								</template>
								<template slot="empty">
									<span class="white-space"></span>
									<b-message type="is-warning">
										<p class="has-text-centered">
											Sorry, we can't find any data
											related
										</p>
									</b-message>
								</template>
								<template slot="top-right">
									<span></span>
								</template>
							</data-table-no-card>
						</b-message>
					</div>

					<div class="column is-6">
						<b-message
							type="is-light"
							class="has-paddingless-body"
							:closable="false"
							:title="
								'Available (' + resourceAvailable.length + ')'
							"
						>
							<input
								type="hidden"
								name="memberRole"
								v-model="selectedRole.value"
							/>
							<br />
							<b-field label="Assigned as">
								<b-select
									expanded
									v-model="selectedRole.value"
									placeholder="Select Assigned Role"
									required
								>
									<slot name="role-option"></slot>
								</b-select>
							</b-field>
							<b-field label="Select Team Member">
								<b-input
									placeholder="Search by User or Role"
									type="search"
									icon="magnify"
									v-model="searchQuery"
									v-show="searchList"
								>
								</b-input>
							</b-field>
							<b-field>
								<input
									type="hidden"
									name="userId"
									v-model="checkboxGroup"
								/>
								<b-select
									multiple
									expanded
									v-show="searchList"
									native-size="5"
									v-model="selectedOptions"
								>
									<option
										v-for="(user, index) in userdata"
										:key="index"
										:value="user.nik"
									>
										<b-checkbox
											v-model="checkboxGroup"
											:native-value="user.nik"
										>
											{{ user.nama + " - " + user.role }}
										</b-checkbox>
									</option>
								</b-select>
							</b-field>
							<b-field
								v-show="selectedUser.nik !== ''"
								class="animated fadeIn"
							>
								<div class="box">
									<article class="media">
										<div class="media-content">
											<div class="content">
												<h1 class="title is-size-4">
													{{ selectedUser.nama }}
												</h1>
												<h2 class="subtitle is-size-6">
													{{ selectedUser.role }}
													|
													{{ selectedUser.bu }}
												</h2>
											</div>
										</div>
									</article>
								</div>
							</b-field>
						</b-message>
					</div>
				</div>

				<input type="hidden" name="workplanId" v-model="workplanId" />
				<input type="hidden" name="taskID" v-model="taskID" />
			</section>
			<section class="modal-card-foot is-clearfix is-block">
				<div class="is-pulled-right">
					<b-button type="is-danger" @click="$parent.close()"
						>Cancel</b-button
					>
					<button class="button is-success" type="submit">
						Update Task Resource
					</button>
				</div>
			</section>
		</form>
	</div>
</template>

<script>
import Moment from "helper-moment";
import { dataTableNoCard } from "components";
import { notified, checkConnection } from "helper-tools";
import api from "helper-apis";
export default {
	components: {
		dataTableNoCard
	},
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		workplanId: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dataBaru: GANTT,
			resourceAvailable: RESOURCE_AVAILABLE,
			taskName: this.task.pName,
			start: Moment(this.task.pStart).format("DD/MM/YYYY"),
			finish: Moment(this.task.pEnd).format("DD/MM/YYYY"),
			checkedRows: [],
			taskID: this.task.pID,
			searchList: true,
			selectedUser: {
				nik: "",
				nama: "",
				bu: "",
				avatar: "",
				role: ""
			},
			selectedRole: {
				value: null,
				display: true
			},
			userdata: [],
			formTarget: "",
			searchQuery: "",
			checkboxGroup: []
		};
	},
	watch: {
		searchQuery: function(newQuery, oldQuery) {
			if (
				newQuery !== "" &&
				newQuery !== undefined &&
				newQuery !== null
			) {
				let self = this;
				this.userdata = this.resourceAvailable.filter(user => {
					if (
						user.nama !== undefined &&
						user.nama !== null &&
						user.nama !== ""
					) {
						if (typeof user.nama === "string") {
							return (
								user.nama
									.toLowerCase()
									.includes(newQuery.toLowerCase()) ||
								user.role
									.toLowerCase()
									.includes(newQuery.toLowerCase())
							);
						}
					}

					return false;
				});
			} else {
				this.userdata = this.resourceAvailable;
			}
		}
	},
	methods: {
		setComplete(val) {
			this.isLoading = true;
			let self = this;
			let bundle = { user_id: val.user_id };
			api.setComplete(bundle)
				.then(response => {
					// let data = response.data;
					// self.resourceAvailable = data.resource;
					if (checkConnection(self.notification)) {
						notified(self.$notification).info("Success");
					}
				})
				.catch(function(error) {
					console.log("error asking for set complete");
					if (checkConnection(self.notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				});
		}
	},
	computed: {
		checkId() {
			let a = [];
			this.checkedRows.forEach(row => {
				a.push(row.userid);
			});
			return a;
		},
		selectedOptions: {
			get: function() {
				if (this.selectedUser.nik !== "") {
					if (this.checkboxGroup !== []) {
						var index = this.checkboxGroup.indexOf(
							this.selectedUser.nik
						);

						if (index > -1) {
							this.checkboxGroup.splice(index, 1);
						} else {
							this.checkboxGroup.push(this.selectedUser.nik);
						}
					}
				}
				return [this.selectedUser.nik];
			},
			set: function(newValue = []) {
				if (newValue.length > 0) {
					let self = this;
					let nik = newValue.shift();
					let found = this.userdata.filter(user => user.nik == nik);

					this.selectedUser = found.shift();
				} else {
					this.selectedUser = {
						nik: "",
						nama: "",
						bu: "",
						avatar: ""
					};
				}
			}
		}
	},
	mounted() {
		this.userdata = this.resourceAvailable;
	}
};
</script>