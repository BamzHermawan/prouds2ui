<template>
	<div>
		<div class="columns" style="margin-bottom:0px;">
			<div class="column is-section is-hidden-touch is-sidebar">
				<section class="hero is-white is-bold is-sidebar">
					<div class="hero-body">
						<div class="content">
							<p
								class="title is-5 is-uppercase is-marginless has-text-danger"
							>
								<b>Configuration Menu</b>
							</p>
						</div>
					</div>
				</section>
				<section class="info user-info">
					<b-menu class="is-danger">
						<b-menu-list class="sideMenu">
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