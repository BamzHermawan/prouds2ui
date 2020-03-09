<template>
	<div style="padding: 1rem;">
		<template v-if="isAddForm">
			<b-field horizontal label="Opportunity" class="is-marginless">
				<b-field message="" :type="oppty_validate.id">
					<b-input
						v-model="oppty.id"
						placeholder="Oppty ID"
					></b-input>
				</b-field>
				<b-field
					horizontal
					:type="oppty_validate.year"
					message=""
					grouped
				>
					<p
						slot="label"
						class="has-text-centered"
						style="margin:0px 1em;"
					>
						Year
					</p>
					<b-input
						v-model="oppty.year"
						placeholder="Oppty Year"
					></b-input>
					<p class="control is-expanded">
						<b-button
							type="is-info is-fullwidth"
							@click="findOppty"
							:loading="oppty.loader"
						>
							Search
						</b-button>
					</p>
				</b-field>
			</b-field>

			<div
				v-if="_oppty_error !== ''"
				style="margin-top: 8px;"
				class="field is-horizontal"
			>
				<div class="field-label is-normal">
					<label class="label"></label>
				</div>
				<div class="field-body">
					<p
						class="control is-expanded has-text-grey animated fadeIn"
					>
						<small v-html="_oppty_error + '!'"></small>
					</p>
				</div>
			</div>

			<hr />
		</template>

		<b-field horizontal label="Project Name">
			<crud-input
				type="text"
				name="project_name"
				placeholder="Fill Project Name"
				input-style="margin-bottom: 0px;"
				v-model="project.name"
				:disabled="!oppty.found"
				required
			>
			</crud-input>
		</b-field>

		<input type="hidden" name="customer_id" v-model="customer.id" />
		<b-field horizontal label="Customer">
			<b-autocomplete
				v-model="customer.name"
				placeholder="Choose Customer"
				:open-on-focus="true"
				:data="_customers"
				field="customer_name"
				@select="customerSelected"
				:disabled="!oppty.found"
				required
			>
			</b-autocomplete>
		</b-field>

		<b-field horizontal label="Project Type">
			<b-select
				placeholder="Choose Project Type"
				:disabled="!oppty.found"
				v-model="project.type"
				expanded
				required
				name="project_type"
			>
				<slot name="typeSlot"></slot>
			</b-select>
		</b-field>

		<b-field horizontal label="Start Date">
			<b-field>
				<crud-input
					type="datepicker"
					name="start_date"
					placeholder="Pick Start Date"
					date-locale="en"
					:disabled="!oppty.found"
					v-model="project.date.start"
					input-style="margin-bottom: 0px;"
				>
				</crud-input>
			</b-field>
			<b-field horizontal label="End Date" style="margin-left:2em;">
				<crud-input
					type="datepicker"
					:min-date="project.date.start"
					v-model="project.date.end"
					name="end_date"
					:disabled="!oppty.found"
					placeholder="Pick End Date"
					date-locale="en"
					input-style="margin-bottom: 0px;"
				>
				</crud-input>
			</b-field>
		</b-field>

		<div class="columns is-marginless">
			<div class="column is-6" style="padding-left: 0px;">
				<b-field label="Describe about this project">
					<crud-input
						type="textarea"
						name="description"
						placeholder="Fill Project Description"
						input-style="margin-bottom: 0px;"
						v-model="project.description"
						:disabled="!oppty.found"
						required
					>
					</crud-input>
				</b-field>
				<b-field label="Project Background">
					<crud-input
						type="textarea"
						name="project_background"
						placeholder="Fill Project Background"
						input-style="margin-bottom: 0px;"
						v-model="project.background"
						:disabled="!oppty.found"
						required
					>
					</crud-input>
				</b-field>
			</div>

			<div class="column" style="padding-right: 0px;">
				<p class="label">Document Evidence</p>
				<b-upload
					multiple
					name="evidDoc[]"
					v-model="docs.model"
					@input="fileChoosed"
					:disabled="!oppty.found"
					:required="_upload_required"
					:accept="evidenceAccept"
					style="width:100%;"
				>
					<a
						class="button is-info is-fullwidth"
						:disabled="!oppty.found"
					>
						<b-icon icon="upload"></b-icon>
						<span>Upload Evidence File</span>
					</a>
				</b-upload>
				<slot name="evidenceHelp"></slot>
				<hr style="margin-bottom: 12px;" />
				<div
					:key="'file-tag-evidence-' + idx"
					class="content"
					v-for="(doc, idx) in docs.model"
					style="margin-bottom: 8px;"
				>
					<span class="tag is-info" style="padding:1rem 12px;">
						<span style="margin-right: 9px;">{{ doc.name }}</span>
						<button
							class="delete is-small"
							type="button"
							v-if="oppty.found"
							@click="deleteFile(doc, idx)"
						></button>
					</span>
				</div>
			</div>
		</div>

		<hr />
		<b-field>
			<button
				class="button is-success pull-right is-long"
				:disabled="!oppty.found"
				type="submit"
			>
				Save
			</button>
		</b-field>
	</div>
</template>

<script>
import { notified, checkConnection } from "helper-tools";
import { crudInput } from "components";
import Moment from "helper-moment";
import api from "helper-apis";

export default {
	props: {
		customers: {
			type: Array,
			required: true,
			default: []
		},
		evidenceAccept: {
			type: String,
			default:
				"jpg, .jpeg, .png, .doc, .docx, .pdf, .xls, .xlsx, .ppt, .pptx"
		},
		value: {
			type: Object,
			default: function() {
				return {
					name: "",
					description: "",
					background: "",
					type: undefined,
					start_date: undefined,
					end_date: undefined,
					document: [],
					customer: {
						id: "",
						name: ""
					}
				};
			}
		},
		isAddForm: {
			type: Boolean,
			default: false
		}
	},
	components: { crudInput },
	mounted() {
		this.oppty.found = !this.isAddForm;
		if (!this.isAddForm) {
			this.project.name = this.value.name;
			this.project.type = this.value.type;
			this.project.description = this.value.description;
			this.project.background = this.value.background;
			this.customer = this.value.customer;
			this.docs.model = this.value.document;
			this.docs.backup = this.value.document;

			this.project.date.start = new Date(
				Moment(this.value.start_date, "DD/MM/YYYY")
			);
			this.project.date.end = new Date(
				Moment(this.value.end_date, "DD/MM/YYYY")
			);
		}
	},
	data() {
		return {
			oppty: {
				id: "",
				year: "",
				loader: false,
				found: false
			},
			oppty_validate: {
				id: "",
				year: "",
				message: []
			},
			customer: {
				id: "",
				name: ""
			},
			docs: {
				model: [],
				backup: []
			},
			project: {
				name: "",
				type: undefined,
				description: "",
				background: "",
				date: {
					start: undefined,
					end: undefined
				}
			}
		};
	},
	methods: {
		fileChoosed(file) {
			if (file === null) {
				this.docs.model = this.docs.backup;
			} else {
				this.docs.backup = this.docs.model;
			}
		},
		deleteFile(val, idx) {
			if (val.hasOwnProperty("file_id")) {
				const self = this;
				const bundle = { file_id: val.file_id };
				self.$dialog.confirm({
					title: "Delete",
					message:
						"File evidence <b>" +
						val.name +
						"</b> will be deleted, you sure ?",
					confirmText: "Delete",
					type: "is-danger",
					onConfirm: () => {
						api.deleteFile(bundle)
							.then(() => {
								self.docs.model.splice(idx, 1);
								self.fileChoosed(self.docs.model);
							})
							.catch(function(error) {
								console.log(
									"error asking for baseline:",
									error
								);
								if (checkConnection(self.$notification)) {
									notified(self.$notification).error(
										"Sorry we are encountering a problem, please try again later. 🙏"
									);
								}
							});
					}
				});
			} else {
				this.docs.model.splice(idx, 1);
				this.fileChoosed(this.docs.model);
			}
		},
		customerSelected(option) {
			this.customer.id = option.customer_id;
			this.customer.name = option.customer_name;
		},
		findOppty() {
			const checkId = this.oppty.id !== "";
			const checkYear = this.oppty.year !== "";
			this.oppty_validate = {
				id: "",
				year: "",
				message: []
			};

			if (checkId && checkYear) {
				this.fetchProject(this.oppty.id, this.oppty.year);
			} else {
				if (!checkId) {
					this.oppty_validate.id = "is-danger";
					this.oppty_validate.message.push(
						"Opportunity ID should not be empty"
					);
				}

				if (!checkYear) {
					this.oppty_validate.year = "is-danger";
					this.oppty_validate.message.push(
						" Opportunity Year should not be empty"
					);
				}
			}
		},
		fetchProject(id, year) {
			const bundle = {
				oppty_id: id,
				oppty_year: year
			};

			this.oppty.loader = true;
			const self = this;
			api.axios
				.get(api.parsedURL("projectByOppty", bundle))
				.then(res => {
					const project = res.data;
					self.project.name = project.name;

					if (project.hasOwnProperty("description")) {
						if (project.description !== null) {
							self.project.description = project.description;
						}
					}

					if (project.hasOwnProperty("start_date")) {
						if (project.start_date !== null) {
							self.project.date.start = new Date(
								Moment(project.start_date, "DD/MM/YYYY")
							);
						}
					}

					if (project.hasOwnProperty("end_date")) {
						if (project.end_date !== null) {
							self.project.date.end = new Date(
								Moment(project.end_date, "DD/MM/YYYY")
							);
						}
					}

					self.customer = project.customer;
					self.oppty.found = true;
				})
				.catch(err => {
					console.log(err);
					self.oppty_validate.id = "is-warning";
					self.oppty_validate.year = "is-warning";
					self.oppty_validate.message.push(
						"Sorry, we can't find any opportunity related to the <b>ID</b> and/or <b>Year</b>."
					);
				})
				.finally(() => (self.oppty.loader = false));
		}
	},
	computed: {
		_oppty_error() {
			if (this.oppty_validate.message instanceof Array) {
				if (this.oppty_validate.message.length > 0) {
					return this.oppty_validate.message.join(" and ");
				}
			}

			return "";
		},
		_customers() {
			if (this.customers.length > 0) {
				return this.customers.filter(option => {
					let checkName = option.customer_name
						.toString()
						.toLowerCase()
						.includes(this.customer.name.toLowerCase());

					return checkName && option.customer_id !== this.customer.id;
				});
			} else {
				return [];
			}
		},
		_upload_required() {
			return this.docs.model.length === 0;
		}
	}
};
</script>