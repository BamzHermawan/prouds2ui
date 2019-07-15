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
			aria-next-label="mdi-chevron-right"
			aria-previous-label="mdi-chevron-left"
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
	methods: {},
	computed: {
		filteredlist() {
			let self = this;
			return self.data.filter(post => {
				let found = Object.keys(post).find(key =>
					post[key].toLowerCase().includes(self.search.toLowerCase())
				);

				return found;
			});
		}
	}
};
</script>