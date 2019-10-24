import Vue from 'vue';
import Buefy from 'buefy'
import { topNavBar } from "components";
import { dataTable } from "components";
import Loader from 'helper-loader';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		topNavBar, dataTable
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		}
	},
	mounted() {
		Loader.hide();
	}
});
