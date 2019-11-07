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
			<div class="container">
				<v-chart
					:data-bae="apiEntryChart"
					namadata="entry"
					id="entry"
					title="Entry"
				></v-chart>
			</div>
		</b-modal>

		<b-modal :active.sync="showUtilization">
			<div class="container">
				<v-chart
					:data-bae="apiUtilizationChart"
					namadata="utilization"
					id="utilization"
					title="Utilization"
				></v-chart>
			</div>
		</b-modal>
	</section>
</template>

<script>
import vChart from "../components/highchart";
export default {
	props: {
		entry: {
			type: String,
			default: 0
		},
		utilization: {
			type: String,
			default: 0
		},
		apiEntryChart: {
			type: String
		},
		apiUtilizationChart: {
			type: String
		}
	},
	data() {
		return {
			showEntry: false,
			showUtilization: false
		};
	},
	components: {
		vChart
	},
	computed: {
		haveSlot() {
			return this.$slots.default !== undefined;
		}
	}
};
</script>