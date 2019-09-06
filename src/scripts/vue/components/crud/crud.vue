<template>
	<div class="container" style="margin-top: 25px; margin-bottom: 25px;">
		<div class="card">
			<slot name="header">
				<header class="card-header">
					<p class="card-header-title">Data-Table</p>
				</header>
			</slot>
			<div class="card-content" style="padding-bottom:0.5em;">
				<b-message type="is-success">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Minus eum ipsum facilis totam pariatur nemo eveniet saepe!
				</b-message>
				<b-message type="is-info">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Minus eum ipsum facilis totam pariatur nemo eveniet saepe!
				</b-message>
				<b-message type="is-danger">
					<span class="has-text-dark"
						>Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Minus eum ipsum facilis totam pariatur nemo
						eveniet saepe!</span
					>
				</b-message>
				<b-message type="is-warning">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Minus eum ipsum facilis totam pariatur nemo eveniet saepe!
				</b-message>
			</div>
			<b-table
				v-if="!showEdit"
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
					<b-table-column field="action" label="Action">
						<slot
							name="action-column"
							:row="props.row"
							:index="props.index"
						>
							<b-button
								tag="a"
								:href="parseActionLink(edit, props.row)"
								@click="getFormConfig(edit, props.row)"
								v-if="edit !== false"
								type="is-info"
								size="is-small"
								>Edit</b-button
							>
							<b-button
								tag="a"
								:href="parseActionLink(copy, props.row)"
								v-if="copy !== false"
								type="is-info"
								size="is-small"
								>Copy</b-button
							>
							<b-button
								tag="a"
								:href="parseActionLink(del, props.row)"
								v-if="del !== false"
								type="is-danger"
								size="is-small"
								>Delete</b-button
							>
						</slot>
					</b-table-column>
				</template>
				<template slot="top-left">
					<div class="level-item">
						<b-button type="is-success">Add New</b-button>
					</div>
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
			<crud-form
				v-if="showEdit"
				action="http://localhost:5501/demo/post_detect.php"
				title="Edit Issue Status"
				:form-data="editForm"
				@cancel="showEdit = false"
			></crud-form>
		</div>
	</div>
</template>

<script>
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
			default: 0
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
		view: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			filtered: [],
			showEdit: false,
			editForm: {}
		};
	},
	methods: {
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
		clearFilter() {
			let input = document.getElementsByClassName("table-crud-filter");
			for (let i = 0; i < input.length; i++) {
				input[i].value = "";
			}

			this.filtered = this.data;
		},
		parseActionLink(link, row) {
			if (typeof link === "string") {
				let parsed = link.replace(/\{\w*\}/g, function(prop) {
					let key = prop.replace(/\{|\}/g, "");
					return row[key];
				});

				return parsed;
			} else {
				return false;
			}
		},
		getFormConfig(config, row = undefined) {
			if (typeof config === "object") {
				if (row === undefined) {
					this.editForm = this.edit.form;
				} else {
					let form = this.edit.form;
					for (let key in form) {
						form[key].value = row[key];
					}

					this.editForm = form;
				}

				this.showEdit = true;
			} else {
				return false;
			}
		}
	},
	beforeMount() {
		this.filtered = this.data;
	}
};
</script>

<style>
</style>