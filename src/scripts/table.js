import Vue from 'vue';
import testing from './vue/pages/testing.vue';
import Table from 'buefy/dist/components/table';
import Input from 'buefy/dist/components/input';
import 'buefy/dist/buefy.css'

Vue.use(Table)
Vue.use(Input)
new Vue(testing).$mount('#app');