import Vue from 'vue';
import Buefy from 'buefy';
import controller from './vue/login/controller.vue';
import 'buefy/dist/buefy.css';
import '../styles/main.scss';

Vue.use(Buefy);
new Vue(controller).$mount('#vapp');