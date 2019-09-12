<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body">
			<form
				:action="actionEvent"
				method="POST"
				enctype="multipart/form-data"
			>
				<div class="columns">
					<div class="column is-6">
						<p class="heading">Task Name</p>
						{{ taskName }}
					</div>
					<div class="column">
						<p class="heading">Start</p>
						{{ start }}
					</div>
					<div class="column">
						<p class="heading">Finish</p>
						{{ finish }}
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p class="heading">
							Currently assigned ({{ task.resource.length }})
						</p>
						<b-table :data="task.resource" :fields="[]">
							<template slot-scope="props">
								<b-table-column field="name" label="Name">
									<span>{{ props.row.name }}</span>
								</b-table-column>
								<b-table-column field="status" label="Status">
									<span>{{ props.row.status }}</span>
								</b-table-column>
								<b-table-column field="action" label="Action">
									<span v-if="props.row.action !== ''">
										<a :href="props.row.action"
											>Set Completed</a
										>
									</span>
								</b-table-column>
							</template>
						</b-table>
					</div>
					<div class="column">
						<p class="heading">
							Available ({{ resourceAvailable.length }})
						</p>
						<b-table
							:data="resourceAvailable"
							:fields="[]"
							checkable
						>
							<template slot-scope="props">
								<b-table-column field="name" label="Name">
									<span>{{ props.row.name }}</span>
								</b-table-column>
							</template>
						</b-table>
					</div>
				</div>
				<input type="hidden" name="workplanId" v-model="workplanId" />
				<button class="button is-fullwidth is-success" type="submit">
					Submit Document
				</button>
			</form>
		</section>
	</div>
</template>

<script>
import moment from "moment";
import DataTable from "../../../components/dataTable";
export default {
	components: {
		DataTable
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
			finish: moment(this.task.pEnd).format("DD/MM/YYYY")
		};
	}
};
</script>