<template>
	<div class="pages-wrapper">
		<nav
			v-if="displayBreadcrumbs"
			class="breadcrumb has-succeeds-separator"
			aria-label="breadcrumbs"
		>
			<ul class="is-marginless">
				<slot name="beforeDefault"></slot>
				<li :class="atDefault ? 'is-active' : ''">
					<a @click="showPage()">{{ defaultLabel }}</a>
				</li>
				<li v-if="!atDefault" class="is-active">
					<a href="#" aria-current="page">{{ currentLabel }}</a>
				</li>
			</ul>
		</nav>

		<slot />
	</div>
</template>

<script>
export default {
	props: {
		default: {
			type: String,
			required: true
		},
		showBreadcrumbs: {
			type: Boolean,
			default: false
		},
		hideBreadcrumbs: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			_pages: null,
			current: undefined,
			_default: undefined,
			defaultLabel: this.default
		};
	},
	computed: {
		atDefault() {
			if (this.current !== undefined) {
				return this.current.pageId === this.default;
			} else {
				return true;
			}
		},
		currentLabel() {
			if (this.current !== undefined) {
				return this.current.label;
			}

			return "loading";
		},
		displayBreadcrumbs() {
			return (
				(!this.atDefault || this.showBreadcrumbs) &&
				!this.hideBreadcrumbs
			);
		}
	},
	methods: {
		appendPage(page) {
			if (this._pages !== undefined) {
				this._pages[page.pageId] = page;
			} else {
				this._pages = JSON.parse('{ "' + page.pageId + '": null }');
				this._pages[page.pageId] = page;
			}

			if (this.default.trim() === page.pageId.trim()) {
				this.defaultLabel = page.label;
				this._default = page;
				this.current = page;
				page.show();
			}
		},
		showPage(id = null) {
			if (id === null) {
				id = this.default;
			}

			if (this._pages.hasOwnProperty(id)) {
				// hide open page
				if (this.current !== undefined) {
					let self = this;
					this.current.hide(() => {
						self._pages[id].show();
						self.current = self._pages[id];
					});
				}
			} else {
				console.log("Pages with given id is not found ", id);
			}
		}
	}
};
</script>