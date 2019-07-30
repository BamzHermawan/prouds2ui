<template>
	<div class="columns">
		<div class="column is-3">
			<div class="container">
				<nav class="panel">
					<p class="panel-heading">Filter Resource</p>
					<div class="panel-block">
						<div class="container">
							<b-field>
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
							<b-field>
								<b-input
									placeholder="Search..."
									type="search"
									icon="magnify"
									size="is-small"
									v-model="filterQuery"
								>
								</b-input>
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
									class="is-fullwidth"
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
					<div class="panel-block animated SlideInDown">
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
			<p class="has-text-right" style="margin-bottom: 15px;">
				<slot class="cartButton"></slot>
			</p>
			<div class="container">
				<data-table
					title="Resource List"
					:data="fetchedRes"
					:fields="[]"
				>
					<template slot-scope="props">
						<b-table-column field="name" label="👨‍💼 Nama">
							<span>{{ props.row.name }}</span>
						</b-table-column>
						<b-table-column field="bu" label="🏢 Business Unit">
							<span>{{ props.row.bu }}</span>
						</b-table-column>
						<b-table-column field="role" label="Role">
							<span>{{ props.row.role }}</span>
						</b-table-column>
						<b-table-column field="nik" label="⚡ Action">
							<b-button type="is-info" size="is-small"
								>🔎 Detail</b-button
							>
							<b-button
								type="is-success"
								size="is-small"
								@click="addSaved(props.row)"
								>💾 Saved Resource</b-button
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
							<div class="control">
								<span
									id="savedLabel"
									class="tag is-success is-medium animated"
									>💾 {{ selectedRes.length }}</span
								>
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
		}
	},
	data() {
		return {
			selectedRes: [],
			filterQuery: "",
			pickedCat: "",
			filters: [],
			fetchedRes: [],
			alert: {
				message: "",
				display: false
			}
		};
	},
	methods: {
		addSaved(resource) {
			this.selectedRes.push({
				nik: resource.nik,
				name: resource.name,
				bu: resource.bu
			});

			let savedNotif = document.querySelector("#savedLabel");
			savedNotif.classList.add("tada");
			savedNotif.addEventListener("animationend", function() {
				savedNotif.classList.remove("tada");
			});
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

			console.log(findExist);
			if (findExist > -1) {
				let mans = this.filters.splice(findExist, 1);
				console.log(mans);
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
				params: self.paresedFilter
			})
				.then(function(response) {
					self.fetchedRes = response.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	},
	computed: {
		paresedFilter() {
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
	}
};
</script>

