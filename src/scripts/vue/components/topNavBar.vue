<template>
	<nav
		class="navbar is-primary"
		role="navigation"
		aria-label="main navigation"
	>
		<div class="navbar-brand">
			<a class="navbar-item" :href="homeLinkCheck">
				<span class="mdi mdi-view-grid in-left"></span>
				PROUDS
			</a>

			<a
				role="button"
				:class="navbarStatus('navbar-burger burger')"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarBasicExample"
				@click="activeNavbar = !activeNavbar"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div
			id="navbarBasicExample"
			:class="navbarStatus('navbar-menu animated fadeIn')"
		>
			<div class="navbar-start">
				<a
					v-for="(menu, index) in showLeftMenu"
					:key="index"
					:href="menu.link"
					class="navbar-item"
				>
					<span
						v-if="menu.icon != ''"
						:class="'mdi ' + menu.icon + ' in-left'"
					></span>
					{{ menu.label }}
				</a>
			</div>

			<div class="navbar-end">
				<a
					v-for="(menu, index) in showRightMenu"
					:key="index"
					:href="menu.link"
					class="navbar-item"
				>
					<span
						v-if="menu.icon != ''"
						:class="'mdi ' + menu.icon + ' in-left'"
					></span>
					{{ menu.label }}
				</a>
			</div>
		</div>
	</nav>
</template>

<style lang="scss">
@import "../../../styles/main.scss";

.navbar {
	margin-bottom: 10px;
}

.navbar-item {
	font-family: $roboto;
	text-transform: uppercase;
}

.navbar-burger {
	cursor: pointer;
}

@media only screen and (max-width: 480px) {
	.navbar {
		margin-bottom: 20px;
	}

	.navbar-end {
		padding-top: 10px;
		margin-top: 10px;
		border-top-color: $primary;
		border-top-width: 2px;
		border-top-style: solid;
	}
}
</style>


<script>
import "../../../styles/main.scss";
export default {
	props: {
		leftMenu: {
			type: Array,
			required: false
		},
		rightMenu: {
			type: Array,
			required: false
		},
		homeLink: {
			type: String,
			required: false
		}
	},
	data() {
		return {
			menu: {
				left: [
					{ label: "setting", link: "#setting", icon: "mdi-cogs" }
				],
				right: [{ label: "🔒 logout", link: "#logout", icon: "" }]
			},
			activeNavbar: false
		};
	},
	computed: {
		showLeftMenu() {
			if (this.leftMenu === undefined) return this.menu.left;
			return this.leftMenu.length > 0 ? this.leftMenu : this.menu.left;
		},
		showRightMenu() {
			if (this.rightMenu === undefined) return this.menu.right;
			return this.rightMenu.length > 0 ? this.rightMenu : this.menu.right;
		},
		homeLinkCheck() {
			if (this.homeLink === undefined) return "#";
			return this.homeLink;
		}
	},
	methods: {
		navbarStatus(paddingClass) {
			return paddingClass + (this.activeNavbar ? " is-active" : "");
		}
	}
};
</script>
