import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import Loader from "../loader.js";
import "../filters.js"
import Moment from "moment";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, Moment
	},
	data: {
		myTimesheet: MYTIMESHEET.sort((a, b) => new Date(a.start) - new Date(b.start)),
		// myTimesheet: [],
		tmp: [],
		showValue: true
	},
	computed: {
		sortDate() {
			var mappedArr = {},
				arrElem,
				mappedElem;

			for (let index = 0; index < this.myTimesheet.length; index++) {

				let a = this.myTimesheet[index].start
				// a['start'] = this.myTimesheet[index].start
				// a['id'] = this.myTimesheet[index].id
				if (this.tmp.indexOf(a) < 0) {
					this.tmp.push(a)
				}
			}

			// for (var i = 0; i < this.tmp.length; i++) {
			// 	arrElem = this.tmp[i];
			// 	mappedArr[arrElem.id] = arrElem;
			// 	mappedArr[arrElem.id]['children'] = [];
			// }

			// for (var id in mappedArr) {
			// 	if (mappedArr.hasOwnProperty(id)) {
			// 		mappedElem = mappedArr[id];
			// 		if (mappedElem.start) {

			// 		}
			// 	}
			// }
		}
	},
	mounted() {
		Loader();
		this.sortDate
	}
});