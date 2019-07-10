<template>
	<section>
		<b-field>
			<b-input placeholder="Search..." type="search" icon="magnify">
			</b-input>
		</b-field>
		<b-table
			:paginated="isPaginated"
			:per-page="perPage"
			:current-page.sync="currentPage"
			:pagination-simple="isPaginationSimple"
			:pagination-position="paginationPosition"
			:default-sort-direction="defaultSortDirection"
			default-sort="user.first_name"
			aria-next-label="Next page"
			aria-previous-label="Previous page"
			aria-page-label="Page"
			aria-current-label="Current page"
			:data="data"
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
			perPage: 5
		};
	},
	props: {
		fields: {
			type: Object,
			required: true
		},
		data: {
			type: Object,
			required: true
		}
	},
	methods: {
		searching() {
			return NULL;
		}
	}
};
</script>