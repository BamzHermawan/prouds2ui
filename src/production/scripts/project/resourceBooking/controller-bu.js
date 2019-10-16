import Vue from 'vue';
import Buefy from 'buefy';
import Loader from 'helper-loader';
import dataTable from "components";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { dataTable },
	data: {
		resource: RESOURCE
	},
	computed: {
		statusCount() {
			let status = [];
			this.resource.map(user => {
				if (status.length == 0) {
					status.push({
						key: user.status,
						count: 1
					});
				} else {
					let index = status.findIndex(bit => bit.key === user.status);
					if (index === -1) {
						status.push({
							key: user.status,
							count: 1
						});
					} else {
						status[index].count++;
					}
				}
			});

			return status;
		}
	},
	methods: {
		checkEmpty(value) {
			return value === undefined || value === null || value === "";
		},
		rejectAction(action){
			let self = this;
			this.$dialog.prompt({
				message: `Alasan Penolakan Proposal Booking ?`,
				cancelText: 'Keluar',
				confirmText: 'Kirim Penolakan',
				type: 'is-warning',
				inputAttrs: {
					placeholder: 'Panjang maksimal 150 karakter..',
					maxlength: 150,
				},
				onConfirm: (value) => {
					self.sendForm(action, {
						notes: value
					});
				}
			})
		},
		acceptAction(action, name){
			let self = this;
			this.$dialog.confirm({
				message: 'Apakah kamu yakin ingin menerima proposal booking untuk <b>' + name + "</b>?",
				cancelText: 'Tidak',
				confirmText: 'Terima Booking',
				type: 'is-success',
				onConfirm: () => {
					self.sendForm(action, {
						notes: null
					});
				}
			})
		},
		sendForm(action, data){
			let form = document.createElement("form");
			
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					let value = data[key];
					let input = document.createElement("input");
					
					input.value = value;
					input.name = key;
					form.appendChild(input);
				}
			}

			form.action = action;
			form.method = "post";
			document.body.appendChild(form);
			form.submit();
		}
	},
	mounted(){
		Loader.hide();
	}
});