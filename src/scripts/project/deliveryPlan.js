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
			period: []
		},
		delivery: [],
		formModal: {
			display: false,
			doctype: DOCTYPE,
			delivery: {
				periode: "",
				plan: "",
				actual: null
			}
		},
		selected: [],
		tableCheckable: false,
	},
	computed: {
		isPaginated(){
			return this.delivery.length > 10;
		},
		showPMONav(){
			return this.selected.length > 0 && this.tableCheckable;
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
		},
		confirmVerification(verify){
			let projectId = "";
			let period = [];
			let action = "";
			let message = "";
			this.selected.forEach(row => period.push(row.period));

			if(verify){
				action = this.$refs.verifyingBtn.$attrs.action;
				projectId = this.$refs.verifyingBtn.$attrs.project;
				message = "Apa kamu yakin untuk <b>menyetujui</b> dokumen pada periode:<br><b>[ " + period.join(", ") + " ]</b> ?";
			}else{
				projectId = this.$refs.unverifyingBtn.$attrs.project;
				action = this.$refs.unverifyingBtn.$attrs.action;
				message = "Apa kamu yakin untuk <b>menolak</b> dokumen pada periode:<br><b>[ " + period.join(", ") + " ]</b> ?";
			}

			this.$dialog.confirm({
				type: 'is-warning',
				message: message,
				onConfirm: () => {
					let form = document.createElement("form");
					let selected = document.createElement("input");
					let status = document.createElement("input");
					let pid = document.createElement("input");

					selected.value = period.join(",");
					selected.name = "period";
					form.appendChild(selected);
					
					pid.value = projectId;
					pid.name = "projectId";
					form.appendChild(pid);

					status.value = verify;
					status.name = "status";
					form.appendChild(status);

					form.action = action;
					form.method = "post";
					document.body.appendChild(form);
					form.submit();
				}
			})
		}
	},
	mounted(){
		this.tableCheckable = this.$refs.dTable.checkable;
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
				this.top.period.push(row.period);
				this.top.status = true;
			}

			this.delivery.push(row);
		}
	}
});