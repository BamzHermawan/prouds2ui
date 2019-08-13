import Vue from 'vue';
import Buefy from 'buefy';

Vue.use(Buefy);
new Vue({
	el: '#app',
	data: {
		delivery: [],
		planField: [
			{
				field: 'periode',
				label: '📅 Periode',
				width: '150'
			},
			{
				field: 'plan',
				label: '🔋 Progress',
			}
		]
	},
	mounted(){
		let firstNull = true;
		for (let i = 0; i < DELIVERY.length; i++) {
			let row = DELIVERY[i];
			if (row.actual === null) {
				if (firstNull) {
					firstNull = false;
					row.showUpload = true;
				}else{
					row.showUpload = false;
				}
			}

			this.delivery.push(row);
		}
	}
});