<template>
	<div class="wrapping">
		<tree-table
			:data="data"
			title="Organization Structure"
			striped
			hoverable
		>
			<template slot="thead">
				<th class="has-text-left">Organization</th>
				<th>Action</th>
			</template>
			<template slot="labelrow" slot-scope="{ row }">
				<span :class="'mdi ' + row.icon"></span>
				<span
					>{{ row.text }}
					<small v-if="row.code">[{{ row.code }}]</small></span
				>
			</template>
			<template slot="tbody">
				<td class="has-text-centered" style="width: 125px;">
					<button class="button is-info is-small">
						Edit
					</button>
					<button class="button is-danger is-small">
						Remove
					</button>
				</td>
			</template>
		</tree-table>
	</div>
</template>

<script>
import { treeTable } from "components";
export default {
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	components: { treeTable }
};
</script>