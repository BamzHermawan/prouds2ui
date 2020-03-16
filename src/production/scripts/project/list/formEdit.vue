<template>
	<section>
		<div class="columns is-marginless">
			<div
				class="column is-8-desktop content is-marginless is-paddingless"
			>
				<h3
					class="is-small has-text-weight-light is-reduced-margin is-uppercase"
				>
					{{ project.project_name }}
				</h3>
				<b-field grouped>
					<slot name="tags" :row="project"></slot>
				</b-field>
			</div>
			<div class="column is-clearfix is-paddingless">
				<a
					class="button is-danger is-long is-pulled-right"
					@click="$emit('exit')"
				>
					Back
				</a>
			</div>
		</div>

		<!-- Add horizontal line -->
		<hr />

		<div class="container">
			<div class="columns">
				<div class="column is-8">
					<div class="card is-white">
						<header class="card-header">
							<p class="card-header-title">Project Profile</p>
						</header>
						<div class="card-content">
							<div class="columns is-multiline">
								<div class="column is-3-fullhd is-6-desktop">
									<b-field label="Amount">
										<p>
											{{ project.amount | currency }} IDR
										</p>
									</b-field>
								</div>

								<div class="column is-4-fullhd is-6-desktop">
									<b-field label="Project Manager">
										<p>{{ project.project_manager }}</p>
									</b-field>
								</div>

								<div class="column is-4-fullhd is-6-desktop">
									<b-field label="Co-Project Manager">
										<p>{{ project.co_project_manager }}</p>
									</b-field>
								</div>

								<div class="column is-3-fullhd is-12-desktop">
									<b-field label="Delivery Unit">
										<p>{{ project.unit_delivery }}</p>
									</b-field>
								</div>

								<div class="column is-6-fullhd is-6-desktop">
									<b-field label="Contract Length">
										<p class="is-marginless">
											<span
												>{{
													project.contract_length
												}}
												Months</span
											>
											<span
												style="margin-right: 25px;"
											></span>
											<span class="icon is-small">
												<span
													class="mdi mdi-calendar-clock"
												></span>
											</span>
											<span
												>{{ project.start | moment }} -
												{{ project.end | moment }}</span
											>
										</p>
									</b-field>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="column">
					<div style="padding: 0px 10px;">
						<slot :row="project" name="form"></slot>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		project: {
			type: Object,
			required: true
		}
	}
};
</script>