<template>
	<div class="container">
		<div class="card">
			<header v-if="title !== undefined" class="card-header">
				<p class="card-header-title">
					{{ title }}
				</p>
				<slot name="head-right">
					<b-switch v-model="showAll" style="margin-right:15px;"
						>Show All</b-switch
					>
				</slot>
			</header>
			<div class="card-content">
				<slot name="top-body"></slot>
				<nav class="level">
					<div class="level-left">
						<b-field>
							<b-input
								placeholder="Search..."
								type="search"
								icon="magnify"
								v-model="search"
								style="margin-right: 10px;"
							>
							</b-input>
						</b-field>
					</div>
					<div class="level-right">
						<slot
							name="top-right"
							:search="search"
							:page="currentPage"
						>
							<div class="field is-grouped">
								<div
									v-show="search !== ''"
									class="control animated fadeIn"
								>
									<div class="tags has-addons are-medium">
										<span class="tag is-dark"
											>Search Result</span
										>
										<span class="tag is-primary">{{
											filteredlist.length
										}}</span>
									</div>
								</div>
								<div class="control">
									<div class="tags has-addons are-medium">
										<span class="tag is-dark">Total</span>
										<span class="tag is-primary">{{
											data.length
										}}</span>
									</div>
								</div>
							</div>
						</slot>
					</div>
				</nav>
				<b-table
					:paginated="!showAll && filteredlist.length > 10"
					:per-page="perPage"
					:current-page.sync="currentPage"
					:pagination-simple="true"
					pagination-position="bottom"
					default-sort-direction="asc"
					aria-next-label="mdi-chevron-right"
					aria-previous-label="mdi-chevron-left"
					aria-page-label="Page"
					aria-current-label="Current page"
					:data="filteredlist"
					:columns="fields"
				>
					<template slot-scope="props">
						<slot :row="props.row"></slot>
					</template>

					<template slot="empty">
						<slot name="empty"></slot>
					</template>
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentPage: 1,
			search: ""
		};
	},
	props: {
		fields: {
			type: Array,
			required: true
		},
		data: {
			type: Array,
			required: true
		},
		perPage: {
			type: Number,
			default: 5
		},
		showAll: {
			type: Boolean,
			default: false
		},
		title: {
			type: String
		}
	},
	computed: {
		filteredlist() {
			let self = this;
			return self.data.filter(post => {
				let found = Object.keys(post).find(key => {
					if (typeof post[key] === "string") {
						return post[key]
							.toLowerCase()
							.includes(self.search.toLowerCase());
					} else {
						return false;
					}
				});

				return found;
			});
		}
	}
};
</script>