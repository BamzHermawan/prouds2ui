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
			<div class="column is-section">
				<div>
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
			dataUserInternal: DATA_USER_INTERNAL,
			fieldsuserinternal: FIELDS_USER_INTERNAL,
			dataUserExternal: DATA_USER_EXTERNAL,
			fieldsuserExternal: FIELDS_USER_EXTERNAL,
			dataBaselineStatus: DATA_BASELINE_STATUS,
			fieldBaselineStatus: FIELDS_BASELINE_STATUS,
			dataBaselineType: DATA_BASELINE_TYPE,
			fieldBaselineType: FIELDS_BASELINE_TYPE,
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
