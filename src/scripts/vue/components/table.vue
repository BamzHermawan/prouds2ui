<template>
	<b-table :data="data" :columns="fields"></b-table>
</template>

<script>
export default {
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