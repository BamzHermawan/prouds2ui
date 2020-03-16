<template>
	<section>
		<div class="columns is-marginless">
			<div
				class="column is-8-desktop content is-marginless is-paddingless"
			>
				<h3
					class="is-small has-text-weight-light is-reduced-margin is-uppercase"
				>
					{{ ProjectName }}
				</h3>
				<b-field grouped>
					<div class="control">
						<b-taglist attached>
							<b-tag type="is-dark">ID</b-tag>
							<b-tag type="is-info">{{ projectId }}</b-tag>
						</b-taglist>
					</div>
					<div class="control">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">IWO</b-tag>
							<b-tag type="is-info">{{ iwo }}</b-tag>
						</b-taglist>
					</div>
				</b-field>
			</div>
			<div class="column is-clearfix is-paddingless">
				<a
					class="button is-danger is-long is-pulled-right"
					@click="$emit('cancel')"
				>
					◀ Back
				</a>
			</div>
		</div>

		<hr />

		<div class="content is-marginless">
			<h3 class="is-small has-text-weight-light is-reduced-margin">
				Set Cost Reallocation
			</h3>
		</div>
		<form
			action="http://localhost:5501/demo/post_detect.php"
			method="POST"
			enctype="multipart/form-data"
		>
			<div class="container">
				<b-input
					type="hidden"
					name="project_id"
					:value="projectId"
				></b-input>
				<b-message type="is-info" :closable="false">
					<div class="field">
						<label class="is-marginless has-text-weight-bold"
							>Current Cost</label
						>
						<p>{{ cost | currency }}</p>
					</div>
				</b-message>
				<crud-input
					type="text"
					name="cost"
					label="New Cost"
					:value="newCost | currency"
					placeholder="10.000.000"
					@input="actualCostUnformat"
				>
				</crud-input>
				<crud-input
					type="datepicker"
					label="Reallocation Date"
					name="reallocationDate"
					placeholder="Pick Reallocation Date"
					date-locale="en"
					input-style="margin-bottom: 0px;"
				>
				</crud-input>
				<br />
				<div class="is-clearfix">
					<button
						class="button is-success is-long is-pulled-right"
						type="submit"
					>
						<span>Save Milestone</span>
					</button>
				</div>
			</div>
		</form>
	</section>
</template>

<script>
export default {
	methods: {
		actualCostUnformat(val) {
			let medown = val.replace(/\D/g, "");
			this.newCost = medown;
		}
	}
};
</script>