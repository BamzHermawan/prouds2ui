<template>
	<div class="dashboard">
		<div class="columns" style="margin-bottom:0px;">
			<div
				class="column is-section is-3-desktop is-4-tablet is-hidden-touch has-background-light"
			>
				<vue-clazy-load
					v-if="imageProfile !== undefined"
					:src="imageProfile"
					class="profile-user"
					tag="figure"
				>
					<img :src="imageProfile" />
					<template slot="placeholder">
						<div
							style="display:grid; margin-top:45px; justify-content:center;"
						>
							<span
								class="mdi mdi-spin mdi-loading mdi-48px"
							></span>
						</div>
					</template>
				</vue-clazy-load>

				<section class="info user-info">
					<h5 class="is-size-4 has-text-primary">{{ username }}</h5>
					<p class="is-size-5">
						<span
							class="mdi mdi-account-box-outline in-left"
						></span>
						{{ nik }}
					</p>
				</section>

				<section class="info user-bu">
					<label class="is-size-6 has-text-primary"
						>Business Unit</label
					>
					<h5 class="is-size-5">{{ bu }}</h5>
				</section>

				<section class="info user-bu">
					<b-message
						title="📈 My Performance"
						type="is-dark"
						:closable="false"
					>
						<v-chart
							:data-bae="apiEntryChart"
							namadata="entry"
							id="entry"
							title="Entry"
							:color="['#d36464', '#333']"
						></v-chart>
					</b-message>
					<b-message
						title="📈 My Performance"
						type="is-dark"
						:closable="false"
					>
						<v-chart
							:data-bae="dataUtilization"
							namadata="utilization"
							id="utilization"
							title="Utilization"
							:color="['#d36464', '#333']"
						></v-chart>
					</b-message>
				</section>
			</div>
			<div class="column is-section">
				<section class="activity">
					<div class="tabs is-toggle is-fullwidth is-hidden-desktop">
						<ul>
							<li>
								<a @click="showInfo = !showInfo">
									<span class="icon is-small"
										><span
											class="mdi mdi-information"
										></span
									></span>
									<span>My Info</span>
								</a>
							</li>
							<li>
								<a @click="showAction = !showAction">
									<span class="icon is-small"
										><span
											class="mdi mdi-format-list-checkbox"
										></span
									></span>
									<span>My Task</span>
								</a>
							</li>
						</ul>
					</div>
					<b-message
						v-if="showNewprojectNotif"
						title="📢 New Project Added"
						type="is-warning"
						aria-close-label="Close message"
					>
						<slot name="new-project-notification"></slot>
					</b-message>
					<b-message
						v-if="showTimesheetNotif"
						title="👍 Approved Timesheet"
						type="is-success"
						aria-close-label="Close message"
					>
						<slot name="timesheet-notification"></slot>
					</b-message>
					<article
						class="message"
						style="margin-bottom: 0px; margin-top: 25px;"
					>
						<div class="message-header">
							<p>⚡ Activity</p>
							<b-button
								type="is-success"
								size="is-small"
								tag="a"
								href="http://localhost:5500/timesheet.html"
							>
								<span
									class="mdi mdi-bookmark-plus-outline in-left"
								></span>
								New Timesheet
							</b-button>
						</div>
					</article>
					<hr style="margin-top: 5px;" />
					<log
						v-for="(n, index) in pageOffset"
						:key="index"
						:title="activity[index].title"
						:subtitle="activity[index].subtitle"
						:thumbnail="activity[index].thumbnail"
						class="animated fadeIn"
					>
						<p slot="body">
							{{ activity[index].body }}
						</p>
					</log>
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
					<h5 class="is-size-5">Recent Projects</h5>
					<hr
						class="has-background-grey-lighter"
						style="margin-top: 5px; margin-bottom: 10px;"
					/>
					<slot name="recent-project"></slot>
				</section>

				<section class="info">
					<h5 class="is-size-5">My Task: 11 Juli 2019</h5>
					<hr
						class="has-background-grey-lighter"
						style="margin-top: 5px; margin-bottom: 10px;"
					/>
					<slot name="today-task"></slot>
				</section>
			</div>
		</div>

		<b-modal :active.sync="showInfo" :width="640" scroll="keep">
			<div class="card">
				<div class="card-image">
					<figure class="image is-square">
						<img :src="imageProfile" alt="Image" />
					</figure>
				</div>
				<div class="card-content">
					<div class="media">
						<div class="media-content">
							<p class="title is-4">{{ username }}</p>
							<p class="subtitle is-6">
								<span
									class="mdi mdi-account-box-outline in-left"
								></span>
								{{ nik }}
							</p>
						</div>
					</div>

					<div class="content">
						<p class="title is-6">My Performance</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Soluta illo, optio aliquid cum provident sit
							minus consequuntur alias, dicta commodi sed
							quibusdam tempora velit recusandae voluptatem. Nulla
							iste consequuntur hic.
						</p>
					</div>
				</div>
			</div>
		</b-modal>

		<b-modal
			:active.sync="showAction"
			full-screen
			scroll="keep"
			:can-cancel="false"
		>
			<div class="modal-card" style="width: auto">
				<header class="modal-card-head">
					<p class="modal-card-title">My Task</p>
					<a
						@click="showAction = !showAction"
						class="card-header-icon"
						aria-label="close task"
					>
						<b-icon
							icon="close-circle-outline"
							type="is-dark"
						></b-icon>
					</a>
				</header>
				<section class="modal-card-body">
					<section class="info">
						<h5 class="is-size-5">Recent Projects</h5>
						<hr
							class="has-background-grey-lighter"
							style="margin-top: 5px; margin-bottom: 10px;"
						/>
						<slot name="recent-project"></slot>
					</section>

					<section class="info">
						<h5 class="is-size-5">My Task: 11 Juli 2019</h5>
						<hr
							class="has-background-grey-lighter"
							style="margin-top: 5px; margin-bottom: 10px;"
						/>
						<slot name="today-task"></slot>
					</section>
				</section>
			</div>
		</b-modal>
	</div>
</template>

<script>
import log from "../components/mediaLog";
import vChart from "../components/highchart";
import { setTimeout } from "timers";
import { VueClazyLoad } from "vue-clazy-load";

export default {
	props: {
		showNewprojectNotif: Boolean,
		showTimesheetNotif: Boolean,
		imageProfile: String,
		username: String,
		nik: String,
		bu: String,
		color: String,
		apiEntryChart: {
			type: String
		},
		apiUtilizationChart: {
			type: String
		}
	},
	components: {
		log,
		vChart,
		VueClazyLoad
	},
	data() {
		return {
			isLoading: false,
			isFullPage: false,
			showInfo: false,
			showAction: false,
			dataEntry: ENTRY,
			dataUtilization: UTILIZATION,
			activity: ACTIVITY,
			currentPage: 1,
			maxPerPage: 10,
			totalResults: 100,
			showloader: false
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
		this.scrollTrigger();
	}
};
</script>

