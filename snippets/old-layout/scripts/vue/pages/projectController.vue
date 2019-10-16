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
				<article v-for="n in perPage" :key="n" class="media">
					<div class="media-content">
						<div class="content">
							<p class="title is-size-6 is-marginless">
								{{ newProjectPm[hitung(n)].projectName }}
							</p>
							<p class="is-marginless">
								<span>{{ newProjectPm[hitung(n)].iwo }}</span>
								<span style="margin-left: 10px;">{{
									newProjectPm[hitung(n)].projectAmount
								}}</span>
							</p>
							<p class="is-size-7">
								PM:
								{{ newProjectPm[hitung(n)].pm }}
							</p>
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
				<b-pagination
					:total="total"
					:current.sync="current"
					:simple="true"
					:per-page="perPage"
					order="is-right"
					style="margin-top:29px"
				>
				</b-pagination>
			</section>
		</div>
		<div class="column is-section">
			<section class="main-content">
				<p class="title is-size-3">BU: {{ bu }}</p>
				<p class="subtitle is-size-5">
					📁 Total Project [ {{ totalProject }} ]
				</p>
			</section>

			<section class="info">
				<nav class="level is-mobile">
					<div class="level-item has-text-centered">
						<div
							class="box is-level-widget searchFilter behind_schedule"
							@click="filter('behind_schedule', 1)"
						>
							<p class="heading">Behind Schedule</p>
							<p class="title">📁 {{ behindSchedule }}</p>
						</div>
					</div>
					<div class="level-item has-text-centered">
						<div
							class="box is-level-widget searchFilter bast_delay"
							@click="filter('bast_delay', 2)"
						>
							<p class="heading">BAST Delay</p>
							<p class="title">📁 {{ bastDelay }}</p>
						</div>
					</div>
					<div class="level-item has-text-centered">
						<div
							class="box is-level-widget searchFilter top_delay"
							@click="filter('top_delay', 3)"
						>
							<p class="heading">TOP Delay</p>
							<p class="title">📁 {{ topDelay }}</p>
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
							<span
								><a :href="props.row.link">{{
									props.row.project_name
								}}</a></span
							>
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
						<b-table-column field="action" label="Action">
							<b-dropdown
								aria-role="list"
								position="is-bottom-left"
								class="is-small"
							>
								<button
									class="button is-info is-small"
									slot="trigger"
								>
									<span>⚙ Action</span>
								</button>
								<b-dropdown-item
									v-for="(btn, index) in props.row
										.dropdownAction"
									:key="index"
									aria-role="listitem"
									has-link
								>
									<a @click="checkAction(btn.link, btn.label)"
										><span>{{ btn.label }}</span></a
									>
								</b-dropdown-item>
							</b-dropdown>
						</b-table-column>
					</template>
					<template slot="top-right">
						<div class="navbar-menu">
							<div class="navbar-end">
								<b-dropdown
									position="is-bottom-left"
									aria-role="menu"
								>
									<button
										class="button is-info"
										slot="trigger"
									>
										<span>Filter</span>
									</button>
									<b-dropdown-item
										aria-role="menu-item"
										:focusable="false"
										custom
										paddingless
									>
										<section class="modal-card-body">
											<div class="field">
												<b-checkbox
													class="have-padding"
													type="is-info"
													v-model="filterCheckbox"
													native-value="Not Started"
													>Not Started</b-checkbox
												>
											</div>
											<div class="field">
												<b-checkbox
													class="have-padding"
													type="is-info"
													v-model="filterCheckbox"
													native-value="In Progress"
													>In Progress</b-checkbox
												>
											</div>
											<div class="field">
												<b-checkbox
													class="have-padding"
													type="is-info"
													v-model="filterCheckbox"
													native-value="Archived"
													>Archived</b-checkbox
												>
											</div>
											<div class="field">
												<b-checkbox
													class="have-padding"
													type="is-info"
													v-model="filterCheckbox"
													native-value="Proposed"
													>Proposed</b-checkbox
												>
											</div>
											<div class="field">
												<b-checkbox
													class="have-padding"
													type="is-info"
													v-model="filterCheckbox"
													native-value="Cancelled"
													>Cancelled</b-checkbox
												>
											</div>
											<div class="field">
												<b-checkbox
													class="have-padding"
													type="is-info"
													v-model="filterCheckbox"
													native-value="In Planning"
													>In Planning</b-checkbox
												>
											</div>
											<div class="field">
												<b-checkbox
													class="have-padding"
													type="is-info"
													v-model="filterCheckbox"
													native-value="On Hold"
													>On Hold</b-checkbox
												>
											</div>
											<div class="field">
												<b-checkbox
													class="have-padding"
													type="is-info"
													v-model="filterCheckbox"
													native-value="Completed"
													>Completed</b-checkbox
												>
											</div>
										</section>
									</b-dropdown-item>
								</b-dropdown>
							</div>
						</div>
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
			newProjectPm: NEWPROJECTPM,
			users: USERS,
			searchQuery: "",
			search: "",
			filterCheckbox: [],
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
			noFilter: "",
			projectFilter: "",
			total: NEWPROJECTPM.length,
			current: 1,
			perPage: 4
		};
	},
	methods: {
		hitung(n) {
			let a = (this.current - 1) * this.perPage + (n - 1);
			return a;
		},
		checkAction(link, label) {
			this.$dialog.confirm({
				title: label + " Project",
				message:
					"Are you sure you want to <b>" +
					label +
					"</b> this project ?",
				confirmText: "Oke",
				type: "is-danger",
				hasIcon: true,
				onConfirm: () => (window.location.href = link)
			});
		},
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
			let find = document.querySelectorAll(".searchFilter.is-active");
			for (let i = 0; i < find.length; i++) {
				find[i].classList.remove("is-active");
			}
			if (this.projectFilter !== "" && filter === this.projectFilter) {
				this.projects = this.dataku;
				this.projectFilter = "";
			} else {
				this.projectFilter = filter;
				this.projects = this.dataku.filter(post => {
					if (!post.hasOwnProperty(filter)) {
						return false;
					} else {
						return post[filter];
					}
				});

				let card = document.querySelector("." + filter);
				card.classList.add("is-active");
			}
		},
		filterCheck(filter) {
			if (filter.length > 0) {
				this.projects = this.dataku;
				this.projects = this.projects.filter(project =>
					this.filterCheckbox.includes(project.status)
				);
			} else {
				this.projects = this.dataku;
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
		},
		filterCheckbox: function(newQuery, oldQuery) {
			this.filterCheck(newQuery);
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

