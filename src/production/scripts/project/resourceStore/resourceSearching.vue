<template>
	<div class="columns">
		<div class="column is-3">
			<div class="container">
				<div style="margin-bottom:24px;">
					<slot name="exit-button">
						<a href="#" class="button is-primary"
							>🏃‍ Exit Booking Menu</a
						>
					</slot>
				</div>
				<nav class="panel tour-step-1">
					<p class="panel-heading">Filter Resource</p>

					<!-- Cari Dengan Role -->
					<div class="panel-block">
						<div class="container">
							<b-input
								@focus="focusedFilter = 'role'"
								placeholder="Cari dengan Role"
								v-model="filters.role"
								type="search"
								icon="magnify"
								size="is-small"
							>
							</b-input>
							<p
								v-show="focusedFilter === 'role'"
								class="is-size-7 animated fadeIn"
								style="margin-top: 0.75em;"
							>
								Filter Kategori ini digunakan saat kamu butuh
								resource role tertentu, contoh kamu butuh
								resource dengan role sebagai Programmer atau
								Desainer
							</p>
						</div>
					</div>

					<!-- Cari Dengan Skill -->
					<div class="panel-block">
						<div class="container">
							<b-input
								@focus="focusedFilter = 'skill'"
								placeholder="Cari dengan Skill / Kompetensi"
								v-model="filters.skill"
								type="search"
								icon="magnify"
								size="is-small"
							>
							</b-input>
							<p
								v-show="focusedFilter === 'skill'"
								class="is-size-7 animated fadeIn"
								style="margin-top: 0.75em;"
							>
								Filter Kategori ini digunakan saat kamu butuh
								resource yang memiliki kemampuan tertentu
								seperti JavaScript / PHP / Photoshop
							</p>
						</div>
					</div>

					<!-- Cari Dengan Role -->
					<div class="panel-block">
						<div class="container">
							<p
								v-show="focusedFilter === 'level'"
								class="is-size-7 animated fadeIn"
								style="margin-top: 0.75em; margin-bottom: 0.75em;"
							>
								Filter Kategori ini digunakan saat kamu butuh
								resource yang memiliki level tertentu seperti
								Senior / Junior level
							</p>
							<div class="field has-addons is-fullwidth">
								<b-select
									@focus="focusedFilter = 'level'"
									placeholder="Cari dengan level"
									v-model="filters.level"
									size="is-small"
									icon="magnify"
									expanded
								>
									<slot name="level-select-master"></slot>
								</b-select>
								<div class="control">
									<button
										@click="filters.level = null"
										class="button is-danger is-small"
									>
										<i
											class="mdi mdi-backspace is-marginless"
										></i>
									</button>
								</div>
							</div>
						</div>
					</div>

					<div class="panel-block animated SlideInDown tour-step-5">
						<button
							class="button is-success is-fullwidth"
							@click="fetchResource"
						>
							Search Resource 🔎
						</button>
					</div>
				</nav>
			</div>
		</div>
		<div class="column">
			<nav class="level">
				<div class="level-left">
					<div class="level-item">
						<b-button
							type="is-warning"
							@click="$parent.touring.start()"
							>🙋‍<span style="margin-left:10px;"
								>Need Help ?</span
							></b-button
						>
					</div>
				</div>

				<div class="level-right">
					<div class="level-item">
						<slot name="cartButton"></slot>
					</div>
				</div>
			</nav>
			<div class="container tour-step-6">
				<data-table
					title="Resource List"
					:data="fetchedRes"
					:fields="[]"
					detailed
					detail-key="userId"
					:show-detail-icon="false"
					ref="dataTable"
				>
					<template slot-scope="props">
						<b-table-column field="name" label="Nama">
							<span>{{ props.row.name }}</span>
						</b-table-column>
						<b-table-column field="bu" label="Business Unit">
							<span
								v-if="
									props.row.bu !== undefined &&
										props.row.bu !== null &&
										props.row.bu !== ''
								"
								>{{ props.row.bu }}</span
							>
							<span v-else>-</span>
						</b-table-column>
						<b-table-column field="role" label="Job Role">
							<span
								v-if="
									props.row.role !== undefined &&
										props.row.role !== null &&
										props.row.role !== ''
								"
								>{{ props.row.role }}</span
							>
							<span v-else>-</span>
						</b-table-column>
						<b-table-column
							field="userId"
							label="Action"
							class="tour-step-7"
						>
							<b-button
								:type="
									checkIfOpen(props.row.userId)
										? 'is-dark'
										: 'is-info'
								"
								size="is-small"
								@click="toggleDetail(props.row)"
								>{{
									checkIfOpen(props.row.userId)
										? "❌ Close"
										: "🔎 Detail"
								}}</b-button
							>
							<b-button
								v-if="!checkIfSaved(props.row.userId)"
								type="is-success"
								size="is-small"
								@click="addSaved(props.row)"
								>💾 Save Resource</b-button
							>
							<b-button
								v-else
								type="is-danger"
								size="is-small"
								@click="removeSaved(props.row)"
								>🚫 Unsave Resource</b-button
							>
						</b-table-column>
					</template>
					<template slot="head-right">
						<span></span>
					</template>
					<template slot="top-right">
						<div class="field is-grouped">
							<div class="control">
								<div class="tags has-addons are-medium">
									<span class="tag is-info">
										<span>{{ fetchedRes.length }}</span>
									</span>
									<span class="tag is-dark"
										>Resource Found</span
									>
								</div>
							</div>
							<div class="control tour-step-8">
								<span
									id="savedLabel"
									class="tag is-success is-medium animated"
									>👨‍💼 {{ selectedRes.length }}</span
								>
							</div>
						</div>
					</template>
					<template slot="detail" slot-scope="props">
						<div class="columns">
							<div class="column">
								<p class="title is-size-5">
									{{ props.row.name }}
								</p>
								<p class="subtitle is-size-6">
									NIK. {{ props.row.userId }}
								</p>
							</div>
							<div class="column">
								<p class="title is-size-6">🏢 Business Unit</p>
								<p class="subtitle is-size-5">
									{{ props.row.bu }}
								</p>
							</div>
						</div>
						<div class="columns is-multiline">
							<div class="column is-12">
								<div class="content">
									<p class="title is-size-6">
										🏆 Kemampuan (Skill)
									</p>
									<div style="padding:8px;">
										<div
											v-if="props.row.skills.length > 0"
											class="columns is-multiline"
										>
											<div
												v-for="(skill, index) in props
													.row.skills"
												:key="index"
												class="column is-one-quarter"
												style="padding: 5px;"
											>
												{{ index + 1 }}.
												<b>{{ skill.skillName }}</b
												>:
												{{ skill.skillLevel }}
											</div>
										</div>
										<p v-else class="tag is-warning">
											Tidak Ada Data
										</p>
									</div>
								</div>
							</div>
							<div class="column is-hidden">
								<div class="content">
									<p class="title is-size-6">
										🎒 Training
									</p>
									<ol
										v-if="props.row.course.length > 0"
										type="1"
									>
										<li
											v-for="(course, index) in props.row
												.course"
											:key="index"
										>
											{{ course.courseName }}
										</li>
									</ol>
									<p v-else class="tag is-warning">
										Tidak Ada Data
									</p>
								</div>
							</div>
							<div class="column is-12">
								<div class="content">
									<p class="title is-size-6">
										📜 Certificate
									</p>
									<div style="padding:8px;">
										<div
											v-if="
												props.row.competency.length > 0
											"
											class="columns is-multiline"
										>
											<div
												v-for="(competency,
												index) in props.row.competency"
												:key="index"
												class="column is-one-quarter"
												style="padding: 5px;"
											>
												{{ index + 1 + ". " }}
												{{ competency.competencyName }}
											</div>
										</div>
										<p v-else class="tag is-warning">
											Tidak Ada Data
										</p>
									</div>
								</div>
							</div>
						</div>
					</template>
				</data-table>
			</div>
		</div>
	</div>
</template>

<script>
import Axios from "axios";
import Tools from "helper-tools";
import { dataTable as DataTable } from "components";
export default {
	components: {
		DataTable
	},
	props: {
		apiSearchEngine: {
			type: String,
			required: true
		},
		apiDetailResource: {
			type: String,
			required: true
		},
		apiPostSaved: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			focusedFilter: "",
			openedDetail: [],
			selectedRes: [],
			filters: {
				role: "",
				level: null,
				skill: "",
				competency: ""
			},
			fetchedRes: []
		};
	},
	methods: {
		checkIfOpen(userId) {
			return this.openedDetail.includes(userId);
		},
		checkIfSaved(id) {
			let found = this.selectedRes.filter(({ userId }) => userId === id);
			return found.length > 0;
		},
		addSaved(resource) {
			this.selectedRes.push({
				userId: resource.userId,
				filters: this.filters
			});

			Tools.saveStorage("selectedResource", {
				batchId: this.$parent.batchId,
				resource: this.selectedRes
			});

			let savedNotif = document.querySelector("#savedLabel");
			savedNotif.classList.add("tada");
			savedNotif.addEventListener("animationend", function() {
				savedNotif.classList.remove("tada");
			});
		},
		removeSaved(resource) {
			let findExist = this.selectedRes.findIndex(
				bit => bit.userId === resource.userId
			);

			if (findExist > -1) {
				this.selectedRes.splice(findExist, 1);
				Tools.saveStorage("selectedResource", {
					batchId: this.$parent.batchId,
					resource: this.selectedRes
				});

				let savedNotif = document.querySelector("#savedLabel");
				savedNotif.classList.add("rubberBand");
				savedNotif.addEventListener("animationend", function() {
					savedNotif.classList.remove("rubberBand");
				});
			}
		},
		toggleDetail(row) {
			this.fetchDetail(row);
			if (this.checkIfOpen(row.userId)) {
				let indexAt = this.openedDetail.findIndex(
					userId => userId === row.userId
				);
				this.openedDetail.splice(indexAt, 1);
			} else {
				this.openedDetail.push(row.userId);
			}
		},
		fetchResource() {
			let filters = {};
			for (const key in this.filters) {
				if (this.filters[key] !== "") {
					filters[key] = this.filters[key];
				}
			}

			let self = this;
			Axios.get(this.apiSearchEngine, {
				params: filters
			})
				.then(function(response) {
					self.fetchedRes = response.data;
					self.openedDetail = [];
				})
				.catch(function(error) {
					console.log("ASE Error Fetching: 464");
					console.log(error);
					Tools.notified(self.$toast).error(
						"Mohon maaf terjadi sebuah kesalahan. Kami tidak dapat terhubung dengan server. Silakan ulangi beberapa saat lagi. 🙏"
					);
				});
		},
		loadLocalStorage(showAnimation = false) {
			let selected = Tools.loadStorage("selectedResource");
			this.selectedRes = selected.resource;
			this.$parent.batchId = selected.batchId;
			if (showAnimation) {
				let savedNotif = document.querySelector("#savedLabel");
				savedNotif.classList.add("tada");
				savedNotif.addEventListener("animationend", function() {
					savedNotif.classList.remove("tada");
				});
			}
		},
		fetchDetail(resource) {
			let self = this;
			return Axios.get(this.apiDetailResource, {
				params: { userId: resource.userId }
			})
				.then(function(response) {
					let detail = response.data;
					let idex = self.fetchedRes.findIndex(
						bit => bit.userId === resource.userId
					);

					self.fetchedRes[idex].skills = detail.skills;
					self.fetchedRes[idex].course = detail.course;
					self.fetchedRes[idex].competency = detail.competency;
					self.$refs.dataTable.toggleDetail(resource);
				})
				.catch(function(error) {
					console.log("ADR Error Fetching: 500");
					console.log(error);
					Tools.notified(self.$toast).error(
						"Mohon maaf terjadi sebuah kesalahan. Kami tidak dapat terhubung dengan server. Silakan ulangi beberapa saat lagi. 🙏"
					);
				});
		}
	},
	mounted() {
		let self = this;
		this.fetchResource();
		this.loadLocalStorage(true);
	}
};
</script>

