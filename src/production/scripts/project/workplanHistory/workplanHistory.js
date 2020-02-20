import Vue from 'vue';
import Buefy from 'buefy'
import { checkConnection, notified } from "helper-tools";
import { parsedURL, axios } from "helper-apis";
import Moment from "helper-moment";
import Loader from 'helper-loader';
import 'helper-filter';

import optVer from "./optVersion.vue";
import compareTable from "./compare.vue";
import {
	Paging,
	PagingPage,
	ganttchart,
	dataTableNoCard
} from 'components';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		Paging,
		PagingPage,
		ganttchart,
		dataTableNoCard,
		compareTable,
		optVer
	},
	data: {
		changelog: {
			data: [],
			isFetching: false
		},
		version: {
			current: "",
			list: []
		},
		modal: {
			display: false,
			wpA: undefined,
			wpB: undefined
		}
	},
	computed: {
		compareList() {
			return this.version.list.filter(ver => ver.id !== this.version.current);
		},
		currentLabel() {
			const found = this.version.list.find(ver => ver.id === this.version.current);
			if (found) {
				const start = Moment(found.start, 'DD/MM/YYYY').format('D MMMM YYYY');
				const end = Moment(found.end, 'DD/MM/YYYY').format('D MMMM YYYY');
				return "<b>" + found.label + "</b>: " + start + " ⇒ " + end;
			}
		}
	},
	filters: {
		checkLogType(val) {
			if (Moment(val, 'DD/MM/YYYY').isValid()) {
				return Moment(val, 'DD/MM/YYYY').format('D MMMM YYYY');
			} else {
				return val;
			}
		}
	},
	methods: {
		changePage(pageId = null) {
			this.$refs.paging.showPage(pageId);
		},
		changeVersion(value) {
			if (this.version.current !== value) {
				this.$refs.changeversion.submit();
			}
		},
		getChangeLog(id) {
			const self = this;
			this.changelog.isFetching = true;
			axios.get(parsedURL("wpChangelog", { id: id }))
				.then(res => {
					self.changelog.data = res.data;
				})
				.catch(err => {
					console.log(err);
					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem,<br>please try again later. 🙏"
						);
					}
				})
				.finally(() => this.changelog.isFetching = false);
		},
		setVersion(id) {
			this.version.current = id;
			this.getChangeLog(id);
		},
		addVersion(version) {
			const found = this.version.list.find(ver => ver.id === version.id);
			if (found === undefined) {
				this.version.list.push(version);
			}
		},
		doCompare(item) {
			this.modal.wpB = item;
			this.modal.wpA = this.version.list.find(ver => ver.id === this.version.current);
			this.modal.display = true;
		}
	},
	mounted() {
		Loader.hide();
	}
});