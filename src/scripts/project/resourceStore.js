import Vue from 'vue';
import Buefy from 'buefy';
import Axios from 'axios';
import Shepherd from "../helpTour.js";
import { notified, loadStorage } from '../tools.js';
import NavBar from "./../vue/components/topNavBar.vue";
import searchMenu from "./../vue/pages/projects/resourceSearching.vue";
import filterMenu from "./../vue/pages/projects/resourceFilter.vue";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	methods: {
		sendSavedResource() {
			let self = this;
			this.loadingBtn = true;
			let apiUrl = this.$refs.stepOne.apiPostSaved;
			
			loadStorage("selectedResource")
				.then(bundle => {
					Axios.post(apiUrl, bundle, {
						headers: {
							"Content-type": "application/x-www-form-urlencoded"
						}
					})
						.then(function (response) {
							console.log(response.data);
							self.filter.active = true;
						})
						.catch(function () {
							notified(self.$notification).error("Mohon maaf, terjadi gangguan koneksi. Mohon ulangi dalam beberapa saat lagi. 🙏");
						});
				})
				.catch(function(){
					notified(self.$snackbar,
						"Kamu belum memilih resource satu pun 😂"
					);
				})
				.finally(() => self.loadingBtn = false);
		}
	},
	components: {
		NavBar, searchMenu, filterMenu
	},
	data: {
		loadingBtn: false,
		filter: {
			active: false
		},
		formProps: {
			email: '',
			password: ''
		},
		filterCat: FILTERCATEGORY,
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
				id: "tour-step-2",
				title: "🔎 Filtering Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>Pilih Kategori Filter yang kamu Inginkan, Penjelasan mengenai kategori tersebut akan muncul saat kamu memilih kategori pencarian nanti. 👍</p>",
				attachTo: {
					element: ".tour-step-2",
					on: "right"
				}
			},
			{
				id: "tour-step-3",
				title: "🔎 Filtering Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>Ketik Pencarian yang kamu inginkan sesuai dengan kategori yang telah kamu pilih.</p>",
				attachTo: {
					element: ".tour-step-3",
					on: "right"
				}
			},
			{
				id: "tour-step-4",
				title: "🔎 Filtering Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>Tekan Add Filter untuk menambahkan filternya. 😁</p>",
				attachTo: {
					element: ".tour-step-4",
					on: "right"
				}
			},
			{
				id: "tour-step-5",
				title: "🔎 Filtering Resource",
				text:
					"<p class='subtitle has-text-left is-size-6'>Setelah Menambahkan semua filter yang kamu inginkan, Tekan tombol ini untuk mendapatkan hasil pencarian. 👍</p>",
				attachTo: {
					element: ".tour-step-5",
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
		touring: undefined
	},
	mounted(){
		this.touring = Shepherd.Tour(this.tourStep);
	}
});

function newFunction() {
	return "loggedUserName";
}
