<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body" style="height: auto;">
			<form
				:action="actionEvent"
				method="POST"
				enctype="multipart/form-data"
			>
				<div class="columns">
					<div class="column">
						<p class="label">Task Name</p>
						<input
							type="hidden"
							name="taskID"
							v-model="selectedTask"
						/>
						<b-autocomplete
							v-model="name"
							placeholder="Choose Task Name"
							:open-on-focus="true"
							:data="filterTaskName"
							field="taskName"
							@select="option => (selected = option)"
						>
						</b-autocomplete>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<b-field label="Current Start Date">
							<b-message class="is-info is-on-field">
								<p class="has-text-dark">{{ getCurStart }}</p>
							</b-message>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Current End Date">
							<b-message class="is-info is-on-field">
								<p class="has-text-dark">{{ getCurEnd }}</p>
							</b-message>
						</b-field>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<crud-input
							type="datepicker"
							label="New Start Date"
							name="newStartDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 5px;"
						>
						</crud-input>
					</div>
					<div class="column">
						<crud-input
							type="datepicker"
							label="New End Date"
							name="newEndDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 5px;"
						>
						</crud-input>
					</div>
				</div>

				<label class="label">Document</label>
				<div class="columns">
					<div class="column">
						<crud-input
							readonly
							:name="undefined"
							:color="determineFieldStatus"
							v-model="documentName"
						>
							<template slot="helptext">
								<p :class="'help ' + determineFieldStatus">
									File yang dibolehkan: jpg, jpeg, png, doc,
									docx, pdf, xls, xlsx, ppt, pptx ; File size
									maksimal 20MB
								</p>
							</template>
						</crud-input>
					</div>
					<div class="column is-one-third">
						<b-field>
							<b-upload
								v-model="selectedDocument"
								name="evidDoc"
								native
								required
								style="width:100%;"
							>
								<a class="button is-info is-fullwidth">
									<b-icon icon="upload"></b-icon>
									<span>Browse File</span>
								</a>
							</b-upload>
						</b-field>
					</div>
				</div>
				<div class="is-pulled-right">
					<a class="button is-danger" @click="$parent.close()">
						Cancel
					</a>
					<button class="button is-success" type="submit">
						Save
					</button>
				</div>
			</form>
		</section>
	</div>
</template>

<script>
import CrudInput from "../../../components/crud/crudInput";
import moment from "moment";
export default {
	components: { CrudInput },
	props: {
		title: {
			type: String,
			required: true
		},
		actionEvent: {
			type: String,
			required: true
		},
		allowedFile: {
			type: String,
			required: true
		},
		oldStart: {
			type: String,
			required: true
		},
		oldEnd: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			selectedDocument: null,
			selectedTask: null,
			fileValidation: true,
			curStartDate: new Date(moment(this.oldStart, "DD/MM/YYYY")),
			curEndDate: new Date(moment(this.oldEnd, "DD/MM/YYYY")),
			reallocationDate: new Date(),
			dataBaru: DATA,
			name: "",
			selected: null
		};
	},
	methods: {
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
		filterTaskName() {
			return this.dataBaru.filter(option => {
				return (
					option.taskName
						.toString()
						.toLowerCase()
						.indexOf(this.name.toLowerCase()) >= 0
				);
			});
		},
		getCurStart() {
			if (this.selected != undefined) {
				this.selectedTask = this.selected.taskID;
			}
			let found = this.dataBaru.find(
				task => task.taskID === this.selectedTask
			);

			if (found != undefined && found.hasOwnProperty("curStart")) {
				return moment(found.curStart, "DD/MM/YYYY").format(
					"Do MMMM YYYY"
				);
			} else {
				return "-";
			}
		},
		getCurEnd() {
			if (this.selected != undefined) {
				this.selectedTask = this.selected.taskID;
			}
			let found = this.dataBaru.find(
				task => task.taskID === this.selectedTask
			);

			if (found != undefined && found.hasOwnProperty("curEnd")) {
				return moment(found.curEnd, "DD/MM/YYYY").format(
					"Do MMMM YYYY"
				);
			} else {
				return "-";
			}
		},
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
		allowedArray() {
			return this.allowedFile.split("|");
		}
	}
};
</script>