import Vue from 'vue';
import Buefy from 'buefy';
import controller from './vue/pages/loginController.vue';
import '../styles/main.scss';

Vue.use(Buefy);
new Vue(controller).$mount('#vapp');