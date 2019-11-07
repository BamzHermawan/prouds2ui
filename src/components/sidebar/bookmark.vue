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
import api from "helper-apis";
export default {
	data() {
		return {
			active: this.isBooked,
			title: "",
			userlog: {
				user_id: "1"
			}
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
					let val = {
						title: this.title,
						link: this.link,
						user_id: this.userlog.user_id
					};

					let self = this;
					api.sendBookmark(val)
						.then(response => {
							self.successBook();
							self.active = true;

							// Tambah ke list sidebar My Workspace (ws)
							global.$sidebar.ws.addList(this.title, this.link);
						})
						.catch(function(error) {
							console.log("error saving bookmark");
							self.errorBook();
						});
				}
			});
		},

		//? Notifikasi jika halaman berhasil di bookmark
		successBook() {
			notified(this.$notification)
				.success()
				.topRight(
					"This page was successfully added to My Workspace 👍"
				);
		},

		//! Notifikasi jika halaman gagal di bookmark
		errorBook() {
			if (window.navigator.onLine) {
				notified(this.$notification)
					.error()
					.bottomRight(
						"Sorry we are having a trouble, please try again later 🙏"
					);
			} else {
				notified(this.$notification)
					.alert()
					.bottomRight(
						"We can't connect to server, you sure have internet connection ? 🤔"
					);
			}
		}
	}
};
</script>