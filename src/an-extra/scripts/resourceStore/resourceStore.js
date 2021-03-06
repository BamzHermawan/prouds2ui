import Vue from 'vue';
import Buefy from 'buefy';
import Axios from 'axios';
import Loader from "helper-loader";
import Shepherd from "helper-tour";
import { notified, loadStorage, saveStorage } from 'helper-tools';
import searchMenu from "./resourceSearching.vue";
import filterMenu from "./resourceFilter.vue";

window.localStorage.setItem("selectedResource", JSON.stringify(SAVEDRESOURCE));

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	methods: {
		sendSavedResource() {
			let self = this;
			this.loadingBtn = true;
			let apiUrl = this.$refs.stepOne.apiPostSaved;

			let bundle = loadStorage("selectedResource");
			if(bundle !== null){
				Axios.post(apiUrl, bundle, {
					headers: {
						"Content-type": "application/x-www-form-urlencoded"
					}
				})
					.then(function (response) {
						self.batchId = response.data.batchId;

						saveStorage("selectedResource", {
							batchId: response.data.batchId,
							resource: bundle.resource
						});

						self.filter.active = true;
					})
					.catch(function () {
						notified(self.$notification).error("Mohon maaf, terjadi gangguan koneksi. Mohon ulangi dalam beberapa saat lagi. 🙏");
					}).finally(() => self.loadingBtn = false);
			}else{
				notified(self.$snackbar,
					"Kamu belum memilih resource satu pun 😂"
				);
			}
		},
		reloadLocalStorage() {
			this.$refs.stepOne.loadLocalStorage();
		}
	},
	components: {
		searchMenu, filterMenu
	},
	data: {
		loadingBtn: false,
		filter: {
			active: false
		},
		tourStep: [
			{
				id: "tour-step-start",
				title: "🦺 Tutorial Parent",
				text:
					"<p class='has-text-left' style='margin-bottom:10px;'><span class='tag is-medium is-warning'>Hi, " +
					document.querySelector("#vapp").getAttribute("data-logged") + "! 👋</span></p>" +
					"<p class='has-text-left' style='margin-bottom:10px;'>Selamat Datang di Menu Resource Booking Search Engine</p>" +
					"<p class='has-text-left' style='margin-bottom:10px;'>Untuk melakukan Booking Resource untuk sebuah project, ada beberapa hal yang perlu kamu lakukan. Kami akan bimbing kamu, Ayo Ikuti lebih lanjut! 👉</p>"
			},
			{
				id: "tour-step-1",
				title: "🔎 Filtering Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>Sebelum mulai memilih Resource yang kamu butuhkan, lebih baik jika kita filter sesuai dengan kebutuhan kamu. 😉</p>",
				attachTo: {
					element: ".tour-step-1",
					on: "right"
				}
			},
			{
				id: "tour-step-3",
				title: "🔎 Filtering Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>Masukan kata pencarian pada kategori yang kamu inginkan. 🕵️‍</p>",
				attachTo: {
					element: ".tour-step-1",
					on: "right"
				}
			},
			{
				id: "tour-step-5",
				title: "🔎 Filtering Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>Setelah Mengisi semua filter yang kamu inginkan, Tekan tombol ini untuk mendapatkan hasil pencarian. 👍</p>",
				attachTo: {
					element: ".tour-step-1",
					on: "right"
				}
			},
			{
				id: "tour-step-6",
				title: "🎯 Choose and Save Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>Hasil pencarian dari filter tadi akan muncul pada table ini. Di sini kamu bisa memilih resource yang sesuai dengan kebutuhan. 😎</p>",
				attachTo: {
					element: ".tour-step-6",
					on: "top"
				}
			},
			{
				id: "tour-step-7",
				title: "🎯 Choose and Save Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>" +
					"Pada table ini ada dua tombol action.</p>" +
					"<p class='subtitle has-text-left is-size-6'>" +
					"Tombol <span class='tag is-info'>🔎 Detail</span> untuk melihat data detail dari resource tersebut.</p>" +
					"<p class='subtitle has-text-left is-size-6'>" +
					"Dan Tombol  <span class='tag is-success'>💾 Save Resource</span> untuk menyimpan pilihan kamu.</p>",
				attachTo: {
					element: ".tour-step-7",
					on: "bottom"
				}
			},
			{
				id: "tour-step-8",
				title: "🎯 Choose and Save Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>" +
					"Notifikasi ini akan menunjukan jumlah resource yang telah kamu simpan. 💾👍</p>",
				attachTo: {
					element: ".tour-step-8",
					on: "bottom"
				}
			},
			{
				id: "tour-step-9",
				title: "🎯 Choose and Save Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>" +
					"Jika sudah memilih, ayo check tanggal booking pada resource yang telah kamu simpan. 👉</p>",
				attachTo: {
					element: ".tour-step-9",
					on: "bottom"
				},
				buttons: [
					{
						action: Shepherd.cancelActive,
						text: "Finish"
					}
				]
			}
		],
		touring: undefined,
		batchId: null
	},
	mounted() {
		let self = this;
		let firstTimeTour = loadStorage("firstTimeTour");

		self.touring = Shepherd.Tour(this.tourStep, undefined, {
			onExit: function (step) {
				if (step.id === "tour-step-start") {
					if (firstTimeTour === null) {
						saveStorage("firstTimeTour", {
							status: false,
							tourDate: null,
							createdDate: new Date()
						})
					}
				}

				return true;
			},
			onNext: function (step) {
				if (step.id === "tour-step-start") {
					let firstTime = loadStorage("firstTimeTour");
					if(firstTime !== null){
						if (!firstTime.status) {
							saveStorage("firstTimeTour", {
								status: true,
								tourDate: new Date,
								createdDate: firstTime.createdDate
							})
						}
					}else{
						saveStorage("firstTimeTour", {
							status: true,
							tourDate: new Date(),
							createdDate: new Date()
						})
					}
				}

				return true;
			}
		});

		let firstTime = loadStorage("firstTimeTour");
		if (firstTime !== null) {
			if (!firstTime.status) {
				self.touring.start();
			}
		} else {
			saveStorage("firstTimeTour", {
				status: false,
				tourDate: null,
				createdDate: new Date()
			});
		}

		Loader.hide();
	}
});
