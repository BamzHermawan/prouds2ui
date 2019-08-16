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
						<b-tabs class="block">
							<b-tab-item label="Internal">
								<data-table
									:data="dataUserInternal"
									:fields="[]"
								>
									<template slot-scope="props">
										<b-table-column
											field="user_id"
											label="User ID"
											name="userId"
											v-model="userId"
										>
											<span>{{ props.row.user_id }}</span>
										</b-table-column>
										<b-table-column
											field="name"
											label="Name"
										>
											<span>{{ props.row.name }}</span>
										</b-table-column>
										<b-table-column
											field="email"
											label="Email"
										>
											<span>{{ props.row.email }}</span>
										</b-table-column>
										<b-table-column
											field="bu"
											label="Business_unit"
										>
											<span>{{ props.row.bu }}</span>
										</b-table-column>
										<b-table-column
											field="profile"
											label="Profile"
										>
											<span>{{ props.row.profile }}</span>
										</b-table-column>
										<b-table-column
											field="user_id"
											label="Action"
										>
											<b-dropdown aria-role="list">
												<button
													class="button is-info is-small"
													slot="trigger"
												>
													<span>⚙ Action</span>
												</button>

												<b-dropdown-item
													aria-role="listitem"
													has-link
												>
													<a
														:href="
															props.row
																.editUserLink
														"
														>Edit</a
													>
												</b-dropdown-item>
												<b-dropdown-item
													aria-role="listitem"
													has-link=""
												>
													<a
														:href="
															props.row
																.editPasswordLink
														"
														>Ganti Password</a
													>
												</b-dropdown-item>
											</b-dropdown>
											<a
												v-if="!props.row.status"
												:href="
													props.row.deactivation_link
												"
												class="button is-small is-warning"
												>🔒 Deactivate</a
											>
											<a
												v-else
												:href="
													props.row.activation_link
												"
												class="button is-small is-success"
												>🔓 Activate</a
											>
										</b-table-column>
									</template>
								</data-table>
							</b-tab-item>
							<b-tab-item label="External">
								<data-table
									:data="dataUserExternal"
									:fields="[]"
								>
									<template slot-scope="props">
										<b-table-column
											field="user_id"
											label="User ID"
											name="userId"
											v-model="userId"
										>
											<span>{{ props.row.user_id }}</span>
										</b-table-column>
										<b-table-column
											field="name"
											label="Name"
										>
											<span>{{ props.row.name }}</span>
										</b-table-column>
										<b-table-column
											field="email"
											label="Email"
										>
											<span>{{ props.row.email }}</span>
										</b-table-column>
										<b-table-column
											field="bu"
											label="Business_unit"
										>
											<span>{{ props.row.bu }}</span>
										</b-table-column>
										<b-table-column
											field="profile"
											label="Profile"
										>
											<span>{{ props.row.profile }}</span>
										</b-table-column>
										<b-table-column
											field="user_id"
											label="Action"
										>
											<b-dropdown aria-role="list">
												<button
													class="button is-info is-small"
													slot="trigger"
												>
													<span>⚙ Action</span>
												</button>

												<b-dropdown-item
													aria-role="listitem"
													has-link
												>
													<a
														:href="
															props.row
																.editUserLink
														"
														>Edit</a
													>
												</b-dropdown-item>
												<b-dropdown-item
													aria-role="listitem"
													has-link=""
												>
													<a
														:href="
															props.row
																.editPasswordLink
														"
														>Ganti Password</a
													>
												</b-dropdown-item>
											</b-dropdown>
											<a
												v-if="!props.row.status"
												:href="
													props.row.deactivation_link
												"
												class="button is-small is-warning"
												>🔒 Deactivate</a
											>
											<a
												v-else
												:href="
													props.row.activation_link
												"
												class="button is-small is-success"
												>🔓 Activate</a
											>
										</b-table-column>
									</template>
								</data-table>
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
import Axios from "axios";
export default {
	props: {
		configMenu: {
			type: Array,
			required: false
		},
		apiEdit: {
			type: String,
			required: true
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
			},
			userId: ""
		};
	},
	methods: {},
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
