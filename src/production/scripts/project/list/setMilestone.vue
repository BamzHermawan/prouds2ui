<template>
	<section>
		<div class="columns is-marginless">
			<div
				class="column is-8-desktop content is-marginless is-paddingless"
			>
				<h3
					class="is-small has-text-weight-light is-reduced-margin is-uppercase"
				>
					{{ ProjectName }}
				</h3>
				<b-field grouped>
					<div class="control">
						<b-taglist attached>
							<b-tag type="is-dark">ID</b-tag>
							<b-tag type="is-info">{{ projectId }}</b-tag>
						</b-taglist>
					</div>
					<div class="control">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">IWO</b-tag>
							<b-tag type="is-info">{{ iwo }}</b-tag>
						</b-taglist>
					</div>
				</b-field>
			</div>
			<div class="column is-clearfix is-paddingless">
				<a
					class="button is-danger is-long is-pulled-right"
					@click="$emit('cancel')"
				>
					◀ Back
				</a>
			</div>
		</div>

		<hr />

		<div class="content is-marginless">
			<h3 class="is-small has-text-weight-light is-reduced-margin">
				Set Milestone
			</h3>
		</div>
		<form
			action="http://localhost:5501/demo/post_detect.php"
			method="POST"
			enctype="multipart/form-data"
		>
			<div class="container">
				<b-input
					type="hidden"
					name="project_id"
					:value="projectId"
				></b-input>
				<div class="columns is-marginless is-paddingless">
					<div class="column has-no-left-padding">
						<b-message type="is-info" :closable="false">
							<div class="field">
								<label
									class="is-marginless has-text-weight-bold"
									>Current Start Date</label
								>
								<p>{{ startDate | moment }}</p>
							</div>
						</b-message>
					</div>
					<div class="column has-no-right-padding">
						<b-message type="is-info" :closable="false">
							<div class="field">
								<label
									class="is-marginless has-text-weight-bold"
									>Current End Date</label
								>
								<p>{{ endDate | moment }}</p>
							</div>
						</b-message>
					</div>
				</div>
				<div class="columns is-marginless is-paddingless">
					<div class="column has-no-left-padding">
						<crud-input
							type="datepicker"
							label="New Start Date"
							name="newStartDate"
							v-model="start"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 5px;"
						>
						</crud-input>
					</div>
					<div class="column has-no-right-padding">
						<crud-input
							type="datepicker"
							label="New End Date"
							name="newEndDate"
							:min-date="start"
							placeholder="Pick End Date"
							date-locale="en"
							input-style="margin-bottom: 5px;"
						>
						</crud-input>
					</div>
				</div>
				<label class="label">Document</label>
				<div class="columns is-marginless is-paddingless">
					<div class="column has-no-left-padding">
						<crud-input readonly v-model="documentName">
							<template slot="helptext">
								<p class="help">
									File yang dibolehkan: jpg, jpeg, png, doc,
									docx, pdf, xls, xlsx, ppt, pptx ; File size
									maksimal 20MB
								</p>
							</template>
						</crud-input>
					</div>
					<div class="column is-2 has-no-left-padding">
						<b-field>
							<b-upload
								v-model="document"
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
				<div class="is-clearfix">
					<button
						class="button is-success is-long is-pulled-right"
						type="submit"
					>
						<span>Save Milestone</span>
					</button>
				</div>
			</div>
		</form>
	</section>
</template>

<script>
export default {
	props: {
		projectName: {
			type: String,
			required: true
		},
		projectId: {
			type: String,
			required: true
		},
		startDate: {
			type: String,
			required: true
		},
		endDate: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			start: undefined,
			document: undefined
		};
	},
	methods: {
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
		},
		checkExtention(filename) {
			let sliced = filename.split(".");
			let lastEnd = sliced.pop();
			this.fileValidation = this.allowedArray.includes(
				lastEnd.toLowerCase()
			);
		}
	},
	computed: {
		documentName() {
			if (this.document) {
				let size = this.formatSizeString(this.document.size);
				this.checkExtention(this.document.name);
				return this.document.name + " [ " + size + " ] ";
			}

			return "No Document Selected";
		}
	}
};
</script>