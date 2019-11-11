<template>
	<section class="section animated fadeIn">
		<div class="container">
			<div class="columns">
				<div class="column is-10">
					<p class="is-username">Easter Egg: Hidden Feature!</p>
					<p class="subtitle">
						Congratulation, you found our hidden feature .. 🎉
					</p>
					<button
						@click="resetDefault"
						class="button is-warning is-small"
					>
						Reset to Default
					</button>
				</div>
				<div class="column is-2 is-clearfix">
					<button
						@click="closeGift"
						class="button is-danger is-pulled-right"
					>
						Close Gift
					</button>
				</div>
			</div>

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
						v-model="setting.sidebar.bg"
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
import geeg from "myGeeg";
import { animate, notified, loadStorage, saveStorage } from "helper-tools";
export default {
	name: "whiteSpace",
	data() {
		return {
			setting: {
				sidebar: {
					bg: ""
				}
			}
		};
	},
	methods: {
		closeGift() {
			if (this.$parent.geeg != undefined) {
				this.$parent.geeg = false;
			}
		},
		backgroundURL() {
			if (this.setting.sidebar.bg !== "") {
				let self = this;
				Axios.get(this.setting.sidebar.bg)
					.then(function(response) {
						if (response.status === 200) {
							geeg.background.change(self.setting.sidebar.bg);
						} else {
							notified(self.$notification).alert(
								"Sorry, we can't find your image. Please provide a valid image url! 😒"
							);
						}
					})
					.catch(function(error) {
						console.log(error);
						notified(self.$notification).error(
							"Hmmm .. something is wrong!. Please provide public url so we can access the image .. 😫"
						);
					})
					.finally(() => self.savePreference());
			} else {
				geeg.background.remove();
			}
		},
		loadPreference() {
			let conf = loadStorage("preference");
			if (conf !== null) {
				this.setting = conf;

				this.backgroundURL();
			}
		},
		savePreference() {
			saveStorage("preference", this.setting);
		},
		resetDefault() {
			this.setting = {
				sidebar: {
					bg: ""
				}
			};

			this.backgroundURL();
		}
	},
	mounted() {
		this.loadPreference();
	}
};
</script>