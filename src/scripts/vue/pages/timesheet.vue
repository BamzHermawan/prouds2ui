<template>
	<section class="main-content centerajah">
		<p class="title is-size-3">Timesheet</p>
		<div class="columns">
			<div class="column">
				<p class="heading">Project</p>
				<b-field>
					<b-select
						expanded
						name="project"
						placeholder="Choose Project"
					>
						<option value="0">Choose Project</option>
						<option value="1">Test</option>
					</b-select>
				</b-field>
			</div>
			<div class="column">
				<p class="heading">Task</p>
				<b-field>
					<b-select expanded>
						<option value="1">Test</option>
					</b-select>
				</b-field>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>