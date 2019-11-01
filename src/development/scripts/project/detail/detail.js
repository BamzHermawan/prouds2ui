import Vue from 'vue';
import Buefy from 'buefy'
import { linker } from "components";
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		linker
	},
	mounted() {
		global.$loader.hide();
	}
});
