import Vue from 'vue';
import Buefy from 'buefy';
import CrudInput from '../scripts/vue/components/crud/crudInput.vue'

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { CrudInput }
});