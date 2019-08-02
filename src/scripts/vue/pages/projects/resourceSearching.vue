<template>
	<div class="columns">
		<div class="column is-3">
			<div class="container">
				<nav class="panel tour-step-1">
					<p class="panel-heading">Filter Resource</p>
					<div class="panel-block">
						<div class="container">
							<b-field class="tour-step-2">
								<b-select
									placeholder="Pilih Kategori Pencarian"
									v-model="pickedCat"
									size="is-small"
									icon="magnify"
									expanded
								>
									<option
										v-for="(filter, index) in filterCat"
										:key="index"
										:value="filter.key"
										>{{ filter.text }}</option
									>
								</b-select>
							</b-field>
							<b-field class="tour-step-3">
								<b-input
									:placeholder="'Cari Kategori... '"
									type="search"
									icon="magnify"
									size="is-small"
									v-model="filterQuery"
								>
								</b-input>
							</b-field>
							<b-field
								v-show="pickedCat !== null && pickedCat !== ''"
								class="animated SlideInDown"
							>
								<div class="container box">
									<div class="tags has-addons is-marginless">
										<span class="tag is-dark"
											>Category</span
										>
										<span
											class="tag is-info is-capitalized"
											>{{ pickedCat }}</span
										>
									</div>
									<p class="is-size-7">{{ getSummary() }}</p>
								</div>
							</b-field>
							<b-message
								type="is-warning"
								size="is-small"
								style="margin-bottom: 10px;"
								class="animated zoomIn"
								v-show="alert.display"
							>
								{{ alert.message }}
							</b-message>
							<b-field>
								<b-button
									outlined
									class="is-fullwidth tour-step-4"
									type="is-success"
									size="is-small"
									@click="addFilter"
									>Add Filter</b-button
								>
							</b-field>
						</div>
					</div>
					<div v-show="filters.length > 0" class="panel-block">
						<div class="container">
							<b-field grouped group-multiline>
								<div
									class="control"
									v-for="(filter, index) in filters"
									:key="index"
								>
									<div class="tags has-addons">
										<span
											class="tag is-dark is-lowercase"
											>{{ filter.key }}</span
										>
										<span class="tag is-info">{{
											filter.query
										}}</span>
										<a
											@click="removeFilter(filter.key)"
											class="tag is-delete"
										></a>
									</div>
								</div>
							</b-field>
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
							>🙋‍ | Need Help ❓</b-button
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
					detail-key="nik"
					:show-detail-icon="false"
					ref="dataTable"
				>
					<template slot-scope="props">
						<b-table-column field="name" label="👨‍💼 Nama">
							<span>{{ props.row.name }}</span>
						</b-table-column>
						<b-table-column field="bu" label="🏢 Business Unit">
							<span>{{ props.row.bu }}</span>
						</b-table-column>
						<b-table-column
							field="nik"
							label="⚡ Action"
							class="tour-step-7"
						>
							<b-button
								:type="
									checkIfOpen(props.row.nik)
										? 'is-dark'
										: 'is-info'
								"
								size="is-small"
								@click="toggleDetail(props.row)"
								>{{
									checkIfOpen(props.row.nik)
										? "❌ Close"
										: "🔎 Detail"
								}}</b-button
							>
							<b-button
								:disabled="checkIfSaved(props.row.userId)"
								:type="
									checkIfSaved(props.row.userId)
										? 'is-dark'
										: 'is-success'
								"
								size="is-small"
								@click="addSaved(props.row)"
								>💾 Save Resource</b-button
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
									>💾 {{ selectedRes.length }}</span
								>
							</div>
						</div>
					</template>
					<template slot="detail" slot-scope="props">
						<article class="media">
							<figure class="media-left">
								<p class="image is-64x64">
									<img :src="props.row.avatar" />
								</p>
							</figure>
							<div class="media-content">
								<div class="content">
									<p>
										<strong>{{ props.row.name }}</strong>
										<small>@{{ props.row.bu }}</small>
									</p>
								</div>
							</div>
						</article>
					</template>
				</data-table>
			</div>
		</div>
	</div>
</template>

<script>
import Axios from "axios";
import Tools from "../../../tools.js";
import DataTable from "../../components/dataTable";
export default {
	components: {
		DataTable
	},
	props: {
		filterCat: {
			type: Array,
			required: true
		},
		apiSearchEngine: {
			type: String,
			required: true
		},
		apiPostSaved: {
			type: String,
			required: true
		},
		batchId: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			openedDetail: [],
			selectedRes: [],
			filterQuery: "",
			pickedCat: null,
			filters: [],
			fetchedRes: [],
			alert: {
				message: "",
				display: false
			}
		};
	},
	methods: {
		getSummary() {
			let summary = "";
			let selected = this.pickedCat;
			this.filterCat.forEach(function(cat, index) {
				if (cat.key === selected) {
					summary = cat.summary;
				}
			});

			return summary;
		},
		checkIfOpen(nik) {
			return this.openedDetail.includes(nik);
		},
		checkIfSaved(nik) {
			let found = this.selectedRes.filter(({ userId }) => userId === nik);
			return found.length > 0;
		},
		addSaved(resource) {
			this.selectedRes.push({
				userId: resource.userId,
				filters: this.parsedFilter
			});

			window.localStorage.setItem(
				"selectedResource",
				JSON.stringify({
					batchId: this.batchId,
					resource: this.selectedRes
				})
			);

			let savedNotif = document.querySelector("#savedLabel");
			savedNotif.classList.add("tada");
			savedNotif.addEventListener("animationend", function() {
				savedNotif.classList.remove("tada");
			});
		},
		toggleDetail(row) {
			if (this.checkIfOpen(row.nik)) {
				let indexAt = this.openedDetail.findIndex(
					nik => nik === row.nik
				);
				this.openedDetail.splice(indexAt, 1);
			} else {
				this.openedDetail.push(row.nik);
			}

			this.$refs.dataTable.toggleDetail(row);
		},
		addFilter() {
			if (this.pickedCat === "") {
				this.alert.message =
					"Silakan Pilih Kategori Pencarian Dahulu 😂";
				this.alert.display = true;
				return false;
			}

			if (this.filterQuery === "") {
				this.alert.message =
					"Silakan Isi Kolom Pencarian Terlebih Dahulu 😂";
				this.alert.display = true;
				return false;
			}

			let findExist = this.filters.findIndex(
				filter => filter.key === this.pickedCat
			);

			if (findExist > -1) {
				this.filters[findExist].query = this.filterQuery;
			} else {
				this.filters.push({
					key: this.pickedCat,
					query: this.filterQuery
				});
			}

			this.resetFilterForm();
			return true;
		},
		removeFilter(key) {
			let findExist = this.filters.findIndex(
				filter => filter.key === key
			);

			if (findExist > -1) {
				this.filters.splice(findExist, 1);
			}
		},
		resetFilterForm() {
			this.pickedCat = "";
			this.filterQuery = "";
			this.alert.message = "";
			this.alert.display = false;
		},
		fetchResource() {
			let self = this;
			Axios.get(this.apiSearchEngine, {
				params: self.parsedFilter
			})
				.then(function(response) {
					self.fetchedRes = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		loadLocalStorage(showAnimation = false) {
			let json = window.localStorage.getItem("selectedResource");
			let selected = JSON.parse(json);

			if (selected !== null) {
				this.selectedRes = selected.resource;

				if (showAnimation) {
					let savedNotif = document.querySelector("#savedLabel");
					savedNotif.classList.add("tada");
					savedNotif.addEventListener("animationend", function() {
						savedNotif.classList.remove("tada");
					});
				}
			}

			return selected;
		}
	},
	computed: {
		parsedFilter() {
			if (this.filters.length > 0) {
				let prep = {};
				this.filters.forEach(filter => {
					prep[filter.key] = filter.query;
				});

				return prep;
			} else {
				return [];
			}
		}
	},
	mounted() {
		this.fetchResource();
		this.loadLocalStorage(true);
	}
};
</script>

