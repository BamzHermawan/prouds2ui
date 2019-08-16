<template>
	<div>
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
				<section class="section">
					<slot></slot>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		configMenu: {
			type: Array,
			required: false
		}
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