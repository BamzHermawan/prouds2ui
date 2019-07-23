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
								icon="account"
								label="Users"
								v-on:click="swapComponent('users')"
								active
							></b-menu-item>
							<b-menu-item
								icon="firebase"
								label="Baseline"
								v-on:click="swapComponent('baseline')"
							></b-menu-item>
							<b-menu-item
								icon="account-star"
								label="Customer"
							></b-menu-item>
							<b-menu-item
								icon="account-alert"
								label="Issue"
							></b-menu-item>
							<b-menu-item
								icon="account-group"
								label="Organization"
							></b-menu-item>
							<b-menu-item
								icon="account-settings"
								label="Authorization"
							></b-menu-item>
							<b-menu-item
								icon="file-document-box"
								label="Projects"
							></b-menu-item>
							<b-menu-item
								icon="calendar"
								label="Days Scheme"
							></b-menu-item>
						</b-menu-list>
					</b-menu>
				</section>
			</div>
			<div class="column is-section">
				<div v-if="user_load">
					<section class="main-content">
						<p class="title is-size-3">USERS</p>
					</section>
					<section class="info">
						<b-tabs size="is-small" class="block">
							<b-tab-item label="Internal">
								<data-table
									:data="dataUserInternal"
									:fields="fieldsuserinternal"
								></data-table>
							</b-tab-item>
							<b-tab-item label="External">
								<data-table
									:data="dataUserExternal"
									:fields="fieldsuserExternal"
								></data-table>
							</b-tab-item>
						</b-tabs>
					</section>
				</div>
				<div v-if="baseline">
					<section class="main-content">
						<p class="title is-size-3">BASELINE</p>
					</section>
					<section class="info">
						<div class="columns is-desktop">
							<div class="column is-6">
								<data-table
									title="Baseline Status"
									:data="dataBaselineStatus"
									:fields="fieldBaselineStatus"
								></data-table>
							</div>
							<div class="column is-6">
								<data-table
									title="Baseline Type"
									:data="dataBaselineType"
									:fields="fieldBaselineType"
								></data-table>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import log from "../../components/mediaLog";
import vChart from "../../components/highchart";
import DataTable from "../../components/dataTable";
import { setTimeout } from "timers";

export default {
	props: {
		showNewprojectNotif: Boolean,
		showTimesheetNotif: Boolean,
		imageProfile: String,
		project_name: String,
		username: String,
		nik: String,
		bu: String,
		iwo: String,
		start: String,
		deadline: String,
		spi: String,
		cpi: String,
		resource: String,
		max_resource: String,
		progress_project: "",
		progress_bast: "",
		j_bast: "",
		color: String
	},
	components: {
		log,
		vChart,
		DataTable,
		crot1: {
			template: "<h1>Crot in aja</h1>"
		},
		crot2: {
			template: "<h1>Crot nya jangan di dalam</h1>"
		}
	},
	data() {
		return {
			isLoading: false,
			isFullPage: false,
			showInfo: false,
			showAction: false,
			entry: ENTRY,
			utilization: UTILIZATION,
			currentPage: 1,
			maxPerPage: 10,
			totalResults: 100,
			showloader: false,
			bast: "",
			dataUserInternal: DATA_USER_INTERNAL,
			fieldsuserinternal: FIELDS_USER_INTERNAL,
			dataUserExternal: DATA_USER_EXTERNAL,
			fieldsuserExternal: FIELDS_USER_EXTERNAL,
			dataBaselineStatus: DATA_BASELINE_STATUS,
			fieldBaselineStatus: FIELDS_BASELINE_STATUS,
			dataBaselineType: DATA_BASELINE_TYPE,
			fieldBaselineType: FIELDS_BASELINE_TYPE,
			currentComponent: false,
			user_load: true,
			baseline: false
		};
	},
	computed: {},
	methods: {
		swapComponent: function(component) {
			this.currentComponent = component;
			if (this.currentComponent == "users") {
				this.user_load = true;
				this.baseline = false;
			} else if (this.currentComponent == "baseline") {
				this.baseline = true;
				this.user_load = false;
			} else {
				return false;
			}
		}
	},
	mounted() {}
};
</script>

