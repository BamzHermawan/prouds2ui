import Vue from 'vue';
import Buefy from 'buefy'
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	mounted() {
		global.$loader.hide();
	}
});
