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
					<div class="content">
						<p class="heading has-text-primary">
							<b>Project Manager</b>
						</p>
						<p class="subtitle is-marginless">Ade Wiranata Putra</p>
						<p>Project Management Office</p>
					</div>
					<div style="margin-top: 10px">
						<label class="is-size-7 has-text-primary"
							>Progress {{ progress_project }} %</label
						>
						<progress
							class="progress is-small is-success"
							:value="progress_project"
							:max="max_progress_project"
							>{{ progress_project }}</progress
						>
						<label class="is-size-7 has-text-primary"
							>BAST ({{ progress_bast }} of {{ j_bast }})</label
						>
						<progress
							class="progress is-small is-success"
							:value="progress_bast"
							:max="j_bast"
							>{{ progress_bast }}</progress
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
					<slot name="assign-member"></slot>
				</section>

				<section class="info">
					<h5 class="is-size-5">Workplan</h5>
					<hr
						class="has-background-grey-lighter"
						style="margin-top: 5px; margin-bottom: 10px;"
					/>
					<slot name="workplan"></slot>
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
		bu: String,
		iwo: String,
		start: String,
		deadline: String,
		spi: String,
		cpi: String,
		resource: String,
		max_resource: String,
		progress_project: "",
		max_progress_project: "",
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
			showInfo: false,
			showAction: false,
			activity: ACTIVITY,
			currentPage: 1,
			maxPerPage: 10,
			totalResults: 100,
			bast: ""
		};
	}
};
</script>