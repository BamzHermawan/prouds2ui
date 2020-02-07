<template>
	<div>
		<b-field horizontal label="Parent">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ parentName }}</span
			>
		</b-field>
		<b-field horizontal label="Task">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ task.pName }}</span
			>
		</b-field>
		<b-field horizontal label="Task Schedule">
			<b-field expanded>
				<div class="control">
					<span class="button is-static is-info-blend"
						>Start Date</span
					>
				</div>
				<div class="control is-expanded">
					<p
						class="button is-static is-fullwidth is-light-blend"
						style="justify-content: start;"
					>
						{{ start | fulldate }}
					</p>
				</div>
			</b-field>
			<b-field expanded>
				<div class="control">
					<span class="button is-static is-info-blend">End Date</span>
				</div>
				<div class="control is-expanded">
					<p
						class="button is-static is-fullwidth is-light-blend"
						style="justify-content: start;"
					>
						{{ finish | fulldate }}
					</p>
				</div>
			</b-field>
		</b-field>
		<b-field horizontal label="Assigned Role">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ roleName }}</span
			>
		</b-field>

		<hr />

		<div v-show="displayTable" class="container" style="min-height: 175px;">
			<nav class="level">
				<div class="level-left">
					<b-field>
						<b-input
							placeholder="Search..."
							type="search"
							icon="magnify"
							v-model="search"
							style="margin-right: 10px;"
						>
						</b-input>
					</b-field>
				</div>
				<div class="level-right">
					<div class="level-item">
						<b-button class="is-info is-long" @click="toggleDetail">
							{{
								toggleAllDetail ? "Hide Detail" : "Show Detail"
							}}
						</b-button>
					</div>
					<div class="level-item">
						<b-button
							class="is-success is-long"
							@click="editForm"
							:disabled="isAssigningDisabled"
							>Assign</b-button
						>
					</div>
				</div>
			</nav>

			<b-table
				:data="resources"
				style="font-size:11pt"
				class="is-packed"
				:opened-detailed="openDetail"
				detailed
				detail-key="user_id"
				show-detail-icon
				paginated
				:per-page="10"
				pagination-simple
			>
				<template slot-scope="props">
					<b-table-column
						field="nik"
						label="NIK"
						sortable
						class="align-middle"
					>
						<p>{{ props.row.nik }}</p>
					</b-table-column>
					<b-table-column
						field="user"
						label="User"
						sortable
						class="align-middle"
						width="200"
					>
						<p>{{ props.row.name }}</p>
					</b-table-column>
					<b-table-column
						field="bu"
						label="Business Unit"
						sortable
						class="align-middle"
					>
						<p>{{ props.row.bu }}</p>
					</b-table-column>
					<b-table-column
						field="job_role"
						label="Job Role"
						sortable
						class="align-middle"
					>
						<p>{{ props.row.role }}</p>
					</b-table-column>
					<b-table-column
						field="latest_assign"
						label="Latest Assign Date"
						sortable
						class="align-middle"
					>
						<p>{{ props.row.latest_assign | moment }}</p>
					</b-table-column>
					<b-table-column
						field="onGoing"
						label="On Going Project"
						sortable
						class="align-middle"
						width="100"
						centered
					>
						<p>{{ props.row.onGoing }}</p>
					</b-table-column>
					<b-table-column
						field="select"
						class="align-middle"
						centered
					>
						<b-checkbox
							v-model="selectedRows"
							:native-value="props.row.user_id"
						>
						</b-checkbox>
					</b-table-column>
				</template>
				<template slot="empty">
					<span class="white-space"></span>
					<b-message type="is-warning">
						<p class="has-text-centered">
							Sorry, we can't find any data related
						</p>
					</b-message>
				</template>
				<template slot="top-right"> </template>
				<template slot="detail" slot-scope="props">
					<div class="content" style="margin-bottom:.5rem;">
						<label class="label"
							>Skill —
							<span class="has-text-grey has-text-weight-light">
								<small
									>has
									{{ props.row.skill.length }} skill</small
								></span
							>
						</label>
						<div
							class="columns is-multiline"
							style="padding-left: 1rem; margin-top:.5rem;"
							v-if="props.row.skill.length > 0"
						>
							<div
								class="column is-3"
								style="padding:.5em; padding-bottom:0px;"
								v-for="(skill, index) in props.row.skill"
								:key="'skill' + props.row.user_id + index"
							>
								<article class="media">
									<div class="media-left">
										{{ index + 1 }}.
									</div>
									<div class="media-content">
										<p class="is-marginless">
											{{ skill.skillName }}
										</p>
										<p
											class="is-marginless has-text-weight-bold"
										>
											<small>{{
												skill.skillLevel
											}}</small>
										</p>
									</div>
								</article>
							</div>
						</div>
						<b-message v-else size="is-small">
							<p class="has-text-centered">
								<b>SKILL DATA NOT FOUND</b>
							</p>
						</b-message>
					</div>
					<hr />
					<div class="content" style="margin-bottom:.5rem;">
						<label class="label">Course and Certificate</label>
						<div
							class="columns is-multiline"
							style="padding-left: 1rem; margin-top:.5rem;"
							v-if="props.row.certificate.length > 0"
						>
							<div
								class="column is-3"
								style="padding:.5em; padding-bottom:0px;"
								v-for="(cert, index) in props.row.certificate"
								:key="'skill' + props.row.user_id + index"
							>
								<article class="media">
									<div class="media-left">
										{{ index + 1 }}.
									</div>
									<div class="media-content">
										<p class="is-marginless">
											{{ cert.certificateName }}
										</p>
									</div>
								</article>
							</div>
						</div>
						<b-message v-else size="is-small">
							<p class="has-text-centered">
								<b>DATA NOT FOUND</b>
							</p>
						</b-message>
					</div>
				</template>
			</b-table>

			<b-loading
				:is-full-page="false"
				:active.sync="isLoading"
			></b-loading>
		</div>

		<div v-show="showForm" class="container">
			<div class="columns">
				<div class="column is-3">
					<b-field label="Selected Resources">
						<aside
							class="menu"
							style="border: solid 1px #dbdbdb; border-radius:4px;"
						>
							<ul
								class="menu-list"
								style="height: 450px; overflow-y:scroll;"
							>
								<li
									v-for="user in selectedResources"
									:key="user.user_id + '-selected'"
								>
									<a style="cursor: default;"
										>{{ user.name }} — {{ user.nik }}</a
									>
								</li>
							</ul>
						</aside>
					</b-field>
				</div>
				<div class="column">
					<form :action="formAction" method="post">
						<input type="hidden" name="taskId" :value="task.pID" />
						<input
							type="hidden"
							name="user_id"
							:value="selectedUserID"
						/>
						<b-field grouped class="is-marginless">
							<crud-input
								label="Assignment Start Date"
								type="datepicker"
								placeholder="Pick Start Date"
								date-locale="en"
								:min-date="parseDate(start)"
								:max-date="parseDate(finish)"
								v-model="startDate"
								name="start_date"
								style="margin-right: 1rem;"
							>
							</crud-input>
							<crud-input
								label="Assignment End Date"
								type="datepicker"
								:min-date="startDate"
								:max-date="parseDate(finish)"
								v-model="endDate"
								name="end_date"
								placeholder="Pick End Date"
								date-locale="en"
								style="margin-right: 1rem;"
							>
							</crud-input>
							<b-field label="Workload">
								<div class="select">
									<select name="workload">
										<slot name="workload-option"></slot>
									</select>
								</div>
							</b-field>
						</b-field>

						<b-field>
							<b-checkbox v-model="progressCalculation">
								Auto complete when timesheet progress has been
								100%
							</b-checkbox>
						</b-field>

						<hr />
						<div class="is-pulled-right">
							<div class="buttons">
								<b-button
									type="is-danger is-long"
									@click="closeForm"
								>
									Cancel
								</b-button>
								<button
									class="button is-success is-long"
									:disabled="isSaveDisabled"
									type="submit"
								>
									Save
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "helper-filter";
import moment from "helper-moment";
import {
	searchTree,
	animate,
	notified,
	isEmpty,
	checkConnection
} from "helper-tools";
import { crudInput, dataTableNoCard } from "components";
import api from "helper-apis";

const implantTag = document.querySelector("#implantedJSON");
const implantData = JSON.parse(implantTag.innerHTML);

export default {
	components: { crudInput, dataTableNoCard },
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		projectId: {
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
			selectedRows: [],
			dataBaru: [],
			dataRole: [],
			start: "",
			finish: "",
			startDate: null,
			endDate: null,
			taskName: "",
			roleName: "",
			search: "",
			showForm: false,
			selectedRows: [],
			alertMandays: false,
			progressCalculation: true,
			arrayForm: [],
			isLoading: false,
			openDetail: [],
			toggleAllDetail: true,
			rawResources: []
		};
	},
	methods: {
		isEmpty: isEmpty,
		parseDate(strDate) {
			return new Date(moment(strDate, "YYYY-MM-DD"));
		},
		editForm() {
			this.showForm = true;
		},
		closeForm() {
			this.showForm = false;
		},
		toggleDetail() {
			if (this.toggleAllDetail) {
				this.openDetail = [];
				this.toggleAllDetail = false;
			} else {
				this.openDetail = this.rawResources.map(row => row.user_id);
				this.toggleAllDetail = true;
			}
		},
		fetchResources() {
			this.isLoading = true;
			let taskId = this.task.pID;
			let self = this;
			api.getResourceWorkplan(taskId)
				.then(response => {
					if (!isEmpty(response.data)) {
						self.rawResources = response.data;
						self.openDetail = response.data.map(row => row.user_id);
						self.toggleAllDetail = true;
					} else {
						self.rawResources = [];
					}
				})
				.catch(() => {
					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				})
				.finally(() => (self.isLoading = false));
		}
	},
	computed: {
		// Search Filter for Buefy Table
		resources() {
			return searchTree(this.rawResources, this.search);
		},

		parentName() {
			if (this.task.pParent != 0) {
				let found = this.dataBaru.find(
					task => task.pID === this.task.pParent
				);

				if (found != undefined && found.hasOwnProperty("pName")) {
					return found.pName;
				}
			}

			return "";
		},

		selectedResources() {
			let resources = [];
			for (let i = 0; i < this.selectedRows.length; i++) {
				const row = this.selectedRows[i];
				const found = this.rawResources.find(
					user => row == user.user_id
				);

				if (found) {
					resources.push(found);
				}
			}

			return resources;
		},

		selectedUserID() {
			if (this.selectedRows.length > 0) {
				return this.selectedRows.join(",");
			} else {
				return "";
			}
		},

		formAction() {
			return api.parsedURL(this.actionEvent, this.task);
		},

		displayTable() {
			return !this.isLoading && !this.showForm;
		},

		isAssigningDisabled() {
			return !(this.selectedRows.length > 0);
		},

		isSaveDisabled() {
			if (isEmpty(this.startDate) || isEmpty(this.endDate)) {
				return true;
			}
			return false;
		}
	},
	beforeMount() {
		this.dataBaru = implantData.GANTT;
		this.dataRole = implantData.ROLE;

		this.start = this.task.pStart;
		this.finish = this.task.pEnd;
		this.taskName = this.task.pName;
		this.roleName = this.task.roleName;

		this.startDate = new Date(moment(this.start, "YYYY-MM-DD"));
		this.endDate = new Date(moment(this.finish, "YYYY-MM-DD"));
	},
	mounted() {
		this.fetchResources();
	}
};
</script>