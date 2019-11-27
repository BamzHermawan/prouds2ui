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
			<div class="card has-chart">
				<div class="card-content">
					<v-chart
						ref="entrychart"
						:data-bae="apiEntryChart"
						namadata="entry"
						id="entry"
						title="Entry"
					></v-chart>
				</div>
				<div class="card-content">
					<nav class="level">
						<div class="level-left">
							<div class="content">
								<p class="title is-4">Entry Score</p>
								<p class="subtitle is-6">
									<span
										class="mdi mdi-calendar in-left"
									></span>
									<span>{{ currentMonth }}</span>
								</p>
							</div>
						</div>
						<div class="level">
							<span class="brand-is-large">{{ entry }}%</span>
						</div>
					</nav>
				</div>
			</div>
		</b-modal>

		<b-modal :active.sync="showUtilization" :width="640" scroll="keep">
			<div class="card has-chart">
				<div class="card-content">
					<v-chart
						ref="utilchart"
						:data-bae="apiUtilizationChart"
						namadata="utilization"
						id="utilization"
						title="Utilization"
					></v-chart>
				</div>
				<div class="card-content">
					<nav class="level">
						<div class="level-left">
							<div class="content">
								<p class="title is-4">Utilization Score</p>
								<p class="subtitle is-6">
									<span
										class="mdi mdi-calendar in-left"
									></span>
									<span>{{ currentMonth }}</span>
								</p>
							</div>
						</div>
						<div class="level">
							<span class="brand-is-large"
								>{{ utilization }}%</span
							>
						</div>
					</nav>
				</div>
			</div>
		</b-modal>
	</section>
</template>

<script>
import Moment from "helper-moment";
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
			showUtilization: false,
			currentMonth: Moment().format("MMMM YYYY")
		};
	},
	watch: {
		showUtilization(changed) {
			if (!changed) {
				this.currentMonth = null;
			}
		},
		showEntry(changed) {
			if (!changed) {
				this.currentMonth = null;
			}
		}
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