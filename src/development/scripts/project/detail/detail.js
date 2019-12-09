import Vue from 'vue';
import Buefy from 'buefy'
import { linker, fileMedia } from "components";
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		linker, fileMedia
	},
	mounted() {
		global.$loader.hide();
	}
});
