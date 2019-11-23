import Vue from 'vue';
import Buefy from 'buefy';
import Api from 'helper-apis';
import Moment from 'helper-moment';
import { checkConnection, notified } from 'helper-tools';
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	data: {
		timesheet: TIMESHEET
	}
});