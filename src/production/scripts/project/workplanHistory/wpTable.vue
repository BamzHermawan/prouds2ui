<template>
	<div :class="type">
		<tree-table
			v-if="fetching === false && tasks.length > 0"
			:data="tasks"
			:unique-id="type"
			no-card
			hoverable
			@loaded="$emit('loaded')"
		>
			<template slot="thead">
				<th>Task Name</th>
				<th>Start Date</th>
				<th>End Date</th>
				<th>Duration</th>
				<th>Mandays</th>
				<th>Weight</th>
				<th>Progress</th>
				<th>Role</th>
			</template>
			<template slot="labelrow" slot-scope="{ row }">
				{{ row.name }}
			</template>
			<template slot="tbody" slot-scope="{ row }">
				<td>{{ row.start }}</td>
				<td>{{ row.end }}</td>
				<td>{{ row.duration }}</td>
				<td>{{ row.mandays }}</td>
				<td>{{ row.weight }}%</td>
				<td>{{ row.progress }}%</td>
				<td>{{ row.role }}</td>
			</template>
		</tree-table>
	</div>
</template>

<script>
import { axios, parsedURL } from "helper-apis";
import { checkConnection, notified } from "helper-tools";
import { treeTable } from "components";
export default {
	components: {
		treeTable
	},
	props: {
		versionId: {
			type: String,
			required: true
		},
		projectId: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			tasks: [],
			fetching: undefined
		};
	},
	watch: {
		fetching(status) {
			if (status) {
				this.$emit("fetching", this.versionId);
			} else {
				this.$emit("fetched", this.versionId);
			}
		}
	},
	methods: {
		fetchTasks(version, project) {
			const self = this;
			this.fetching = true;
			axios
				.get(parsedURL("workplanTasks", { version, project }))
				.then(res => (this.tasks = res.data))
				.catch(err => {
					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem.<br>Your connection to our server is timeout. 🙏"
						);
					}
				})
				.finally(() => (this.fetching = false));
		}
	},
	beforeMount() {
		if (this.versionId !== "") {
			this.fetchTasks(this.versionId, this.projectId);
		}
	}
};
</script>