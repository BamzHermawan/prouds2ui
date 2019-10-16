<template>
	<article class="media">
		<div v-if="$slots.atLeft !== undefined" class="media-left">
			<slot name="atLeft"></slot>
		</div>
		<vue-clazy-load
			v-if="thumbnail !== undefined"
			:src="thumbnail"
			class="media-left image is-64x64"
			tag="figure"
		>
			<img :src="thumbnail" />
			<template slot="placeholder">
				<b-loading active :is-full-page="false"></b-loading>
			</template>
		</vue-clazy-load>
		<div class="media-content">
			<div class="content">
				<p v-if="type === undefined">
					<strong>{{ title }}</strong> <small>{{ subtitle }}</small>
					<br />
					<slot name="body"></slot>
				</p>

				<b-message v-else :type="type" size="is-small">
					<h4 class="is-size-6" style="margin-bottom: 5px;">
						<strong>{{ title }}</strong>
						<small>{{ subtitle }}</small>
					</h4>
					<slot name="body"></slot>
				</b-message>
			</div>
		</div>
		<div v-if="$slots.action !== undefined" class="media-right">
			<slot name="action"></slot>
		</div>
	</article>
</template>

<script>
import { VueClazyLoad } from "vue-clazy-load";
export default {
	components: { VueClazyLoad },
	props: ["thumbnail", "title", "subtitle", "type"]
};
</script>


