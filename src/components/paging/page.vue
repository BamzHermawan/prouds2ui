<template>
	<div :id="'container-' + pageId" v-if="display" class="animated">
		<transition name="fade" :duration="{ enter: 1000, leave: 10 }" appear>
			<div class="vue-transition">
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script>
import { animate } from "helper-tools";
export default {
	props: {
		pageId: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			display: false
		};
	},
	methods: {
		appendtoContainer() {
			if (this.$parent.$data._pages === undefined) {
				this.$destroy();
				throw new Error("Page Section must be wrapped on Paging");
			}

			let isDefault = this.$parent.default === this.pageId;
			this.$parent.appendPage(this.pageId, this, isDefault);
		},

		doHideAnimation(callback) {
			animate("#container-" + this.pageId, "fadeOut faster", el => {
				callback();
				document.querySelector(".contentPage").scrollTop = 0;
			});
		},

		show() {
			this.display = true;
			return this.identity;
		},

		hide(callback) {
			let self = this;
			this.doHideAnimation(el => {
				self.display = false;

				callback();
			});
		},

		toggle() {
			this.display = !this.display;
			return this.identity;
		}
	},
	computed: {
		identity() {
			return {
				key: this.pageId,
				label: this.label
			};
		}
	},
	mounted() {
		this.appendtoContainer();
	}
};
</script>