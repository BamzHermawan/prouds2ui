import Vue from 'vue';
import testing from './vue/pages/testing.vue';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
new Vue(testing).$mount('#app');