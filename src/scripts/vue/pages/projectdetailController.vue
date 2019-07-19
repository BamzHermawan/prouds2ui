<template>
	<div class="dashboard">
		<div class="columns" style="margin-bottom:0px;">
			<div
				class="column is-section is-3-desktop is-4-tablet is-hidden-touch has-background-light"
			>
				<section class="info user-info">
					<h5 class="is-size-4 has-text-primary">{{ project_name }}</h5>
					<p class="is-size-5">
						<b-tag
							type="is-success"
							:closable="false"
							@close="isTag1Active = false"
						>
							In Progress
						</b-tag>
					</p>
				</section>
				<section class="info user-bu">
					<div class="level">
						<div class="level-left">
							<div>
								<label class="is-size-6 has-text-primary"
									>Business Delivery</label
								>
								<h5 class="is-size-6">{{ bu }}</h5>
							</div>
						</div>
					</div>
					<div class="level">
						<div class="level-left">
							<div>
								<label class="is-size-6 has-text-primary"
									>IWO</label
								>
								<h5 class="is-size-6">{{ iwo }}</h5>
							</div>
						</div>
					</div>
					<div class="level">
						<div class="level-left">
							<div>
								<label class="is-size-6 has-text-primary"
									>Start</label
								>
								<h5 class="is-size-6">{{ start }}</h5>
							</div>
						</div>
						<div class="level-item">
							<div>
								<label class="is-size-6 has-text-primary"
									>Deadline</label
								>
								<h5 class="is-size-6">{{ deadline }}</h5>
							</div>
						</div>
					</div>
					<div class="level">
						<div class="level-left">
							<div>
								<label class="is-size-6 has-text-primary"
									>spi</label
								>
								<h5 class="is-size-6">{{ spi }}</h5>
							</div>
						</div>
						<div class="level-item">
							<div>
								<label class="is-size-6 has-text-primary"
									>spi</label
								>
								<h5 class="is-size-6">{{ cpi }}</h5>
							</div>
						</div>
					</div>

					<div class="level">
						<div class="level-left">
							<div>
								<label class="is-size-6 has-text-primary"
									>Allocated Resource</label
								>
								<h5 class="is-size-6">{{ resource }} of {{max_resource}}</h5>
							</div>
						</div>
					</div>
				</section>
				<section class="info user-bu">
					<label class="is-size-6 has-text-primary"
						>Project Manager</label
					>
					<log
						:title="username"
						thumbnail="https://i.pinimg.com/originals/3a/48/27/3a4827b970f20b646f91c81ec65ec316.jpg"
						class="animated fadeIn"
					>
						<p slot="body">
							<label class="is-size-6">
								<div>
									{{nik}}
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
					<article
						class="message"
						style="margin-bottom: 0px; margin-top: 25px;"
					>
						<div class="message-header">
							<p>⚡ Activity</p>
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
					<h5 class="is-size-5">Member ({{resource}}/{{max_resource}})</h5>
					<hr style="margin-top: 5px; margin-bottom: 10px;" />
					<div class="columns is-gapless is-multiline">
						<div class="column">
							<p class="image is-24x24">
								<img
									src="https://i.pinimg.com/originals/3a/48/27/3a4827b970f20b646f91c81ec65ec316.jpg"
								/>
							</p>
						</div>
						<div class="column">
							<p class="image is-24x24">
								<img
									src="https://i.pinimg.com/originals/3a/48/27/3a4827b970f20b646f91c81ec65ec316.jpg"
								/>
							</p>
						</div>
						<div class="column">
							<p class="image is-24x24">
								<img
									src="https://i.pinimg.com/originals/3a/48/27/3a4827b970f20b646f91c81ec65ec316.jpg"
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
		bast: String,
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

