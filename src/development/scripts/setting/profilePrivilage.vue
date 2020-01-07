<template>
	<div class="field">
		<input type="hidden" name="privilage" :value="model.join(',')" />
		<tree-table
			ref="mTTcom"
			:data="menu"
			:shadow="false"
			no-card
			striped
			hoverable
		>
			<template slot="thead">
				<th>Menu</th>
				<th>Description</th>
				<th>Link</th>
				<th>Enable</th>
			</template>
			<template slot="labelrow" slot-scope="{ row: menu }">
				<span :class="'mdi ' + menu.icon"></span>
				<span>{{ menu.text }}</span>
			</template>
			<template slot="tbody" slot-scope="{ row }">
				<slot :row="row">
					<td>{{ row.desc }}</td>
					<td class="text-elipsis" style="max-width: 250px;">
						<a
							v-if="row.link !== null"
							:href="row.link"
							class="small-tag is-link"
							>{{ row.link }}</a
						>
						<span v-else class="small-tag">Empty Link</span>
					</td>
				</slot>
				<td>
					<b-checkbox
						v-model="model"
						@input="val => checkEnabler(val, row.id)"
						:native-value="row.id"
					>
					</b-checkbox>
				</td>
			</template>
		</tree-table>
	</div>
</template>

<script>
import { treeTable } from "components";
export default {
	components: { treeTable },
	props: {
		value: {
			required: true
		},
		menu: {
			required: true
		}
	},
	data() {
		return {
			backup: this.value,
			model: this.value
		};
	},
	methods: {
		reset() {
			this.menu = this.backup;
			this.$emit("input", this.model);
		},
		checkEnabler(val, id) {
			let toggler = val instanceof Array ? val.includes(id) : val;

			if (!toggler) {
				let descendant = this.$refs.mTTcom.getDescendant(id);
				if (descendant) {
					this.parentDisabled(descendant);
				}
			} else {
				let ancestor = this.$refs.mTTcom.getAncestor(id);
				if (ancestor.length > 0) {
					this.childEnabled(ancestor);
				}
			}

			this.$emit("input", this.model);
		},
		parentDisabled(child) {
			let menu = this.model;
			this.model = menu.filter(row => !child.includes(row));
		},
		childEnabled(ancestor) {
			for (let i = 0; i < ancestor.length; i++) {
				const menu = ancestor[i];
				if (!this.model.includes(menu)) {
					this.model.push(menu);
				}
			}
		}
	}
};
</script>