<template>
	<section class="info-bottom-bar">
		<div class="columns">
			<div class="column is-copyright">
				<p>Copyright &copy; Telkomsigma, 2019.</p>
			</div>
			<div class="column is-info-bar">
				<div v-if="haveSlot" class="is-maarque">
					<slot></slot>
				</div>
				<div v-else class="is-performance is-clearfix">
					<p @click="showEntry = true" class="item is-pulled-right">
						Entry: {{ entry }}%
					</p>
					<p
						@click="showUtilization = true"
						class="item is-pulled-right"
					>
						Utilization: {{ utilization }}%
					</p>
				</div>
			</div>
		</div>

		<b-modal :active.sync="showEntry">
			<!-- TODO: Ade -->

			<!-- Dari sini dihapus ganti chart -->
			<section class="is-404-content">
				<div class="container has-text-centered">
					<h1>ENTRY CHART</h1>
					<p class="is-low-bottom has-text-dark">
						Chartnya bikin yang kaya gini:
						<a
							href="https://www.highcharts.com/demo/line-time-series/grid-light"
							>https://www.highcharts.com/demo/line-time-series/grid-light</a
						>
					</p>
				</div>
			</section>
			<!-- sampe sini dihapus ganti chart -->

			<!-- Chartnya kasih container tapi -->
			<!-- <div class="container"></div> -->
		</b-modal>

		<b-modal :active.sync="showUtilization">
			<!-- TODO: Ade -->

			<!-- Dari sini dihapus ganti chart -->
			<section class="is-404-content">
				<div class="container has-text-centered">
					<h1>UTILIZATION CHART</h1>
					<p class="is-low-bottom has-text-dark">
						Chartnya bikin yang kaya gini:
						<a
							href="https://www.highcharts.com/demo/line-time-series/grid-light"
							>https://www.highcharts.com/demo/line-time-series/grid-light</a
						>
					</p>
				</div>
			</section>
			<!-- sampe sini dihapus ganti chart -->

			<!-- Chartnya kasih container tapi -->
			<!-- <div class="container"></div> -->
		</b-modal>
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
	},
	data() {
		return {
			showEntry: false,
			showUtilization: false
		};
	},
	computed: {
		haveSlot() {
			return this.$slots.default !== undefined;
		}
	}
};
</script>