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
						<p class="title is-size-3">CUSTOMER</p>
					</section>
					<section class="info">
						<div class="columns is-desktop">
							<div class="column is-12">
								<data-table
									title="Customer List"
									:data="dataCustomer"
									:fields="[]"
								>
									<template slot-scope="props">
										<b-table-column
											field="customer_name"
											label="👨‍💼 Customer Name"
										>
											<span>{{
												props.row.customer_name
											}}</span>
										</b-table-column>
										<b-table-column
											field="alamat"
											label="Alamat"
										>
											<span>{{ props.row.alamat }}</span>
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
import Axios from "axios";
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
			dataCustomer: DATACUSTOMER,
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
	},
	mounted() {}
};
</script>
