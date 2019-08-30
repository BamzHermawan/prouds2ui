<template>
	<section class="columns">
		<div
			class="column is-section is-3-desktop is-4-tablet is-hidden-touch has-background-light"
		>
			<section v-if="!showAssignPm" class="info">
				<p class="title is-size-5" style="margin-bottom:10px;">
					Business Unit
				</p>
				<b-field style="margin-bottom: 18px;">
					<b-select placeholder="Select Business Unit" expanded>
						<option value="pmo">PMO</option>
						<option value="cdo">CDO</option>
						<option value="bsd">BSD</option>
					</b-select>
				</b-field>
				<b-field style="margin-bottom: 5px;" grouped>
					<b-field label="CPI" label-position="on-border" expanded>
						<b-input readonly value="0.92"></b-input>
					</b-field>
					<b-field label="SPI" label-position="on-border" expanded>
						<b-input readonly value="0.92"></b-input>
					</b-field>
					<b-field expanded>
						<b-dropdown aria-role="list">
							<button class="button is-primary" slot="trigger">
								<span>⚙</span>
								<b-icon icon="menu-down"></b-icon>
							</button>

							<b-dropdown-item
								aria-role="listitem"
								@click="assignPM()"
								>Assign PM
							</b-dropdown-item>
							<b-dropdown-item aria-role="listitem"
								>Merge</b-dropdown-item
							>
							<b-dropdown-item aria-role="listitem"
								>Detail</b-dropdown-item
							>
						</b-dropdown>
					</b-field>
				</b-field>
				<b-field>
					<a class="button is-fullwidth">Non-Project</a>
				</b-field>
			</section>
			<section class="info">
				<p class="title is-size-5" style="margin-bottom:10px;">
					New Projects
				</p>
				<hr
					class="has-background-grey-lighter"
					style="margin-top: 5px; margin-bottom: 10px;"
				/>
				<b-field>
					<b-input
						placeholder="Search..."
						type="search"
						icon="magnify"
					>
					</b-input>
				</b-field>
				<article v-for="n in 3" :key="n" class="media">
					<div class="media-content">
						<div class="content">
							<p class="title is-size-6 is-marginless">
								Project Name
							</p>
							<p class="is-marginless">
								<span>P-SCC-XXXA</span>
								<span style="margin-left: 10px;">USD. 300</span>
							</p>
							<p class="is-size-7">AM: Wawan Surnawan, M.T.</p>
						</div>
					</div>
					<div v-if="showAssignPm" class="media-right">
						<b-dropdown aria-role="list">
							<button
								class="button is-primary is-small"
								slot="trigger"
							>
								<span>⚙</span>
							</button>

							<b-dropdown-item
								aria-role="listitem"
								href="project/allocation.html"
								tag="a"
								>Assign Member
							</b-dropdown-item>
							<b-dropdown-item aria-role="listitem"
								>Merge</b-dropdown-item
							>
							<b-dropdown-item aria-role="listitem"
								>Detail</b-dropdown-item
							>
						</b-dropdown>
					</div>
					<div v-else class="media-right">
						<b-dropdown aria-role="list">
							<button
								class="button is-primary is-small"
								slot="trigger"
							>
								<span>⚙</span>
							</button>

							<b-dropdown-item
								aria-role="listitem"
								@click="assignPM()"
								>Assign PM
							</b-dropdown-item>
							<b-dropdown-item aria-role="listitem"
								>Merge</b-dropdown-item
							>
							<b-dropdown-item aria-role="listitem"
								>Detail</b-dropdown-item
							>
						</b-dropdown>
					</div>
				</article>
			</section>
		</div>
		<div class="column is-section">
			<section class="main-content">
				<p class="title is-size-3">BU: {{bu}}</p>
				<p class="subtitle is-size-5">📁 Total Project [ {{totalProject}} ]</p>
			</section>

			<section class="info">
				<nav class="level is-mobile">
					<div class="level-item has-text-centered">
						<div
							class="box is-level-widget"
							@click="filter('behind_schedule', 1)"
						>
							<p class="heading">Behind Schedule</p>
							<p class="title">📁 {{behindSchedule}}</p>
						</div>
					</div>
					<div class="level-item has-text-centered">
						<div
							class="box is-level-widget"
							@click="filter('bast_delay', 2)"
						>
							<p class="heading">BAST Delay</p>
							<p class="title">📁 {{bastDelay}}</p>
						</div>
					</div>
					<div class="level-item has-text-centered">
						<div
							class="box is-level-widget"
							@click="filter('top_delay', 3)"
						>
							<p class="heading">TOP Delay</p>
							<p class="title">📁 {{topDelay}}</p>
						</div>
					</div>
				</nav>
			</section>

			<section class="info" style="margin-bottom: 1.25rem;">
				<data-table
					title="Project List"
					:data="projects"
					:fields="[]"
					ref="widget"
				>
					<template slot-scope="props">
						<b-table-column
							field="project_name"
							label="Project Name"
							sortable
						>
							<span>{{ props.row.project_name }}</span>
						</b-table-column>
						<b-table-column field="iwo" label="IWO" sortable>
							<span>{{ props.row.iwo }}</span>
						</b-table-column>
						<b-table-column field="pm" label="PM" sortable>
							<span>{{ props.row.pm }}</span>
						</b-table-column>
						<b-table-column field="status" label="Status" sortable>
							<span>{{ props.row.status }}</span>
						</b-table-column>
						<b-table-column
							field="progress"
							label="Progress"
							sortable
						>
							<span>{{ props.row.progress }}</span>
						</b-table-column>
					</template>
				</data-table>
			</section>
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
	</section>
</template>

<script>
import DataTable from "../components/dataTable";
export default {
	components: {
		DataTable
	},
	props: {
		actionSend: {
			type: String,
			required: true
		},
		projectId: {
			type: String,
			required: true
		},
		showAssignPm: {
			type: Boolean,
			default: false
		},
		totalProject: {
			type: String,
			required: true
		},
		bu: {
			type: String,
			required: true
		},
		behindSchedule: {
			type: String,
			required: true
		},
		bastDelay: {
			type: String,
			required: true
		},
		topDelay: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			projects: DATA,
			dataku: DATA,
			users: USERS,
			searchQuery: "",
			search: "",
			modal: {
				display: false,
				imgLoader: true,
				searchList: true,
				title: "Assign PM",
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
			topFilter: false,
			noFilter: ""
		};
	},
	methods: {
		closeModal() {
			this.searchQuery = "";
			this.modal.display = false;
		},
		assignPM() {
			this.modal.formTarget = this.actionSend;
			this.modal.searchList = true;
			this.modal.display = true;
			this.modal.selectedUser = {
				nik: "",
				nama: "",
				bu: "",
				avatar: ""
			};
		},
		filter(filter, no) {
			if (this.projectFilter === true && this.noFilter !== "") {
				if (this.noFilter === no) {
					this.projects = this.dataku;
					this.noFilter = "";
					this.projectFilter = false;
				} else {
					this.projects = this.dataku;
					let self = this;
					this.projects = this.projects.filter(post => post[filter]);
					this.projectFilter = true;
					this.noFilter = no;
				}
			} else {
				let self = this;
				this.projects = this.projects.filter(post => post[filter]);
				this.projectFilter = true;
				this.noFilter = no;
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
	mounted() {
		this.modal.userdata = this.users;
		console.log(this.showAssignPm);

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

