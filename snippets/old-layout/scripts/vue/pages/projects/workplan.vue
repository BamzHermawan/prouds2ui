<template>
	<div class="container">
		<div class="columns">
			<div
				class="column is-3 animated side-task-menu"
				v-show="showSideBar"
			>
				<div class="card">
					<header class="card-header">
						<p class="card-header-title">
							Task Menu
						</p>
						<a
							@click="toggleTaskMenu"
							class="card-header-icon"
							aria-label="more options"
						>
							<span class="button is-small is-light">
								<span class="icon has-text-dark">
									<i
										class="mdi mdi-close-circle"
										aria-hidden="true"
									></i>
								</span>
							</span>
						</a>
					</header>
					<b-menu>
						<b-menu-list>
							<b-menu-item
								@click="editTast()"
								label="Edit Task"
								icon="settings"
							></b-menu-item>
							<b-menu-item
								@click="setSchedule()"
								label="Set Schedule"
							></b-menu-item>
							<b-menu-item
								@click="changeParentTask()"
								label="Change Parent Task"
							></b-menu-item>
							<b-menu-item
								@click="changePhaseTask()"
								label="Change Phase Task"
							></b-menu-item>
							<b-menu-item label="Link Predecessor"></b-menu-item>
							<b-menu-item
								label="Unlink Predecessor"
							></b-menu-item>
							<b-menu-item label="Assign Resource"></b-menu-item>
							<b-menu-item label="Merge Task"></b-menu-item>
							<b-menu-item label="Delete Task"></b-menu-item>
						</b-menu-list>
					</b-menu>
				</div>
			</div>
			<div :class="'column ' + (showSideBar ? 'is-9' : '')">
				<nav class="level">
					<div class="level-left">
						<div class="level-item">
							<a
								href="http://localhost:5500/project/listrebaseline.html"
								class="button is-success"
								style="width:100%;"
							>
								<b-icon icon="file-document"></b-icon>
								<span>Rebasline List</span>
							</a>
						</div>
						<div class="level-item" v-if="selectedDocument">
							<form :action="apiAction" method="post">
								<input
									type="hidden"
									name="image"
									v-model="selectedDocument.name"
								/>
								<button
									class="button is-warning is-fullwidth"
									type="submit"
								>
									📬 Send File
								</button>
							</form>
							<span class="file-name" v-if="selectedDocument">
								{{ selectedDocument.name }}
							</span>
						</div>
						<div class="level-item" v-else>
							<b-upload
								v-model="selectedDocument"
								name="evidDoc"
								native
								required
								style="width:100%;"
								accept=".xml,.jpg"
							>
								<a class="button is-info is-fullwidth">
									<b-icon icon="upload"></b-icon>
									<span>Upload XML</span>
								</a>
							</b-upload>
						</div>
					</div>
					<div class="level-right">
						<div class="level-item">
							<a
								href="http://localhost:5500/project/detail.html"
								class="button is-danger"
								>🏃‍ Exit Resource Booking</a
							>
						</div>
					</div>
				</nav>
				<v-gantt
					:dataBaru="dataBaru"
					:action-event="actionEvent"
				></v-gantt>
			</div>
		</div>
		<b-modal :active.sync="modalEditTask.display" width="670px">
			<div class="card-modal">
				<header class="modal-card-head">
					<p class="modal-card-title">{{ modalEditTask.title }}</p>
				</header>
				<section class="modal-card-body">
					<form
						:action="actionEvent"
						method="POST"
						enctype="multipart/form-data"
					>
						<div class="columns">
							<div class="column">
								<p class="heading">Task Name</p>
								<b-input
									name="taskName"
									v-model="modalChangePhaseTask.title"
									disabled
								>
								</b-input>
							</div>
							<div class="column">
								<p class="heading">Sub task of</p>
								<b-select
									expanded
									v-model="modalChangeParentTask.subtask"
									name="subtask"
								>
									<option value="1">Task 1</option>
								</b-select>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<p class="heading">Start</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
									name="start"
									v-model="modalEditTask.start"
									inline
									size="is-small"
								></b-datepicker>
							</div>
							<div class="column">
								<p class="heading">finish</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
									name="finish"
									v-model="modalEditTask.finish"
									inline
									size="is-small"
								></b-datepicker>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<p class="heading">Phase</p>
								<b-select
									expanded
									v-model="modalEditTask.phase"
									name="phase"
								>
									<option value="1">Planning</option>
								</b-select>
							</div>
							<div class="column">
								<p class="heading">Workdays</p>
								<b-select
									expanded
									v-model="modalEditTask.workdays"
									name="workdays"
								>
									<option value="1"
										>Normal : 5 Business days</option
									>
								</b-select>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<b-checkbox
									type="is-danger"
									v-model="modalEditTask.checkboxPredecessor"
								>
									Has Predecessor
								</b-checkbox>
							</div>
						</div>
						<div class="columns">
							<div
								class="column"
								v-if="modalEditTask.checkboxPredecessor"
							>
								<p class="heading">Predecessor</p>
								<b-select
									expanded
									v-model="modalEditTask.predecessor"
									name="phase"
								>
									<option value="1">Task #12</option>
								</b-select>
							</div>
							<div class="column" v-else></div>
							<div class="column is-6">
								<p class="heading">Duration</p>
								<b-input
									name="duration"
									v-model="modalEditTask.duration"
									disabled
								>
								</b-input>
							</div>
						</div>
						<input
							type="hidden"
							name="workplanId"
							v-model="workplanId"
						/>
						<button
							class="button is-fullwidth is-success"
							type="submit"
						>
							Submit Document
						</button>
					</form>
				</section>
			</div>
		</b-modal>
		<b-modal
			:active.sync="modalSetSchedule.display"
			width="680px"
			scroll="keep"
		>
			<div class="card-modal">
				<header class="modal-card-head">
					<p class="modal-card-title">{{ modalSetSchedule.title }}</p>
				</header>
				<section class="modal-card-body" style="min-height:500px;">
					<form
						:action="actionEvent"
						method="POST"
						enctype="multipart/form-data"
					>
						<div class="columns">
							<div class="column">
								<p class="heading">Task Name</p>
								<b-input
									name="taskName"
									v-model="modalSetSchedule.title"
									disabled
								>
								</b-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<p class="heading">Start</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
									name="start"
									v-model="modalSetSchedule.start"
								></b-datepicker>
							</div>
							<div class="column">
								<p class="heading">Finish</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
									name="finish"
									v-model="modalSetSchedule.finish"
								></b-datepicker>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<p class="heading">Start</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
								></b-datepicker>
							</div>
							<div class="column">
								<p class="heading">Finish</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
								></b-datepicker>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<p class="heading">Workdays</p>
								<b-select
									expanded
									v-model="modalSetSchedule.workdays"
									name="workdays"
								>
									<option value="1"
										>Normal : 5 Business Days</option
									>
								</b-select>
							</div>
							<div class="column">
								<p class="heading">Duration</p>
								<b-input
									name="duration"
									v-model="modalSetSchedule.duration"
									disabled
								>
								</b-input>
							</div>
						</div>
						<input
							type="hidden"
							name="workplanId"
							v-model="workplanId"
						/>
						<button
							class="button is-fullwidth is-success"
							type="submit"
							style="margin-top:200px;"
						>
							Submit Document
						</button>
					</form>
				</section>
			</div>
		</b-modal>
		<b-modal
			:active.sync="modalChangeParentTask.display"
			width="600px"
			scroll="keep"
		>
			<div class="card-modal">
				<header class="modal-card-head">
					<p class="modal-card-title">
						{{ modalChangeParentTask.title }}
					</p>
				</header>
				<section class="modal-card-body">
					<form
						:action="actionEvent"
						method="POST"
						enctype="multipart/form-data"
					>
						<div class="columns">
							<div class="column">
								<p class="heading">Task Name</p>
								<b-input
									name="taskName"
									v-model="modalChangeParentTask.title"
									disabled
								>
								</b-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<p class="heading">Sub task of</p>
								<b-select
									expanded
									v-model="modalChangeParentTask.subtask"
									name="subtask"
								>
									<option value="1">Task 1</option>
								</b-select>
							</div>
						</div>
						<input
							type="hidden"
							name="workplanId"
							v-model="workplanId"
						/>
						<button
							class="button is-fullwidth is-success"
							type="submit"
						>
							Submit Document
						</button>
					</form>
				</section>
			</div>
		</b-modal>
		<b-modal
			:active.sync="modalChangePhaseTask.display"
			width="600px"
			scroll="keep"
		>
			<div class="card-modal">
				<header class="modal-card-head">
					<p class="modal-card-title">
						{{ modalChangePhaseTask.title }}
					</p>
				</header>
				<section class="modal-card-body">
					<form
						:action="actionEvent"
						method="POST"
						enctype="multipart/form-data"
					>
						<div class="columns">
							<div class="column">
								<p class="heading">Task Name</p>
								<b-input
									name="taskName"
									v-model="modalChangePhaseTask.title"
									disabled
								>
								</b-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<p class="heading">Phase</p>
								<b-select
									expanded
									v-model="modalChangePhaseTask.phase"
									name="subtask"
								>
									<option value="1">Execution</option>
								</b-select>
							</div>
						</div>
						<input
							type="hidden"
							name="workplanId"
							v-model="workplanId"
						/>
						<button
							class="button is-fullwidth is-success"
							type="submit"
						>
							Submit Document
						</button>
					</form>
				</section>
			</div>
		</b-modal>
	</div>
</template>

<script>
import vGantt from "../../components/ganttchart";
import { animate } from "../../../tools";
export default {
	components: {
		vGantt
	},
	props: {
		apiAction: {
			type: String,
			required: true
		},
		actionEvent: {
			type: String,
			required: true
		},
		workplanId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dataBaru: DATA,
			selectedDocument: null,
			showSideBar: false,
			modalEditTask: {
				display: false,
				title: "Edit Task",
				start: new Date(),
				finish: new Date(),
				subtask: 1,
				phase: 1,
				workdays: 1,
				duration: 20,
				checkboxPredecessor: "true",
				predecessor: 1
			},
			modalSetSchedule: {
				display: false,
				title: "Set Schedule",
				start: new Date(),
				finish: new Date(),
				workdays: 1,
				duration: 20
			},
			modalChangeParentTask: {
				display: false,
				title: "Change Parent Task",
				subtask: 1
			},
			modalChangePhaseTask: {
				display: false,
				title: "Change Phase Task",
				phase: 1
			}
		};
	},
	methods: {
		onCancel() {
			window.history.back();
		},
		editTast() {
			// this.modal.formTarget = this.actionSend;
			this.modalEditTask.display = true;
		},
		// Side Task Menu Animation Method Added By @ariomoklo
		toggleTaskMenu() {
			let self = this;
			console.log("Mantaf");
			if (this.showSideBar) {
				animate(".side-task-menu", "fadeOutLeft", el => {
					self.showSideBar = false;
				});
			} else {
				animate(".side-task-menu", "fadeInLeft", () => {
					console.log("mantaf");
				});
				self.showSideBar = true;
			}
		},
		setSchedule() {
			// this.modal.formTarget = this.actionSend;
			this.modalSetSchedule.display = true;
		},
		changeParentTask() {
			this.modalChangeParentTask.display = true;
		},
		changePhaseTask() {
			this.modalChangePhaseTask.display = true;
		},
		checkExtention(filename) {
			let sliced = filename.split(".");
			let lastEnd = sliced.pop();
			this.fileValidation = this.allowedArray.includes(
				lastEnd.toLowerCase()
			);
		},
		formatSizeString(size) {
			let counter = 0;
			while (size > 1000) {
				size = size / 1000;
				counter++;
			}

			if (counter == 0) {
				size = size.toFixed(0) + " Byte";
			} else if (counter == 1) {
				size = size.toFixed(1) + " KB";
			} else if (counter == 2) {
				size = size.toFixed(1) + " MB";
			} else if (counter == 3) {
				size = size.toFixed(1) + " GB";
			} else {
				size = size.toFixed(2);
			}

			return size;
		}
	},
	computed: {
		documentName() {
			if (this.selectedDocument !== null) {
				let size = this.formatSizeString(this.selectedDocument.size);
				this.checkExtention(this.selectedDocument.name);
				return this.selectedDocument.name + " [ " + size + " ] ";
			}

			return "No Document Selected";
		},
		determineFieldStatus() {
			if (!this.fileValidation) {
				return "is-danger";
			}

			if (this.selectedDocument === null) {
				return "";
			}

			return "is-success";
		},
		disableSubmit() {
			if (!this.fileValidation || this.selectedDocument === null) {
				return true;
			}

			return false;
		},
		allowedArray() {
			return this.allowedFile.split("|");
		}
	}
};
</script>
