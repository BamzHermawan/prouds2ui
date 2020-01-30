<template>
	<div class="program-table">
		<nav class="level">
			<div class="level-left">
				<b-field>
					<b-input
						placeholder="Search..."
						type="search"
						icon="magnify"
						v-model="filter.query"
						style="margin-right: 10px;"
					>
					</b-input>
				</b-field>
			</div>
			<div class="level-right">
				<slot name="top-right"></slot>
				<div class="level-item">
					<b-field>
						<p class="control">
							<b-button class="is-static is-light-blend"
								>Status</b-button
							>
						</p>
						<b-select v-model="filter.status">
							<option value="#allStatus">All</option>
							<slot name="filter-status">
								<option>New</option>
								<option>Closed</option>
								<option>Dropped</option>
								<option>On Hold</option>
								<option>Completed</option>
								<option>In Progress</option>
							</slot>
						</b-select>
					</b-field>
				</div>
			</div>
		</nav>

		<b-table
			:data="filtered"
			striped
			paginated
			pagination-simple
			per-page="10"
		>
			<template slot-scope="{ row }">
				<b-table-column width="110" field="id" label="ID" sortable>
					{{ row.id }}
				</b-table-column>
				<b-table-column field="name" label="Name" sortable>
					<linker
						v-if="nameLink !== undefined"
						:href="parseLink(row)"
						>{{ row.name }}</linker
					>
					<p v-else>{{ row.name }}</p>
				</b-table-column>
				<b-table-column field="unit" label="Business Unit" sortable>
					<span>{{ row.unit.name }}</span>
				</b-table-column>
				<b-table-column
					width="150"
					field="pm"
					label="Program Manager"
					sortable
				>
					<span>{{ row.pm.name }}</span>
				</b-table-column>
				<b-table-column
					field="start"
					label="Start Date"
					sortable
					class="align-middle"
				>
					<span style="white-space: nowrap;">{{
						row.start | moment("D MMM YYYY")
					}}</span>
				</b-table-column>
				<b-table-column
					field="end"
					label="Finish Date"
					sortable
					class="align-middle"
				>
					<span style="white-space: nowrap;">{{
						row.end | moment("D MMM YYYY")
					}}</span>
				</b-table-column>
				<b-table-column
					field="status"
					label="Status"
					width="75"
					centered
					class="align-middle"
				>
					<slot name="status" :row="row"></slot>
				</b-table-column>

				<b-table-column
					field="action"
					label="Action"
					width="75"
					centered
					class="align-middle"
				>
					<slot name="action" :row="row">
						<!-- TODO: Faishol -->
						<!-- Ini untuk action PM -->
						<b-dropdown
							aria-role="list"
							position="is-bottom-left"
							class="is-small"
						>
							<span
								slot="trigger"
								class="mdi mdi-menu-custom mdi-24px"
							></span>
							<div class="dropdown-item dropdown-label">
								Program Action
							</div>
							<!-- Ini untuk action PMO -->
							<b-dropdown-item has-link>
								<a @click="emit('edit-program', row)">
									<span
										class="mdi mdi-square-edit-outline"
									></span>
									Edit Program
								</a>
							</b-dropdown-item>
							<!-- Ini untuk action PMO -->

							<div class="dropdown-item dropdown-label">
								Project Page
							</div>
							<b-dropdown-item has-link>
								<a>
									<span
										class="mdi mdi-file-document-box-multiple-outline"
									></span>
									Workplan
								</a>
							</b-dropdown-item>
							<b-dropdown-item has-link>
								<a>
									<span class="mdi mdi-table"></span>
									Internal Resources
								</a>
							</b-dropdown-item>
						</b-dropdown>
						<!-- Ini untuk action PM -->
					</slot>
				</b-table-column>
			</template>

			<template slot="empty">
				<span class="white-space"></span>
				<b-message type="is-warning">
					<p class="has-text-centered">
						Sorry, we can't find any data related
					</p>
				</b-message>
			</template>
		</b-table>
	</div>
</template>

<script>
import { statusTooltip, linker } from "components";
import { searchTree } from "helper-tools";
import { parsedURL } from "helper-apis";
export default {
	components: { statusTooltip, linker },
	props: {
		programs: {
			type: Array,
			default: []
		},
		nameLink: {
			type: String,
			default: undefined
		}
	},
	data() {
		return {
			filter: {
				status: "#allStatus",
				query: ""
			}
		};
	},
	computed: {
		filtered() {
			if (this.programs.length > 1) {
				let preped = this.filterByStatus(this.programs);
				return searchTree(preped, this.filter.query);
			} else {
				this.programs;
			}
		}
	},
	methods: {
		filterByStatus(programs) {
			if (this.filter.status == "#allStatus") {
				return programs;
			}

			return programs.filter(
				program => this.filter.status == program.status
			);
		},
		parseLink(row) {
			return parsedURL(this.nameLink, row);
		}
	}
};
</script>