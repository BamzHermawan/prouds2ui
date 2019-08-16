<template>
	<div class="dashboard">
		<div class="columns" style="margin-bottom:0px;">
			<div
				class="column is-section is-3-desktop is-4-tablet is-hidden-touch has-background-light"
			>
				<section class="info user-info">
					<h5 class="is-size-4 has-text-primary has-text-centered">
						Configuration Menu
					</h5>
					<hr style="margin-top: 5px;" />
					<b-menu>
						<b-menu-list label="">
							<b-menu-item
								v-for="(menu, index) in showConfigMenu"
								:key="index"
								:href="menu.link"
								:icon="menu.icon"
								:label="menu.label"
								:active="menu.active"
							></b-menu-item>
						</b-menu-list>
					</b-menu>
				</section>
			</div>
			<div class="column">
				<div>
					<section class="main-content">
						<p class="title is-size-3">ISSUE</p>
					</section>
					<section class="info">
						<div class="columns">
							<div class="column is-6">
								<data-table
									title="Issue Status"
									:data="dataIssueStatus"
									:fields="[]"
								>
									<template slot-scope="props">
										<b-table-column
											field="status_name"
											label="Status Name"
										>
											<span>{{
												props.row.status_name
											}}</span>
										</b-table-column>
										<b-table-column
											field="userId"
											label="Action"
											class="tour-step-7"
										>
											<b-button
												type="is-success"
												size="is-small"
												:href="props.row.editLink"
												tag="a"
												>📝 Edit</b-button
											>
											<b-button
												type="is-danger"
												size="is-small"
												:href="props.row.deleteLink"
												tag="a"
												>🚫 Delete</b-button
											>
										</b-table-column>
									</template>
								</data-table>
							</div>
							<div class="column is-6">
								<data-table
									title="Issue Severity"
									:data="dataIssueSeverity"
									:fields="[]"
								>
									<template slot-scope="props">
										<b-table-column
											field="severity_name"
											label="Severity Name"
										>
											<span>{{
												props.row.severity_name
											}}</span>
										</b-table-column>
										<b-table-column
											field="userId"
											label="Action"
											class="tour-step-7"
										>
											<b-button
												type="is-success"
												size="is-small"
												:href="props.row.editLink"
												tag="a"
												>📝 Edit</b-button
											>
											<b-button
												type="is-danger"
												size="is-small"
												:href="props.row.deleteLink"
												tag="a"
												>🚫 Delete</b-button
											>
										</b-table-column>
									</template>
								</data-table>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DataTable from "../../components/dataTable";
import { setTimeout } from "timers";
export default {
	props: {
		configMenu: {
			type: Array,
			required: false
		}
	},
	components: {
		DataTable
	},
	data() {
		return {
			dataIssueStatus: DATA_ISSUE_STATUS,
			fieldIssueStatus: FIELDS_ISSUE_STATUS,
			dataIssueSeverity: DATA_ISSUE_SEVERITY,
			fieldIssueSeverity: FIELDS_ISSUE_SEVERITY,
			menu: {
				config: [
					{ label: "setting", link: "#setting", icon: "mdi-cogs" }
				]
			}
		};
	},
	computed: {
		showConfigMenu() {
			if (this.configMenu === undefined) return this.menu.config;
			return this.configMenu.length > 0
				? this.configMenu
				: this.menu.config;
		}
	}
};
</script>
