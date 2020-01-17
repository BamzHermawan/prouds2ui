<template>
	<a :href="href" :target="target">
		<div class="box">
			<article class="media">
				<div class="media-left">
					<span class="mdi mdi-library-books mdi-36px"></span>
				</div>
				<div class="media-content">
					<div class="content">
						<slot></slot>
					</div>
				</div>
			</article>
		</div>
	</a>
</template>

<script>
export default {
	props: {
		href: {
			type: String,
			required: true
		},
		newTab: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		target() {
			return this.newTab ? "_blank" : "_self";
		}
	}
};
</script>