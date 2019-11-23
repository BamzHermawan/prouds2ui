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

			<hr style="margin-top: 1em;" />

			<div class="columns is-multiline">
				<div class="column is-12">
					<div class="field">
						<label class="label">Sidebar Background</label>
						<b-field>
							<b-input
								placeholder="Image URL. example: https://placekitten.com/320/720"
								v-model="setting.sidebar.bg"
								@input="backgroundURL"
								expanded
							></b-input>
							<p class="control">
								<a
									class="button is-danger"
									@click="backgroundURL('')"
									>Remove Link</a
								>
							</p>
						</b-field>
						<p class="help">
							Personalize sidebar with any wallpaper (only from
							public provider only:
							<a href="https://unsplash.com/">unsplash.com</a>).
						</p>
					</div>
				</div>
				<div class="column is-3">
					<b-field
						label="Sidebar Color"
						message="you can't select sidebar color when using background 😢"
					>
						<b-select
							placeholder="Select sidebar color"
							v-model="setting.sidebar.theme"
							@input="setSidebarTheme"
							:disabled="bgExist"
							expanded
						>
							<option value="none">No Theme</option>
							<option value="is-crimson">Crimson</option>
							<option value="is-skyblue">Skyblue</option>
							<option value="is-mossgreen">Moss Green</option>
							<option value="is-pinkrose">Pink Rose</option>
							<option value="is-latte">Latte</option>
						</b-select>
					</b-field>
				</div>
				<div class="column is-3">
					<b-field
						label="Sidebar Text Color"
						message="Select text color to match your background 🚀"
					>
						<b-select
							placeholder="Select sidebar color"
							v-model="setting.sidebar.color"
							@input="setSidebarText"
							:disabled="!bgExist"
							expanded
						>
							<option value="has-text-light">Light Style</option>
							<option value="has-text-dark">Dark Style</option>
						</b-select>
					</b-field>
				</div>
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
					bg: "",
					theme: null,
					color: "is-dark"
				}
			}
		};
	},
	computed: {
		bgExist() {
			return this.setting.sidebar.bg !== "";
		}
	},
	methods: {
		// Preference Methods
		backgroundURL(url = null) {
			if (url !== null) {
				this.setting.sidebar.bg = url;
			}

			if (this.setting.sidebar.bg !== "") {
				let self = this;
				Axios.get(this.setting.sidebar.bg)
					.then(function(response) {
						if (response.status === 200) {
							geeg.sidebar.background.change(
								self.setting.sidebar.bg
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
							"Hmmm .. something is wrong!. Please provide public url so we can access the image .. 😫"
						);
					})
					.finally(() => self.savePreference());
			} else {
				geeg.sidebar.background.remove();
			}
		},

		setSidebarTheme() {
			if (this.setting.sidebar.theme !== null) {
				geeg.sidebar.theme(this.setting.sidebar.theme);
				this.savePreference();
			}
		},

		setSidebarText() {
			if (this.setting.sidebar.color !== null) {
				geeg.sidebar.textColor(this.setting.sidebar.color);
				this.savePreference();
			} else {
				this.setting.sidebar.color = 'has-text-dark';
				geeg.sidebar.textColor('has-text-dark');
				this.savePreference();
			}
		},

		// Main Methods
		closeGift() {
			if (this.$parent.geeg != undefined) {
				this.$parent.geeg = false;
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
					bg: "",
					theme: null,
					color: "is-dark"
				}
			};

			this.savePreference();
			geeg.sidebar.load();
		}
	},
	mounted() {
		this.loadPreference();
	}
};
</script>