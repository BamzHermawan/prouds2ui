<template>
	<section class="section">
		<div class="container">
			<p class="is-username">Easter Egg: Hidden Feature!</p>
			<p class="subtitle">
				Congratulation, you found our hidden feature .. 🎉
			</p>

			<hr />

			<div class="field">
				<label class="label">Sidebar Background</label>
				<b-field>
					<p class="control">
						<a class="button is-static">
							<span class="mdi mdi-file-image-outline"></span>
						</a>
					</p>
					<b-input
						placeholder="Image URL. example: https://placekitten.com/320/720"
						v-model="sidebar.bg"
						@input="backgroundURL"
						expanded
					></b-input>
				</b-field>
				<p class="help">
					Personalize sidebar with any wallpaper. Fill in Image URL
					your desired wallpaper Voila~ 🤩
				</p>
			</div>
		</div>
	</section>
</template>

<script>
import Axios from "axios";
import { animate, notified } from "helper-tools";
export default {
	name: "whiteSpace",
	data() {
		return {
			sidebar: {
				bg: ""
			}
		};
	},
	methods: {
		backgroundURL() {
			const sidebar = document.querySelector("#side-main");
			if (this.sidebar.bg !== "") {
				let self = this;
				Axios.get(this.sidebar.bg)
					.then(function(response) {
						if (response.status === 200) {
							let holder = document.createElement("span");

							holder.classList.add(
								"set-background",
								"animated",
								"fadeIn"
							);
							holder.style.background =
								"url('" + self.sidebar.bg + "')";

							sidebar.appendChild(holder);
							sidebar.classList.add("has-background");

							notified(self.$notification).success(
								"horray, you got a new wallpaper! 😍"
							);
						} else {
							notified(self.$notification).alert(
								"Sorry, we can't find your image. Please provide a valid image url! 😒"
							);
						}
					})
					.catch(function(error) {
						console.log(error);
						notified(self.$notification).error(
							"Hmmm .. somthing is wrong! 😫"
						);
					});
			} else {
				let holder = sidebar.querySelector(".set-background");

				if (holder !== null || holder !== undefined) {
					sidebar.classList.remove("has-background");
					sidebar.removeChild(holder);
				}
			}
		}
	}
};
</script>