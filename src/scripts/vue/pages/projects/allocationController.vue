<template>
	<div class="container">
		<nav class="level">
			<div class="level-left">
				<button class="button is-success" @click="newRoleModal()">
					<span
						class="mdi mdi-account-multiple-plus-outline in-left"
					></span>
					<span>Assign New Member</span>
				</button>
			</div>
			<div class="level-right">
				<slot name="got-to-resource-booking"></slot>
			</div>
		</nav>

		<slot name="summary-plan"></slot>

		<div style="margin-bottom:25px;">
			<data-table
				:data="resource.member"
				:fields="[]"
				title="Resource List"
				:per-page="3"
				:show-all="false"
				:row-class="row => !row.status && 'has-text-grey-light'"
			>
				<template slot-scope="props">
					<b-table-column field="nama" label="Name" sortable>
						<span>{{ props.row.nama }}</span>
					</b-table-column>

					<b-table-column field="bu" label="Business Unit" sortable>
						{{ props.row.bu }}
					</b-table-column>

					<b-table-column
						field="assigned_role"
						label="Assigned Role"
						sortable
					>
						{{ props.row.assigned_role }}
					</b-table-column>

					<b-table-column field="job_role" label="Job Role" sortable>
						{{ props.row.job_role }}
					</b-table-column>

					<b-table-column field="rate" label="Rate (Rp)" sortable>
						{{ props.row.rate | number_format }}
					</b-table-column>

					<b-table-column field="action" label="Action">
						<a
							@click="
								confirmUnassign(
									props.row.unassign_link,
									props.row.nama,
									props.row.assigned_role
								)
							"
							class="button is-small is-danger"
							><span
								class="mdi mdi-account-remove in-left"
							></span>
							Unassign</a
						>
						<a
							class="button is-small is-info"
							@click="newRoleModal(props.row)"
							>⚙ Change Role</a
						>
					</b-table-column>
				</template>

				<template slot="empty">
					<b-message
						v-if="resource.member.length == 0"
						type="is-warning"
						class="has-text-centered"
					>
						No User Assigned In This Role 😢.
					</b-message>
					<b-message
						v-else
						type="is-warning"
						class="has-text-centered"
					>
						No User Found 😢.
					</b-message>
				</template>

				<template slot="head-right">
					<span></span>
				</template>

				<template slot="top-right">
					<div class="field is-grouped">
						<div class="control">
							<div class="tags has-addons are-medium">
								<span class="tag is-dark">
									<span style="margin-left:5px;"
										>Resource Plan</span
									>
								</span>
								<span class="tag is-primary">{{
									resource.plan
								}}</span>
							</div>
						</div>
						<div class="control">
							<div class="tags has-addons are-medium">
								<span class="tag is-dark">
									<span style="margin-left:5px;"
										>Allocated</span
									>
								</span>
								<span class="tag is-primary">{{
									resource.actual
								}}</span>
							</div>
						</div>
					</div>
				</template>

				<template slot="top-body">
					<slot name="resourceAlert"></slot>
				</template>
			</data-table>
		</div>

		<b-modal
			:active.sync="modal.display"
			width="500px"
			@close="closeModal()"
		>
			<form :action="modal.formTarget" method="POST">
				<input type="hidden" name="projectId" v-model="projectId" />
				<div class="modal-card" style="width: auto;">
					<header class="modal-card-head">
						<p class="modal-card-title">👨‍💼 {{ modal.title }}</p>
					</header>
					<section class="modal-card-body">
						<input
							type="hidden"
							name="memberRole"
							v-model="modal.selectedRole.value"
						/>
						<b-field label="Assigned Role">
							<b-select
								expanded
								v-if="modal.selectedRole.display"
								v-model="modal.selectedRole.value"
								placeholder="Pilih Role Member"
							>
								<slot name="role-option"></slot>
							</b-select>
							<b-tag
								v-else
								size="is-medium"
								style="width: 100%;"
								type="is-info"
								>{{ modal.selectedRole.value }}</b-tag
							>
						</b-field>
						<b-field>
							<b-input
								placeholder="Search User..."
								type="search"
								icon="magnify"
								v-model="searchQuery"
								v-show="modal.searchList"
							>
							</b-input>
						</b-field>
						<b-field>
							<input
								type="hidden"
								name="userId"
								v-model="selectedOptions"
							/>
							<b-select
								multiple
								expanded
								v-show="modal.searchList"
								native-size="5"
								v-model="selectedOptions"
							>
								<option
									v-for="(user, index) in modal.userdata"
									:key="index"
									:value="user.nik"
									>{{ user.nama }}</option
								>
							</b-select>
						</b-field>
						<b-field
							v-show="modal.selectedUser.nik !== ''"
							class="animated fadeIn"
						>
							<div class="box">
								<article class="media">
									<div class="media-content">
										<div class="content">
											<h1 class="title is-size-4">
												{{ modal.selectedUser.nama }}
											</h1>
											<h2 class="subtitle is-size-6">
												{{ modal.selectedUser.role }} |
												{{ modal.selectedUser.bu }}
											</h2>
										</div>
									</div>
								</article>
							</div>
						</b-field>
						<b-field style="margin-top:35px;">
							<button
								type="submit"
								class="button is-success is-fullwidth"
							>
								ASSIGN
							</button>
						</b-field>
					</section>
				</div>
			</form>
		</b-modal>
	</div>
</template>

<script>
import Axios from "axios";
import DataTable from "../../components/dataTable";
export default {
	components: {
		DataTable
	},
	props: {
		actionNewRole: {
			type: String,
			required: true
		},
		actionNewMember: {
			type: String,
			required: true
		},
		actionChangeRole: {
			type: String,
			required: true
		},
		projectId: {
			type: String,
			required: true
		},
		alertMessage: {
			type: String
		},
		alertType: {
			type: String
		}
	},
	data() {
		return {
			resource: RESOURCE,
			users: USERS,
			searchQuery: "",
			modal: {
				display: false,
				searchList: true,
				title: "Assign Member",
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
				formTarget: ""
			}
		};
	},
	computed: {
		selectedOptions: {
			get: function() {
				return [this.modal.selectedUser.nik];
			},
			set: function(newValue = []) {
				if (newValue.length > 0) {
					let self = this;
					let nik = newValue.shift();
					let found = this.modal.userdata.filter(
						user => user.nik == nik
					);

					this.modal.selectedUser = found.shift();
				} else {
					this.modal.selectedUser = {
						nik: "",
						nama: "",
						bu: "",
						avatar: ""
					};
				}
			}
		}
	},
	watch: {
		searchQuery: function(newQuery, oldQuery) {
			if (
				newQuery !== "" &&
				newQuery !== undefined &&
				newQuery !== null
			) {
				let self = this;
				this.modal.userdata = this.users.filter(user => {
					if (
						user.nama !== undefined &&
						user.nama !== null &&
						user.nama !== ""
					) {
						if (typeof user.nama === "string") {
							return user.nama
								.toLowerCase()
								.includes(newQuery.toLowerCase());
						}
					}

					return false;
				});
			} else {
				this.modal.userdata = this.users;
			}
		}
	},
	methods: {
		closeModal() {
			this.searchQuery = "";
			this.modal.display = false;
		},
		confirmUnassign(link, name, role) {
			this.$dialog.confirm({
				message:
					"Are you sure want to <b class='has-text-danger'>UNASSIGN</b>:<br><b>" +
					name +
					"</b> as <b>" +
					role +
					"</b> ?",
				type: "is-danger",
				confirmText: "Unassign " + name,
				onConfirm: () => {
					window.location = link;
				}
			});
		},
		newRoleModal(member = null) {
			if (member === null) {
				this.modal.title = "Assign New Member";
				this.modal.formTarget = this.actionNewRole;
				this.modal.selectedRole.display = true;
				this.modal.selectedRole.value = null;
				this.modal.searchList = true;
				this.modal.display = true;
				this.modal.selectedUser = {
					nik: "",
					nama: "",
					bu: "",
					avatar: ""
				};
			} else {
				this.modal.title = "Change Role";
				this.modal.formTarget = this.actionChangeRole;
				this.modal.selectedRole.display = true;
				this.modal.selectedRole.value = member.assinged_role;

				this.modal.selectedUser.nik = member.nik;
				this.modal.selectedUser.bu = member.bu;
				this.modal.selectedUser.nama = member.nama;
				this.modal.selectedUser.role = member.assigned_role;
				this.modal.searchList = false;
				this.modal.display = true;
			}
		},
		assignModal(role) {
			this.modal.title = "Assign New Member";
			this.modal.formTarget = this.actionNewMember;
			this.modal.selectedRole.display = false;
			this.modal.selectedRole.value = role;

			this.modal.searchList = true;
			this.modal.display = true;
		}
	},
	mounted() {
		this.modal.userdata = this.users;

		if (this.alertMessage !== undefined && this.alertMessage !== "") {
			let type = [
				"is-light",
				"is-dark",
				"is-info",
				"is-warning",
				"is-danger",
				"is-success"
			];

			if (!type.includes(this.alertType)) {
				type = "is-light";
			} else {
				type = this.alertType;
			}

			this.$notification.open({
				duration: 5000,
				message: this.alertMessage,
				position: "is-top-right",
				type: type
			});
		}
	},
	filters: {
		number_format(str) {
			str += "";
			var x = str.split(".");
			var x1 = x[0];
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, "$1" + "," + "$2");
			}
			return x1;
		}
	}
};
</script>
