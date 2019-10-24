<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<form :action="actionEvent" method="POST" enctype="multipart/form-data">
			<section class="modal-card-body">
				<b-field label="Task Name">
					<b-message type="is-info" class="is-on-field">
						<p class="has-text-dark">{{ taskName }}</p>
					</b-message>
				</b-field>

				<div class="columns">
					<div class="column">
						<b-field label="Start Date">
							<b-message type="is-info" class="is-on-field">
								<p class="has-text-dark">
									{{ start | moment }}
								</p>
							</b-message>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Finish Date">
							<b-message type="is-info" class="is-on-field">
								<p class="has-text-dark">
									{{ finish | moment }}
								</p>
							</b-message>
						</b-field>
					</div>
					<input type="hidden" name="users" v-model="checkId" />
				</div>

				<b-message
					type="is-light"
					class="has-paddingless-body"
					:closable="false"
					:title="'Currently assigned (' + task.resource.length + ')'"
				>
					<b-table :data="task.resource" :fields="[]" narrowed>
						<template slot-scope="props">
							<b-table-column field="name" label="Name">
								<span>{{ props.row.name }}</span>
							</b-table-column>
							<b-table-column field="status" label="Status">
								<span>{{ props.row.status }}</span>
							</b-table-column>
							<b-table-column field="action" label="Action">
								<span v-if="props.row.actionComplete !== ''">
									<b-button
										tag="a"
										size="is-small"
										type="is-success"
										style="min-width:95px"
										:href="props.row.actionComplete"
										>Set Complete</b-button
									>
								</span>
								<span v-if="props.row.actionUnComplete !== ''">
									<b-button
										tag="a"
										size="is-small"
										type="is-warning"
										style="min-width:95px"
										:href="props.row.actionUnComplete"
										>Reassign Task</b-button
									>
								</span>
							</b-table-column>
						</template>
					</b-table>
				</b-message>

				<b-message
					type="is-light"
					class="has-paddingless-body"
					:closable="false"
					:title="'Available (' + resourceAvailable.length + ')'"
				>
					<b-table
						:data="resourceAvailable"
						:fields="[]"
						checkable
						narrowed
						:checked-rows.sync="checkedRows"
					>
						<template slot-scope="props">
							<b-table-column field="name" label="Name">
								<span>{{ props.row.name }}</span>
							</b-table-column>
						</template>
					</b-table>
				</b-message>

				<input type="hidden" name="workplanId" v-model="workplanId" />
				<input type="hidden" name="taskID" v-model="taskID" />
			</section>
			<section class="modal-card-foot is-clearfix is-block">
				<div class="is-pulled-right">
					<b-button type="is-danger" @click="$parent.close()"
						>Cancel</b-button
					>
					<button class="button is-success" type="submit">
						Update Task Resource
					</button>
				</div>
			</section>
		</form>
	</div>
</template>

<script>
import moment from "helper-moment";
import dataTableNoCard from "components";
export default {
	components: {
		dataTableNoCard
	},
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		workplanId: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dataBaru: GANTT,
			resourceAvailable: RESOURCE_AVAILABLE,
			taskName: this.task.pName,
			start: moment(this.task.pStart).format("DD/MM/YYYY"),
			finish: moment(this.task.pEnd).format("DD/MM/YYYY"),
			checkedRows: [],
			taskID: this.task.pID
		};
	},
	computed: {
		checkId() {
			let a = [];
			this.checkedRows.forEach(row => {
				a.push(row.userid);
			});
			return a;
		}
	}
};
</script>