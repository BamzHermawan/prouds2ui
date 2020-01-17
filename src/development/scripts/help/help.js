import Vue from 'vue';
import Buefy from 'buefy';
import faq from './faq.vue';
import docs from './document.vue';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { faq, docs },
	mounted() {
		global.$loader.hide();
	}
});