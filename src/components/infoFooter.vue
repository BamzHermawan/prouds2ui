<template>
	<section class="info-bottom-bar">
		<nav class="level">
			<div class="level-left">
				<div class="level-item">
					<p>Copyright &copy; Telkomsigma, 2019.</p>
				</div>
			</div>
			<div class="level-right">
				<div class="level-item">Performance Entry: {{ entry }}%</div>
				<div class="level-item">Utilization: {{ utilization }}%</div>
			</div>
		</nav>
	</section>
</template>

<script>
export default {
	props: {
		entry: {
			type: String,
			default: 0
		},
		utilization: {
			type: String,
			default: 0
		}
	}
};
</script>