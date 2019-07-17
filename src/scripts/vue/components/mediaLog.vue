<template>
	<article class="media">
		<figure v-if="thumbnail !== undefined" class="media-left">
			<img :src="thumbnail" class="image is-64x64" />
		</figure>
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
		<div class="media-right">
			<slot name="action"></slot>
		</div>
	</article>
</template>

<script>
export default {
	props: ["thumbnail", "title", "subtitle", "type"]
};
</script>


