<template>
	<div class="pages-wrapper">
		<nav
			v-if="!atDefault"
			class="breadcrumb has-succeeds-separator"
			aria-label="breadcrumbs"
		>
			<ul class="is-marginless">
				<li>
					<a @click="showPage()">{{ defaultLabel }}</a>
				</li>
				<li class="is-active">
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
		}
	},
	data() {
		return {
			_pages: null,
			_default: undefined,
			current: undefined
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
		defaultLabel() {
			if (this._default !== undefined) {
				return this._default.label;
			}

			return "loading";
		},
		currentLabel() {
			if (this.current !== undefined) {
				return this.current.label;
			}

			return "loading";
		}
	},
	methods: {
		appendPage(id, page, isDefault = false) {
			if (this._pages !== undefined) {
				this._pages[id] = page;
			} else {
				this._pages = JSON.parse('{ "' + id + '": null }');
				this._pages[id] = page;
			}

			if (isDefault) {
				page.show();
				this._default = page;
				this.current = this._default;
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