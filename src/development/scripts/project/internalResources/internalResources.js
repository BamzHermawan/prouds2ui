import Vue from 'vue';
import 'helper-filter';
import Buefy from 'buefy';
import Loader from 'helper-loader';

import resourceRow from './resourceRow.vue';
import resourceTable from './resourcePlan.vue';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		resourceRow, resourceTable
	},
	mounted() {
		Loader.hide();
	}
});