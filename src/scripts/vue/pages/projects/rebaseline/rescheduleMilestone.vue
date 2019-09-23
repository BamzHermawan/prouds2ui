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
				<input type="hidden" name="taskId" v-model="taskId" />
				<div class="columns">
					<div class="column">
						<crud-input
							type="datepicker"
							label="Old Start Date"
							name="oldStartDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-model="oldStartDate"
							disabled
						>
						</crud-input>
					</div>
					<div class="column">
						<crud-input
							type="datepicker"
							label="Old End Date"
							name="oldEndDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-model="oldEndDate"
							disabled
						>
						</crud-input>
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
							input-style="margin-bottom: 14px;"
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
							input-style="margin-bottom: 14px;"
						>
						</crud-input>
					</div>
				</div>

				<p class="heading">
					Document
				</p>
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
		taskId: {
			type: String,
			required: true
		},
		allowedFile: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			selectedDocument: null,
			fileValidation: true,
			oldStartDate: new Date(),
			oldEndDate: new Date(),
			reallocationDate: new Date()
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