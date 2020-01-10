<template>
	<div class="container" :style="margin">
		<div class="card crud">
			<slot name="header">
				<header class="card-header">
					<p class="card-header-title">Data-Table</p>
				</header>
			</slot>
			<slot name="message"></slot>
			<b-table
				v-if="!showForm"
				:data="filtered"
				:paginated="paginated !== 0"
				:per-page="paginated"
				:narrowed="narrowed"
				:striped="striped"
				pagination-position="top"
				pagination-simple
			>
				<template slot-scope="props">
					<b-table-column
						v-for="(col, index) in columns"
						:key="index"
						:field="col.key"
						:label="col.label"
						:sortable="col.sortable"
						:centered="col.centered"
						:width="col.width"
						class="animated fadeIn"
					>
						{{ props.row[col.key] }}
					</b-table-column>
					<b-table-column
						field="action"
						label="Action"
						:width="getActionColumn('width')"
						:centered="getActionColumn('centered')"
					>
						<slot
							name="action-column"
							:row="props.row"
							:index="props.index"
						>
							<b-button
								tag="a"
								:href="parseActionLink(edit, props.row)"
								@click="
									getFormConfig(edit, props.row, props.index)
								"
								v-if="edit !== false"
								type="is-info"
								size="is-small"
								>Edit</b-button
							>
							<b-button
								tag="a"
								:href="parseActionLink(add, props.row)"
								@click="
									getFormConfig(
										add,
										props.row,
										props.index,
										true
									)
								"
								v-if="copy !== false"
								type="is-info"
								size="is-small"
								>Copy</b-button
							>
							<b-button
								@click="onDelete(props.row)"
								v-if="del !== false"
								type="is-danger"
								size="is-small"
								>Delete</b-button
							>
						</slot>
					</b-table-column>
				</template>
				<template slot="top-left">
					<slot name="top-left-before"></slot>
					<div class="level-item">
						<b-button
							tag="a"
							:href="parseActionLink(add)"
							@click="getFormConfig(add)"
							type="is-success"
							>Add New</b-button
						>
					</div>
					<slot name="top-left-after"></slot>
				</template>
				<template slot="empty">
					<b-message
						type="is-warning"
						class="animated fadeIn"
						style="margin-top: 18px; margin-bottom: 18px;"
					>
						Mohon maaf, Kami tidak dapat menampilkan data yang kamu
						inginkan 😢
					</b-message>
				</template>
				<template slot="footer">
					<th
						v-for="(col, index) in columns"
						:key="index"
						:field="col.key"
						:label="col.label"
						:width="col.width"
						class="is-hidden-mobile"
					>
						<div class="control has-icons-left has-icons-right">
							<input
								class="input is-small is-fullwidth table-crud-filter"
								:placeholder="'Filter ' + col.label"
								:fieldkey="col.key"
								@keyup="doFilter"
							/>
							<span
								class="icon is-small is-left"
								style="margin-left: 0px;"
							>
								<i class="mdi mdi-magnify"></i>
							</span>
						</div>
					</th>
					<th class="is-hidden-mobile">
						<button
							class="button is-small is-info is-fullwidth"
							@click="clearFilter"
						>
							Clear Filter
						</button>
					</th>
				</template>
			</b-table>
			<slot
				v-if="showForm"
				name="forms"
				:isAdd="isAdd"
				:isEdit="isEdit"
				:isCopy="isCopy"
				:row="selected.row"
				:index="selected.index"
				:method="method"
				:action="action"
			>
				<crud-form
					action="action"
					method="method"
					:form-data="form"
					@cancel="showForm = false"
				></crud-form>
			</slot>

			<span v-if="showForm" class="white-space"></span>
		</div>
	</div>
</template>

<script>
import sd from "showdown";
import CrudForm from "./crudForm";
export default {
	components: { CrudForm },
	name: "crud",
	props: {
		data: {
			type: Array,
			required: true
		},
		columns: {
			type: Array
		},
		paginated: {
			type: Number,
			default: 10
		},
		narrowed: {
			type: Boolean,
			default: false
		},
		striped: {
			type: Boolean,
			default: true
		},
		edit: {
			default: false
		},
		copy: {
			default: false
		},
		add: {
			default: false
		},
		del: {
			default: false
		},
		margin: {
			type: String,
			default: "margin-top: 25px; margin-bottom: 25px;"
		}
	},
	data() {
		return {
			isAdd: false,
			isEdit: false,
			isCopy: false,
			action: "#",
			method: undefined,
			filtered: [],
			showForm: false,
			form: {},
			selected: {
				row: undefined,
				index: undefined
			},
			actionColumn: {
				key: "action",
				label: "Action",
				sortable: false
			}
		};
	},
	watch: {
		showForm() {
			document.querySelector(".contentPage").scrollTop = 0;
			global.psContent.update();
		}
	},
	methods: {
		/**
		 * doFilter: Filter Single Column
		 * @param Event Event listener parameter
		 */
		doFilter({ target }) {
			let key = target.attributes.fieldkey.value;
			let query = target.value;

			if (this.filtered.length <= 0) {
				this.filtered = this.data;
			}

			let self = this;
			this.filtered = this.filtered.filter((row, index) => {
				let value = row[key].toString().toLowerCase();
				if (query !== "") {
					return value.includes(query.toLowerCase());
				} else {
					return true;
				}
			});
		},

		/**
		 * clearFilter: Clear for fresh filtering
		 * @param Event Event listener parameter
		 */
		clearFilter() {
			let input = document.getElementsByClassName("table-crud-filter");
			for (let i = 0; i < input.length; i++) {
				input[i].value = "";
			}

			this.filtered = this.data;
		},

		/**
		 * parseActionLink: to check if variable is string link or not and parse any {prop-key-name} with row data
		 * @param {string} link string to parse
		 * @param {object} [data=undefined] data to replace in string
		 */
		parseActionLink(link, row = undefined) {
			if (typeof link === "string") {
				let parsed = link;
				if (row !== undefined) {
					parsed = link.replace(/\{\w*\}/g, function(prop) {
						let key = prop.replace(/\{|\}/g, "");
						return row[key];
					});
				}

				return parsed;
			} else {
				return false;
			}
		},

		onDelete(row) {
			let rawURL = "",
				message = "You are trying to delete a row, are you sure ?";
			if (this.del instanceof String) {
				rawURL = this.del;
			} else if (this.del instanceof Object) {
				if (this.del.hasOwnProperty("action")) {
					rawURL = this.del.action;
				}

				if (this.del.hasOwnProperty("message")) {
					message = this.parseActionLink(this.del.message, row);
				}
			} else {
				if (this.del === false) {
					throw new Error(
						"We can't find delete configuration. Please provide delete configuration first."
					);
				}
			}

			let link = this.parseActionLink(rawURL, row);
			let converter = new sd.Converter();
			this.$dialog.confirm({
				title: "Confirm Delete",
				message: converter.makeHtml(message),
				confirmText: "Yes",
				type: "is-danger",
				onConfirm: () => {
					window.location = link;
				}
			});
		},

		/**
		 * getFormConfig: Open Form for (edit/add)
		 * @param {object} config Form Configuration
		 * @param {object} [data=undefined] Value Data for Edit
		 * @param {number} [index=undefined] Value Index for Edit
		 * @param {boolean} [isCopy=false] Boolean if it was copying not add or edit
		 */
		getFormConfig(
			config,
			row = undefined,
			index = undefined,
			isCopy = false
		) {
			if (typeof config === "object") {
				// ! Check if there is 'method' property exist in config
				if (config.hasOwnProperty("method")) {
					this.method = config.method;
				}

				// ! Check if there is 'action' property exist in config
				if (config.hasOwnProperty("action")) {
					this.action = this.parseActionLink(config.action, row);
				}

				// ! check if there is 'form' property exist in config
				if (config.hasOwnProperty("form")) {
					this.form = config.form;
				}

				// ! check if row passed AND form is not undefined
				if (row !== undefined) {
					if (isCopy) {
						this.isAdd = true;
						this.isEdit = false;
						this.isCopy = true;
					} else {
						this.isAdd = false;
						this.isEdit = true;
						this.isCopy = false;
					}

					this.selected.row = row;
					this.selected.index = index;

					for (let key in row) {
						if (this.form.hasOwnProperty(key)) {
							this.form[key].value = row[key];
						}
					}
				} else {
					this.isEdit = false;
					this.isCopy = false;
					this.isAdd = true;

					this.selected.index = undefined;
					this.selected.row = new Proxy({}, () => {
						return undefined;
					});
				}

				this.showForm = true;
			} else {
				return false;
			}
		},

		getActionColumn(key) {
			if (this.actionColumn.hasOwnProperty(key)) {
				return this.actionColumn[key];
			} else {
				return undefined;
			}
		}
	},
	mounted() {
		let actionCol = this.columns.findIndex(col => col.key === "action");
		if (actionCol >= 0) {
			let action = this.columns[actionCol];
			if (!action.hasOwnProperty("label")) {
				action.label = this.actionColumn.label;
			}

			this.actionColumn = action;
			this.columns.splice(actionCol, 1);
		}

		let data = this.data[0];
		let selectedRow = {};
		for (let key in data) {
			selectedRow[key] = undefined;
		}

		this.selected.row = selectedRow;
	},
	beforeMount() {
		this.filtered = this.data;
	}
};
</script>