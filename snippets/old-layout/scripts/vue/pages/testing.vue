<template>
	<v-table :data="data" :fields="columns"></v-table>
</template>

<script>
import vTable from "../components/dataTable";
export default {
	components: {
		vTable
	},
	data() {
		return {
			data: DATA,
			columns: FIELDS
		};
	}
};
</script>