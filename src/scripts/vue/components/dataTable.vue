<template>
	<div class="container">
		<div class="card">
			<header v-if="title !== undefined" class="card-header">
				<p class="card-header-title">
					{{ title }}
				</p>
				<slot name="head-right">
					<b-switch v-model="showAll" style="margin-right:15px;"
						>Show All</b-switch
					>
				</slot>
			</header>
			<div class="card-content">
				<slot name="top-body"></slot>
				<nav class="level">
					<div class="level-left">
						<b-field>
							<b-input
								placeholder="Search..."
								type="search"
								icon="magnify"
								v-model="search"
								style="margin-right: 10px;"
							>
							</b-input>
						</b-field>
					</div>
					<div class="level-right">
						<slot
							name="top-right"
							:search="search"
							:page="currentPage"
						>
							<div class="field is-grouped">
								<div
									v-show="search !== ''"
									class="control animated fadeIn"
								>
									<div class="tags has-addons are-medium">
										<span class="tag is-dark"
											>Search Result</span
										>
										<span class="tag is-primary">{{
											filteredlist.length
										}}</span>
									</div>
								</div>
								<div class="control">
									<div class="tags has-addons are-medium">
										<span class="tag is-dark">Total</span>
										<span class="tag is-primary">{{
											data.length
										}}</span>
									</div>
								</div>
							</div>
						</slot>
					</div>
				</nav>
				<b-table
					:paginated="!showAll && filteredlist.length > perPage"
					:per-page="perPage"
					:current-page.sync="currentPage"
					:pagination-simple="true"
					pagination-position="bottom"
					default-sort-direction="asc"
					:detailed="detailed"
					:detail-key="detailKey"
					:show-detail-icon="showDetailIcon"
					aria-next-label="mdi-chevron-right"
					aria-previous-label="mdi-chevron-left"
					aria-page-label="Page"
					aria-current-label="Current page"
					:data="filteredlist"
					:checkable="checkable"
					:is-row-checkable="isRowCheckable"
					:checked-rows.sync="checked"
					ref="table"
					:class="addedClass()"
					:row-class="rowClass"
					:loading="isLoading"
				>
					<template slot-scope="props">
						<slot :row="props.row">
							<b-table-column
								v-for="(col, index) in dataField"
								:key="index"
								:field="col"
								:label="parseLabel(col)"
							>
								<template v-if="col === 'action'">
									<b-button
										v-for="(btn, index) in props.row.action"
										:key="index"
										tag="a"
										size="is-small"
										:type="btn.type"
										:href="btn.link"
										>{{ btn.label }}</b-button
									>
								</template>
								<template v-else-if="col === 'dropdownAction'">
									<b-dropdown aria-role="list">
										<button
											class="button is-info is-small"
											slot="trigger"
										>
											<span>⚙ Action</span>
										</button>
										<b-dropdown-item
											v-for="(btn, index) in props.row
												.dropdownAction"
											:key="index"
											aria-role="listitem"
											has-link
										>
											<a :href="btn.link"
												><span>{{ btn.label }}</span></a
											>
										</b-dropdown-item>
									</b-dropdown>
								</template>
								<span v-else> {{ props.row[col] }}</span>
							</b-table-column>
						</slot>
					</template>

					<template slot="empty">
						<slot name="empty"></slot>
					</template>
					<template slot="detail" slot-scope="props">
						<slot
							name="detail"
							:row="props.row"
							:index="props.index"
						></slot>
					</template>
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentPage: 1,
			search: "",
			checked: []
		};
	},
	watch: {
		checked: function(newdata, olddata) {
			this.$emit("onCheck", newdata);
		}
	},
	props: {
		fields: {
			type: Array,
			required: true
		},
		data: {
			type: Array,
			required: true
		},
		perPage: {
			type: Number,
			default: 5
		},
		showAll: {
			type: Boolean,
			default: false
		},
		checkable: {
			type: Boolean,
			default: false
		},
		title: {
			type: String
		},
		detailed: {
			type: Boolean,
			default: false
		},
		isRowCheckable: {
			default: function() {}
		},
		detailKey: {
			type: String
		},
		showDetailIcon: {
			type: Boolean,
			default: true
		},
		isPacked: {
			type: Boolean,
			default: true
		},
		rowClass: {
			default: function() {}
		},
		isLoading: {
			default: false
		}
	},
	computed: {
		filteredlist() {
			let self = this;
			return self.data.filter(post => {
				let found = Object.keys(post).find(key => {
					if (typeof post[key] === "string") {
						return post[key]
							.toLowerCase()
							.includes(self.search.toLowerCase());
					} else {
						return false;
					}
				});

				return found;
			});
		},
		dataField() {
			return Object.keys(this.data[0]);
		}
	},
	methods: {
		addedClass(added = "") {
			let classes = [];
			if (this.isPacked) {
				classes.push("is-packed");
			}

			return added + classes.join(" ");
		},
		toggleDetail(row) {
			this.$refs.table.toggleDetails(row);
		},
		clearChecked() {
			this.checked = [];
		},
		parseLabel(field) {
			if (field === "dropdownAction" || field === "action") {
				return "Action";
			} else {
				var str = field.replace("_", " ");
				var res = str.split(" ");
				var ade = "";

				if (res.length > 1) {
					for (let index = 0; index < res.length; index++) {
						ade =
							ade +
							(res[index]
								.toString()
								.charAt(0)
								.toUpperCase() +
								res[index].toString().slice(1)) +
							" ";
					}
				} else {
					return str.charAt(0).toUpperCase() + str.slice(1);
				}

				return ade;
			}
		},
		checkFieldIsButton(field) {
			return field.includes("Btn");
		},
		buttonField(field) {
			return this.parseLabel(field).replace("BTN", "");
		}
	}
};
</script>