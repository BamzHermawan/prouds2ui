<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">📝 Document Delivery Form</p>
		</header>
		<section class="modal-card-body">
			<form :action="action" method="post" enctype="multipart/form-data">
				<div class="columns">
					<div class="column">
						<p class="heading">Periode</p>
						<b-field>
							<b-input
								class="has-text-white"
								placeholder="Disabled"
								v-model="delivery.period"
								disabled
							></b-input>
						</b-field>
					</div>
					<div v-if="checkVersion()" class="column">
						<p class="heading">Versi</p>
						<b-input
							class="has-text-white"
							placeholder="Disabled"
							v-model="delivery.actual.version"
							disabled
						></b-input>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p class="heading">Document Type</p>
						<b-field>
							<b-select
								placeholder="Pilih Tipe Dokumen"
								name="docType"
								required
								expanded
							>
								<option
									v-for="option in doctype"
									:value="option.docTypeId"
									:key="option.docTypeId"
								>
									{{ option.docTypeName }}
								</option>
							</b-select>
						</b-field>
					</div>
					<div class="column">
						<p class="heading">Progress (%)</p>
						<b-field>
							<b-numberinput
								min="0"
								max="100"
								expanded
								required
								name="progress"
								type="is-info"
								v-model="progress"
								controls-position="compact"
							></b-numberinput>
						</b-field>
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
				<p class="heading">Notes</p>
				<b-field>
					<b-input
						name="notes"
						type="textarea"
						maxlength="150"
						custom-class="has-fixed-size"
						placeholder="Catatan singkat mengenai dokumen terkait."
					>
					</b-input>
				</b-field>
				<input type="hidden" name="projectId" v-model="projectId" />
				<input type="hidden" name="period" v-model="delivery.period" />
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
</template>

<script>
export default {
	props: {
		projectId: {
			type: String,
			required: true
		},
		action: {
			type: String,
			required: true
		},
		doctype: {
			type: Array,
			required: true
		},
		delivery: {
			type: Object,
			required: true
		},
		allowedFile: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			progress: null,
			selectedDocument: null,
			fileValidation: true
		};
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
		allowedArray() {
			return this.allowedFile.split("|");
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
		}
	},
	methods: {
		checkVersion() {
			if (this.delivery.actual === null) {
				return false;
			}

			return (
				this.delivery.actual.version !== undefined ||
				this.delivery.actual.version !== null ||
				this.delivery.actual.version !== ""
			);
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
	}
};
</script>