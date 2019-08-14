import Vue from 'vue';
import Buefy from 'buefy';
import Notified from '../vue/components/notified.vue';
import FormUpload from '../../scripts/vue/pages/projects/deliveryFileForm.vue';

Vue.use(Buefy);
new Vue({
	el: '#app',
	components: { FormUpload, Notified },
	data: {
		top: {
			status: false,
			periode: []
		},
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
		],
		formModal: {
			display: false,
			doctype: DOCTYPE,
			delivery: {
				periode: "",
				plan: "",
				actual: null
			}
		}
	},
	methods: {
		notesChecker(notes){
			if(notes === undefined || notes === ""){
				return "tidak ada pesan";
			}else{
				return notes;
			}
		},
		tooltipIsMultilined(notes){
			return notes !== undefined && notes.length > 28;
		},
		displayForm(delivery){
			this.formModal.delivery = delivery;
			this.formModal.display = true;
		}
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

			if (row.topStatus !== undefined && row.topStatus === true){
				this.top.periode.push(row.periode);
				this.top.status = true;
			}

			this.delivery.push(row);
		}
	}
});