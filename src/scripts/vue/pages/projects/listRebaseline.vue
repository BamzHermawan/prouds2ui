<template>
	<div class="container">
		<nav class="level">
			<div class="level-left">
				<p class="title is-size-4">Rebaseline List</p>
			</div>
			<div class="level-right">
				<div class="level-item">
					<a
						href="http://localhost:5500/project/workplan.html"
						class="button is-danger"
						>🏃‍ Exit Resource Booking</a
					>
				</div>
				<div class="level-item">
					<button
						class="button is-warning"
						style="width:100%;"
						@click="rebaseline()"
					>
						<b-icon icon="recycle"></b-icon>
						<span>Rebaseline</span>
					</button>
				</div>
			</div>
		</nav>

		<b-message type="is-warning">
			<nav class="level">
				<div class="level-left">
					<label class="label">Rebaseline Type</label>
				</div>
				<div class="level-right">
					<div class="level-item">
						<b-button type="is-success">
							Mandays Recalculation
						</b-button>
					</div>
					<div class="level-item">
						<b-button type="is-success">
							Reschedule Milestone
						</b-button>
					</div>
					<div class="level-item">
						<b-button type="is-success">
							Cost Reallocation
						</b-button>
					</div>
				</div>
			</nav>
		</b-message>

		<div class="columns is-multiline">
			<div class="column is-4">
				<article class="message is-dark">
					<div class="message-header">
						<p>
							<span class="tags has-addons">
								<span class="tag is-light">📅</span>
								<span class="tag is-info">28/10/2019</span>
							</span>
						</p>
						<button class="button is-small is-info">
							✅ Confirm
						</button>
					</div>
					<div class="message-body">
						<b-field label="Task Name">
							Mockup UI Development
						</b-field>
						<b-field label="Start">
							06/06/2019
						</b-field>
						<b-field label="Finish">
							30/10/2019
						</b-field>
					</div>
				</article>
			</div>
		</div>
		<b-modal
			:active.sync="modalRebaseline.display"
			width="600px"
			scroll="keep"
		>
			<div class="card-modal">
				<header class="modal-card-head">
					<p class="modal-card-title">{{ modalRebaseline.title }}</p>
				</header>
				<section class="modal-card-body">
					<form
						:action="actionEvent"
						method="POST"
						enctype="multipart/form-data"
					>
						<crud-input
							type="select"
							label="Rebaseline Type"
							name="rebaselinetype"
							placeholder="Choose Rebaseline Type"
							v-model="rebaselineType"
						>
							<slot name="rebaseline-type"></slot>
						</crud-input>
						<crud-input
							type="text"
							label="Task Name"
							placeholder="a name for the task"
							name="taskName"
							v-model="modalRebaseline.taskName"
							v-if="rebaselineType == 1"
							required
						>
						</crud-input>
						<crud-input
							type="datepicker"
							label="Old Start Date"
							name="oldStartDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-model="modalRebaseline.oldStartDate"
							v-if="rebaselineType == 1 || rebaselineType == 2"
							disabled
						>
						</crud-input>
						<crud-input
							type="datepicker"
							label="Old End Date"
							name="oldEndDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-model="modalRebaseline.oldEndDate"
							v-if="rebaselineType == 1 || rebaselineType == 2"
							disabled
						>
						</crud-input>
						<crud-input
							type="datepicker"
							label="New Start Date"
							name="newStartDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-if="rebaselineType == 1 || rebaselineType == 2"
						>
						</crud-input>
						<crud-input
							type="datepicker"
							label="New End Date"
							name="newEndDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-if="rebaselineType == 1 || rebaselineType == 2"
						>
						</crud-input>
						<template v-if="rebaselineType == 3">
							<input
								type="hidden"
								name="actualCost"
								v-model="actualCost"
							/>
							<crud-input
								type="text"
								label="Budget Actual Cost"
								:value="actualCost | currency"
								@input="actualCostUnformat"
								name=""
							>
							</crud-input>
						</template>
						<crud-input
							type="datepicker"
							label="Reallocation Date"
							name="reallocationDate"
							placeholder="Pick Reallocation Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-model="modalRebaseline.reallocationDate"
							v-if="rebaselineType == 3"
						>
						</crud-input>
						<p class="heading" v-if="rebaselineType == 2">
							Document
						</p>
						<div class="columns" v-if="rebaselineType == 2">
							<div class="column">
								<div class="field">
									<div class="control">
										<b-input
											readonly
											v-model="documentName"
										></b-input>
									</div>
								</div>
								<b-field
									:type="determineFieldStatus"
									message="File yang dibolehkan: jpg, jpeg, png, doc, docx,
							pdf, xls, xlsx, ppt, pptx ; File size maksimal 20MB"
								>
								</b-field>
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
						<p class="heading" v-if="rebaselineType == 2">Reason</p>
						<b-field v-if="rebaselineType == 2">
							<b-input
								name="notes"
								type="textarea"
								maxlength="150"
								custom-class="has-fixed-size"
								placeholder="Alasan singkat mengenai rebaseline terkait."
							>
							</b-input>
						</b-field>
						<input
							type="hidden"
							name="workplanId"
							v-model="workplanId"
						/>
						<button
							class="button is-fullwidth is-success"
							type="submit"
							v-if="
								(rebaselineType == 1) |
									(rebaselineType == 2) |
									(rebaselineType == 3)
							"
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
import CrudInput from "../../components/crud/crudInput";
export default {
	components: { CrudInput },
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		allowedFile: {
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
			selectedDocument: null,
			fileValidation: true,
			modalRebaseline: {
				display: false,
				title: "Rebaseline",
				oldStartDate: new Date(),
				oldEndDate: new Date(),
				reallocationDate: new Date(),
				taskName: "Test"
			},
			actualCost: 10000000000000,
			rebaselineType: null
		};
	},
	methods: {
		actualCostUnformat(val) {
			let medown = val.replace(/\D/g, "");
			console.log(medown);
			this.actualCost = medown;
		},
		onCancel() {
			window.history.back();
		},
		// formatNumber(num) {
		// 	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		// },
		// checkFormat() {
		// 	this.actualCost = this.formatNumber(this.actualCost);
		// },
		rebaseline() {
			// this.modal.formTarget = this.actionSend;
			this.modalRebaseline.display = true;
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
		// disableSubmit() {
		// 	if (!this.fileValidation || this.selectedDocument === null) {
		// 		return true;
		// 	}

		// 	return false;
		// },
		allowedArray() {
			return this.allowedFile.split("|");
		}
	}
};
</script>

