<template>
	<!-- <a @click="addFavorite">
		<span class="mdi mdi-bookmark-plus is-marginless"></span>
		<span>Bookmark</span>
	</a> -->

	<button @click="sendAPI" :class="btnClass" :disabled="active">
		<span class="mdi mdi-bookmark-plus is-left"></span>
		<span data-toggle="text" class="animated fadeIn in-right faster"
			>Bookmark</span
		>
	</button>
</template>

<script>
import { notified } from "helper-tools";
export default {
	data() {
		return {
			active: this.isBooked,
			title: ""
		};
	},
	props: {
		isBooked: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		link() {
			return window.location.href;
		},
		btnClass() {
			let prep = "button is-bookmark is-outlined";

			// Check apakah sudah di booking
			if (this.active) {
				prep += " is-success";
			} else {
				prep += " hover-text";
			}

			return prep;
		}
	},
	methods: {
		sendAPI() {
			this.$dialog.prompt({
				message: `Bookmark Name`,
				confirmText: "Save",
				type: "is-success",
				inputAttrs: {
					placeholder: "Fill a name",
					maxlength: 18
				},
				trapFocus: true,
				onConfirm: value => {
					this.title = value;
					//TODO: Ade
					// Buat api untuk kirim link dan title server
					// kalau sukses/error tampilin notifikasi
					this.successBook();
					this.active = true;

					// Tambah ke list sidebar My Workspace (ws)
					global.$sidebar.ws.addList(this.title, this.link);
				}
			});
		},

		//? Notifikasi jika halaman berhasil di bookmark
		successBook() {
			notified(this.$notification)
				.success()
				.bottomRight(
					"Halaman ini berhasil ditambahkan ke My Workspace 👍"
				);
		},

		//! Notifikasi jika halaman gagal di bookmark
		errorBook() {
			if (window.navigator.onLine) {
				notified(this.$notification)
					.error()
					.bottomRight(
						"Mohon maaf kami mengalami kendala, silakan coba lagi dalam beberapa saat 🙏"
					);
			} else {
				notified(this.$notification)
					.alert()
					.bottomRight(
						"Kami tidak dapat tersambung dengan server, apakah kamu terhubung ke internet ? 🤔"
					);
			}
		}
	}
};
</script>