<template>
	<section class="main-content centerajah">
		<p class="title is-size-3">Timesheet</p>
		<form :action="actionEvent" method="POST">
			<div class="columns">
				<div class="column">
					<p class="heading">Project</p>
					<b-field>
						<b-select
							expanded
							name="project"
							placeholder="-Choose Project-"
							required
						>
							<slot name="select-project"></slot>
						</b-select>
					</b-field>
				</div>
				<div class="column">
					<p class="heading">Task</p>
					<b-field>
						<b-select
							expanded
							name="task"
							placeholder="-Select Task-"
							required
						>
							<slot name="select-task"></slot>
						</b-select>
					</b-field>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<p class="heading">Choose Date</p>
					<b-field>
						<b-datepicker
							placeholder="DD/MM/YYYY"
							:min-date="minDate"
							:max-date="maxDate"
							name="date"
							required
						>
						</b-datepicker>
					</b-field>
				</div>
				<div class="column">
					<p class="heading">Select Area</p>
					<b-field>
						<b-select
							expanded
							name="level"
							placeholder="-Select Area-"
							required
						>
							<slot name="employee-level"></slot>
						</b-select>
					</b-field>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<p class="heading">Activity</p>
					<b-field>
						<b-input
							maxlength="200"
							type="textarea"
							name="activity"
							required
						></b-input>
					</b-field>
				</div>
			</div>
			<b-button class="button is-success" type="submit">
				Save
			</b-button>
		</form>
		<div style="margin-top:30px">
			<nav class="level">
				<div class="level-left">
					<p class="title is-size-3">Draft Timesheet</p>
				</div>
				<div class="level-right">
					<b-button type="is-info">
						SEND ALL
					</b-button>
				</div>
			</nav>
			<div
				class="columns"
				v-for="(drafttimesheet, index) in draft"
				:key="index"
			>
				<div class="column">
					<div class="card">
						<header class="card-header">
							<p class="card-header-title is-size-5">
								{{ drafttimesheet.title }}
							</p>
						</header>
						<div class="card-content">
							<div class="content">
								<p>
									<b>Activity : </b
									>{{ drafttimesheet.activity }}
								</p>
								<div class="level">
									<div class="level-left">
										<small
											><p>
												Submitted on :
												{{
													drafttimesheet.submitted_on
												}}
											</p></small
										>
									</div>
									<div class="level-right">
										<small
											><p>
												Submitted for :
												{{
													drafttimesheet.submitted_for
												}}
											</p></small
										>
									</div>
								</div>
							</div>
						</div>
						<footer class="card-footer">
							<a href="#" class="card-footer-item">Send</a>
							<a href="#" class="card-footer-item">Edit</a>
							<a href="#" class="card-footer-item">Delete</a>
						</footer>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		actionEvent: {
			type: String,
			required: true
		}
	},
	data() {
		const today = this.getMonday(new Date());
		return {
			minDate: new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate() - 7
			),
			maxDate: new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate() + 6
			),
			monday: this.getMonday(new Date()),
			draft: DRAFT
		};
	},
	methods: {
		getMonday(d) {
			d = new Date(d);
			var day = d.getDay(),
				diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
			return new Date(d.setDate(diff));
		}
	}
};
</script>