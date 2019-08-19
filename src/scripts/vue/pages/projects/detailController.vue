<template>
	<div class="dashboard">
		<div class="columns" style="margin-bottom:0px;">
			<div
				class="column is-section is-3-desktop is-4-tablet is-hidden-touch has-background-light"
			>
				<section class="hero is-success is-sidebar is-bold">
					<div class="hero-body">
						<div class="content">
							<p class="title is-5 is-uppercase is-marginless">
								{{ project_name }}
							</p>
							<p class="is-size-5">
								<b-tag
									type="is-dark"
									:closable="false"
									@close="isTag1Active = false"
								>
									In Progress
								</b-tag>
							</p>
						</div>
					</div>
				</section>
				<section class="info user-bu">
					<div class="columns is-multiline">
						<div class="column is-full">
							<p class="heading has-text-primary">
								<b>Delivery Business Unit</b>
							</p>
							<p class="subtitle">{{ bu }}</p>
						</div>
						<div class="column is-full">
							<p class="heading has-text-primary">
								<b>IWO NUMBER</b>
							</p>
							<p class="subtitle">{{ iwo }}</p>
						</div>
						<div class="column is-half">
							<p class="heading has-text-primary">
								<b>START</b>
							</p>
							<p class="subtitle">{{ start }}</p>
						</div>
						<div class="column is-half">
							<p class="heading has-text-primary">
								<b>DEADLINE</b>
							</p>
							<p class="subtitle">{{ deadline }}</p>
						</div>
						<div class="column is-one-third">
							<p class="heading has-text-primary">
								<b>RESOURCE</b>
							</p>
							<p class="subtitle">
								{{ resource }} of {{ max_resource }}
							</p>
						</div>
						<div class="column is-one-third">
							<p class="heading has-text-primary">
								<b>SPI</b>
							</p>
							<p class="subtitle">
								{{ spi }}
							</p>
						</div>
						<div class="column is-one-third">
							<p class="heading has-text-primary">
								<b>CPI</b>
							</p>
							<p class="subtitle">
								{{ cpi }}
							</p>
						</div>
					</div>
				</section>
				<section class="info user-bu">
					<label class="is-size-6 has-text-primary"
						>Project Manager</label
					>
					<log
						:title="username"
						thumbnail="http://localhost:5501/demo/user_avatar.php?nik=rand"
						class="animated fadeIn"
					>
						<p slot="body">
							<label class="is-size-6">
								<div>
									{{ nik }}
								</div>
								<div>
									{{ bu }}
								</div>
							</label>
						</p>
					</log>
					<div style="margin-top: 10px">
						<label class="is-size-7 has-text-primary"
							>Progress (70%)</label
						>
						<progress
							class="progress is-small is-success"
							:value="progress_project"
							max="100"
							>{{ progress_project }}%</progress
						>
						<label class="is-size-7 has-text-primary"
							>BAST ({{ progress_bast }} of {{ j_bast }})</label
						>
						<progress
							class="progress is-small is-success"
							:value="bast"
							max="100"
							>{{ bast }}%</progress
						>
					</div>
				</section>
			</div>
			<div class="column">
				<section class="activity">
					<div class="content">
						<p class="title is-4">⚡ Activity</p>
						<hr />
					</div>
					<slot name="activity-section"></slot>
					<div ref="infinitescrolltrigger" id="scroll-trigger"></div>
					<hr style="margin-top: 5px;" />
					<section v-if="showloader">
						<b-notification
							style="background-color:#fff; height:50px"
							:closable="false"
						>
							<b-loading
								:is-full-page="isFullPage"
								:active.sync="isLoading"
								:can-cancel="true"
							></b-loading>
						</b-notification>
					</section>
				</section>
			</div>
			<div
				class="column is-section is-2-widescreen is-3-desktop is-hidden-touch has-background-light"
			>
				<section class="info">
					<h5 class="is-size-5">
						Member ({{ resource }}/{{ max_resource }})
					</h5>
					<hr style="margin-top: 5px; margin-bottom: 10px;" />
					<div class="columns is-gapless is-multiline">
						<div class="column" style="padding: 2px !important;">
							<p class="image is-square">
								<img
									src="http://localhost:5501/demo/user_avatar.php?nik=11"
								/>
							</p>
						</div>
						<div class="column" style="padding: 2px !important;">
							<p class="image is-square">
								<img
									src="http://localhost:5501/demo/user_avatar.php?nik=12"
								/>
							</p>
						</div>
						<div class="column" style="padding: 2px !important;">
							<p class="image is-square">
								<img
									src="http://localhost:5501/demo/user_avatar.php?nik=18"
								/>
							</p>
						</div>
					</div>
					<slot name="assign-member"></slot>
				</section>

				<section class="info">
					<h5 class="is-size-5">Documents</h5>
					<hr
						class="has-background-grey-lighter"
						style="margin-top: 5px; margin-bottom: 10px;"
					/>
					<slot name="documents"></slot>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import log from "../../components/mediaLog";
import vChart from "../../components/highchart";
import { setTimeout } from "timers";
export default {
	props: {
		showNewprojectNotif: Boolean,
		showTimesheetNotif: Boolean,
		imageProfile: String,
		project_name: String,
		username: String,
		nik: String,
		bu: String,
		iwo: String,
		start: String,
		deadline: String,
		spi: String,
		cpi: String,
		resource: String,
		max_resource: String,
		progress_project: "",
		progress_bast: "",
		j_bast: "",
		color: String
	},
	components: {
		log,
		vChart
	},
	data() {
		return {
			isLoading: false,
			isFullPage: false,
			showInfo: false,
			showAction: false,
			entry: ENTRY,
			utilization: UTILIZATION,
			activity: ACTIVITY,
			currentPage: 1,
			maxPerPage: 10,
			totalResults: 100,
			showloader: false,
			bast: ""
		};
	},
	computed: {
		pageCount() {
			return Math.ceil(this.activity.length / this.maxPerPage);
		},
		pageOffset() {
			var a = this.maxPerPage * this.currentPage;
			var b;
			if (this.activity.length > a) {
				b = this.activity.length - a;
				return this.activity.length - b;
			} else {
				b = a - this.activity.length;
				return a - b;
			}
		}
	},
	methods: {
		scrollTrigger() {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (
						entry.intersectionRatio > 0 &&
						this.currentPage < this.pageCount
					) {
						this.showloader = true;
						this.isLoading = true;
						setTimeout(() => {
							this.currentPage += 1;
							this.isLoading = false;
							this.showloader = false;
						}, 2000);
					}
				});
			});
			observer.observe(this.$refs.infinitescrolltrigger);
		}
	},
	mounted() {
		this.bast = (this.progress_bast / this.j_bast) * 100;
		this.scrollTrigger();
	}
};
</script>