<template>
	<article class="media">
		<div class="media-content">
			<b-collapse :open="false">
				<a slot="trigger" slot-scope="props">
					<p>
						<span :class="'mdi ' + (!props.open ? 'mdi-chevron-down' : 'mdi-chevron-up')"></span>
						<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint incidunt a magnam?</span>
					</p>
				</a>
				<div class="notification" style="margin-top:.75em;">
					<div class="content">
						<slot></slot>
					</div>
				</div>
			</b-collapse>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		}
	}
}
</script>