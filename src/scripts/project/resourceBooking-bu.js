import Vue from 'vue';
import Buefy from 'buefy';
import DataTable from "../../scripts/vue/components/dataTable.vue";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { DataTable },
	data: {
		resource: RESOURCE
	},
	computed: {
		statusCount() {
			let status = [];
			this.resource.map(user => {
				if (status.length == 0) {
					status.push({
						key: user.status,
						count: 1
					});
				} else {
					let index = status.findIndex(bit => bit.key === user.status);
					if (index === -1) {
						status.push({
							key: user.status,
							count: 1
						});
					} else {
						status[index].count++;
					}
				}
			});

			return status;
		}
	},
	methods: {
		checkEmpty(value) {
			return value === undefined || value === null || value === "";
		}
	}
});