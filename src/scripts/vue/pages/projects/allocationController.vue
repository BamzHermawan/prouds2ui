<template>
	<div class="container">
		<nav class="level">
			<div class="level-left">
				<button class="button is-success" @click="newRoleModal()">
					<span
						class="mdi mdi-account-multiple-plus-outline in-left"
					></span>
					<span>Add Member in New Role</span>
				</button>
			</div>
			<div class="level-right">
				<slot name="got-to-resource-booking">
					<a class="button is-info" href="#">LINK</a>
				</slot>
			</div>
		</nav>

		<div
			v-for="(res, index) in resource"
			:key="index"
			style="margin-bottom:25px;"
		>
			<data-table
				:data="res.member"
				:fields="[]"
				:title="
					res.role + (res.level !== '' ? ' [' + res.level + ']' : '')
				"
			>
				<template slot-scope="props">
					<b-table-column field="image" width="40">
						<figure class="image is-32x32">
							<img
								:id="'avatar-row-' + index"
								:src="props.row.avatar"
							/>
						</figure>
					</b-table-column>

					<b-table-column field="nama" label="👨‍💼 Name" sortable>
						<span>{{ props.row.nama }}</span>
					</b-table-column>

					<b-table-column
						field="bu"
						label="🏢 Business Unit"
						sortable
					>
						{{ props.row.bu }}
					</b-table-column>

					<b-table-column field="status" label="💡 Status" sortable>
						<span v-if="props.row.status" class="tag is-success"
							>active</span
						>
						<span v-else class="tag is-dark">inactive</span>
					</b-table-column>

					<b-table-column
						field="start"
						label="📅 Working Period"
						centered
					>
						{{ props.row.start }} - {{ props.row.end }}
					</b-table-column>

					<b-table-column field="activation_link" label="⚡ Action">
						<a
							v-if="props.row.status"
							:href="props.row.deactivation_link"
							class="button is-small is-warning"
							>🔒 Deactivate</a
						>
						<a
							v-else
							:href="props.row.activation_link"
							class="button is-small is-success"
							>🔓 Activate</a
						>
						<a
							class="button is-small is-info"
							@click="
								newRoleModal(props.row, res.role, res.level)
							"
							>⚙ Change Role</a
						>
					</b-table-column>
				</template>

				<template slot="empty">
					<b-message
						v-if="res.member.length == 0"
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
					<a
						@click="assignModal(res.role, res.level)"
						class="card-header-icon"
					>
						<span class="icon">
							<i
								class="mdi mdi-account-plus"
								aria-hidden="true"
							></i>
						</span>
						<span>Add Member</span>
					</a>
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
									res.plan
								}}</span>
							</div>
						</div>
						<div class="control">
							<div class="tags has-addons are-medium">
								<span class="tag is-dark">
									<span style="margin-left:5px;"
										>Resource Actual</span
									>
								</span>
								<span class="tag is-primary">{{
									res.actual
								}}</span>
							</div>
						</div>
					</div>
				</template>

				<template slot="top-body">
					<b-message v-if="res.actual > res.plan" type="is-warning">
						<span style="margin-right:5px;">🛑</span> Jumlah member
						di role ini melebihi dari jumlah plan yang direncanakan
						sejumlah [<b>{{ res.plan }}</b> 👨‍💼]
					</b-message>
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
				<article class="message is-primary">
					<div class="message-header">
						<p>
							<span
								class="tag is-warning is-medium"
								style="padding: 0px 8px; margin-right: 7px;"
								>👨‍💼</span
							>
							{{ modal.title }}
						</p>
					</div>
					<div class="message-body">
						<div class="columns">
							<div class="column">
								<input
									type="hidden"
									name="memberRole"
									v-model="modal.selectedRole.value"
								/>
								<b-field label="Role">
									<b-select
										expanded
										v-if="modal.selectedRole.display"
										v-model="modal.selectedRole.value"
										placeholder="Pilih Role Member"
										@change.native="
											fetchLevel(modal.selectedRole.value)
										"
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
							</div>
							<div class="column">
								<input
									type="hidden"
									name="roleLevel"
									v-model="modal.selectedLevel.value"
								/>
								<b-field label="Level">
									<b-select
										v-if="
											modal.selectedLevel.display &&
												fetchedLevel.length > 0
										"
										expanded
										:disabled="
											modal.selectedRole.value === null ||
												modal.selectedRole.value === ''
										"
										v-model="modal.selectedLevel.value"
										placeholder="Pilih Level Member"
										:loading="modal.selectedLevel.loading"
									>
										<option
											selected
											style="display: none;"
										></option>
										<option
											v-for="(level,
											index) in fetchedLevel"
											:key="index"
											>{{ level }}</option
										>
									</b-select>
									<b-tag
										v-else
										size="is-medium"
										style="width: 100%;"
										:type="
											fetchedLevel.length > 0
												? 'is-info'
												: 'is-warning'
										"
										>{{
											fetchedLevel.length > 0
												? modal.selectedLevel.value
												: !!modal.selectedRole.value
												? "🚫 No-Level Role"
												: "⚠ Pick a Role First"
										}}</b-tag
									>
								</b-field>
							</div>
						</div>
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
									>👨‍💼 {{ user.nama }} - 🏢
									{{ user.bu }}</option
								>
							</b-select>
						</b-field>

						<b-field
							v-show="modal.selectedUser.nik !== ''"
							class="animated fadeIn"
						>
							<div class="box">
								<article class="media">
									<div class="media-left">
										<figure class="image is-64x64">
											<img
												@load="modal.imgLoader = false"
												v-show="!modal.imgLoader"
												:src="modal.selectedUser.avatar"
											/>
											<b-loading
												v-show="modal.imgLoader"
												:is-full-page="false"
												active
											></b-loading>
										</figure>
									</div>
									<div class="media-content">
										<div class="content">
											<h1 class="title is-size-4">
												{{ modal.selectedUser.nama }}
											</h1>
											<h2 class="subtitle is-size-6">
												🆔
												{{ modal.selectedUser.nik }} |
												🏢 {{ modal.selectedUser.bu }}
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
								Send Assignment
							</button>
						</b-field>
					</div>
				</article>
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
		},
		apiFetchLevel: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			resource: RESOURCE,
			users: USERS,
			searchQuery: "",
			modal: {
				display: false,
				imgLoader: true,
				searchList: true,
				title: "Assign Member",
				selectedUser: {
					nik: "",
					nama: "",
					bu: "",
					avatar: ""
				},
				selectedRole: {
					value: null,
					display: true
				},
				selectedLevel: {
					value: null,
					display: true,
					loading: false
				},
				userdata: [],
				formTarget: ""
			},
			fetchedLevel: []
		};
	},
	computed: {
		selectedOptions: {
			get: function() {
				return [this.modal.selectedUser.nik];
			},
			set: function(newValue = []) {
				this.modal.imgLoader = true;
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
			if (this.searchQuery !== "") {
				let self = this;
				this.modal.userdata = this.users.filter(user =>
					Object.keys(user).find(key => {
						if (typeof user[key] === "string") {
							return user[key]
								.toLowerCase()
								.includes(self.searchQuery.toLowerCase());
						} else {
							return user[key]
								.toString()
								.toLowerCase()
								.includes(self.searchQuery.toLowerCase());
						}
					})
				);
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
		newRoleModal(member = null, role = null, level = null) {
			if (member === null) {
				this.modal.title = "Assign New Role";
				this.modal.formTarget = this.actionNewRole;
				this.modal.selectedRole.display = true;
				this.modal.selectedRole.value = role;
				this.modal.selectedLevel.display = true;
				this.modal.selectedLevel.value = level;
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
				this.modal.selectedRole.value = role;

				this.modal.selectedUser.nik = member.nik;
				this.modal.selectedUser.bu = member.bu;
				this.modal.selectedUser.nama = member.nama;
				this.modal.selectedUser.avatar = member.avatar;
				this.modal.imgLoader = true;
				this.modal.searchList = false;
				this.modal.display = true;

				if (level !== "") {
					let self = this;
					self.modal.selectedLevel.display = true;
					this.fetchLevel(role).finally(function() {
						self.modal.selectedLevel.value = level;
					});
				} else {
					this.fetchedLevel = [];
					this.modal.selectedLevel.display = false;
					this.modal.selectedLevel.value = "";
				}
			}
		},
		assignModal(role, level) {
			this.modal.title = "Assign New Member";
			this.modal.formTarget = this.actionNewMember;
			this.modal.selectedRole.display = false;
			this.modal.selectedRole.value = role;

			if (level !== "") {
				this.fetchedLevel.push(level);
				this.modal.selectedLevel.display = false;
				this.modal.selectedLevel.value = level;
			} else {
				this.fetchedLevel = [];
				this.modal.selectedLevel.display = false;
				this.modal.selectedLevel.value = "";
			}
			this.modal.searchList = true;
			this.modal.display = true;
		},
		fetchLevel(role) {
			let self = this;
			this.modal.selectedLevel.value = null;
			this.modal.selectedLevel.loading = true;
			return Axios.get(this.apiFetchLevel, {
				params: {
					role: role
				}
			})
				.then(function(response) {
					// handle success
					self.fetchedLevel = response.data;
					self.modal.selectedLevel.display = response.data.length > 0;
				})
				.catch(function(error) {
					// handle error
					self.$toast.open({
						duration: 5000,
						message: `Mohon Maaf, Kami tidak dapat menghubungi server terkait data level.`,
						position: "is-top",
						type: "is-danger"
					});
				})
				.then(function() {
					self.modal.selectedLevel.loading = false;
				});
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
	}
};
</script>

