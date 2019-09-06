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
				<section class="modal-card-body" style="min-height:500px;">
					<form
						:action="actionEvent"
						method="POST"
						enctype="multipart/form-data"
					>
						<div class="columns">
							<div class="column">
								<p class="heading">Old Start Date</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
									name="oldStartDate"
									v-model="modalRebaseline.oldStartDate"
								></b-datepicker>
							</div>
							<div class="column">
								<p class="heading">Old End Date</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
									name="oldEndDate"
									v-model="modalRebaseline.oldEndDate"
								></b-datepicker>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<p class="heading">New Start Date</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
									name="newStartDate"
								></b-datepicker>
							</div>
							<div class="column">
								<p class="heading">New End Date</p>
								<b-datepicker
									placeholder="DD/MM/YYYY"
									name="newEndDate"
								></b-datepicker>
							</div>
						</div>
						<p class="heading">Document</p>
						<div class="columns">
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
						<p class="heading">Reason</p>
						<b-field>
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
							:disabled="disableSubmit"
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
export default {
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
				oldEndDate: new Date()
			},
			modalAddBaseline: {
				display: false,
				title: "Add Baseline",
				oldStartDate: new Date(),
				oldEndDate: new Date()
			}
		};
	},
	methods: {
		onCancel() {
			window.history.back();
		},
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

