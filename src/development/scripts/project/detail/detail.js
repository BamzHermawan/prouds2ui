import Vue from 'vue';
import Buefy from 'buefy'
import { linker } from "components";

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
