<template>
	<section>
		<b-field>
			<b-input
				placeholder="Search..."
				type="search"
				icon="magnify"
				v-model="search"
			>
			</b-input>
		</b-field>
		<b-table
			:paginated="isPaginated"
			:per-page="perPage"
			:current-page.sync="currentPage"
			:pagination-simple="isPaginationSimple"
			:pagination-position="paginationPosition"
			:default-sort-direction="defaultSortDirection"
			aria-next-label="Next page"
			aria-previous-label="Previous page"
			aria-page-label="Page"
			aria-current-label="Current page"
			:data="filteredlist"
			:columns="fields"
		></b-table>
	</section>
</template>

<script>
export default {
	data() {
		return {
			isPaginated: true,
			isPaginationSimple: true,
			paginationPosition: "bottom",
			defaultSortDirection: "asc",
			currentPage: 1,
			perPage: 5,
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
		}
	},
	methods: {
		searching() {
			return NULL;
		}
	},
	computed: {
		filteredlist() {
			let self = this;
			return self.data.filter(post => {
				let iwoFilter = post.iwo
					.toLowerCase()
					.includes(self.search.toLowerCase());
				let projectNameFilter = post.project_name
					.toLowerCase()
					.includes(self.search.toLowerCase());
				let pmFilter = post.pm
					.toLowerCase()
					.includes(self.search.toLowerCase());
				let statusFilter = post.status
					.toLowerCase()
					.includes(self.search.toLowerCase());
				let progressFilter = post.progress
					.toLowerCase()
					.includes(self.search.toLowerCase());

				return (
					iwoFilter ||
					projectNameFilter ||
					pmFilter ||
					statusFilter ||
					progressFilter
				);
			});
		}
	}
};
</script>