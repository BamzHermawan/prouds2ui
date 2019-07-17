<template>
	<div class="dashboard">
		<div class="columns" style="margin-bottom:0px;">
			<div
				class="column is-section is-3-desktop is-4-tablet is-hidden-touch has-background-light"
			>
				<figure class="profile-user">
					<img :src="imageProfile" alt="user-profile-image" />
				</figure>

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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Fusce id fermentum quam. Proin sagittis, nibh id
						hendrerit imperdiet, elit sapien laoreet elit
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
							<button class="button is-success is-small">
								<span
									class="mdi mdi-bookmark-plus-outline in-left"
								></span>
								New Timesheet
							</button>
						</div>
					</article>
					<hr style="margin-top: 5px;" />
					<log
						v-for="n in 10"
						:key="n"
						title="Belajar Pentaho"
						subtitle="@adewiranata - 11 juli 19 : 09.20"
						thumbnail="http://mantap:8080/media/user.jpeg"
					>
						<div slot="body">
							Hari ini saya dengan senang hati belajar pentaho.
							walau susah, tapi saya harus senang dalam belajar.
							Mantafffff!.
						</div>
					</log>
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
export default {
	props: {
		showNewprojectNotif: Boolean,
		showTimesheetNotif: Boolean,
		imageProfile: String,
		username: String,
		nik: String,
		bu: String
	},
	components: {
		log
	},
	data() {
		return {
			showInfo: false,
			showAction: false
		};
	}
};
</script>

