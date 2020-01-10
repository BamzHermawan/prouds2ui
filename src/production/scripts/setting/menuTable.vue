<template>
	<paging ref="paging" default="table">
		<paging-page page-id="table" label="Menu">
			<b-button type="is-success is-small" @click="addMenu()"
				>Add Menu</b-button
			>

			<span class="white-space"></span>

			<tree-table
				:data="menu"
				title="Menu Configuration"
				striped
				hoverable
			>
				<template slot="thead">
					<th>Menu</th>
					<th>Description</th>
					<th>Link</th>
					<th>Action</th>
				</template>
				<template slot="labelrow" slot-scope="{ row }">
					<span :class="'mdi ' + row.icon"></span>
					<span>{{ row.text }}</span>
				</template>
				<template slot="tbody" slot-scope="{ row }">
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
					<td class="has-text-centered" style="width: 125px;">
						<button
							class="button is-info is-small"
							@click="editMenu(row)"
						>
							Edit
						</button>
						<button
							@click="onRemove(row)"
							class="button is-danger is-small"
						>
							Remove
						</button>
					</td>
				</template>
			</tree-table>
		</paging-page>

		<paging-page page-id="form" :label="formLabel">
			<slot
				name="form"
				:formType="formStatus"
				:switchTo="changePage"
				:hasValue="getValue"
				:value="value"
			></slot>
		</paging-page>
	</paging>
</template>

<script>
import { treeTable, Paging, PagingPage } from "components";
import { parsedURL } from "helper-apis";
export default {
	name: "menuTable",
	components: { treeTable, Paging, PagingPage },
	props: {
		menu: {
			type: Array,
			required: true
		},
		removeAction: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			formStatus: "add",
			formLabel: "Create New Menu",
			selectedMenu: {},
			createdMenu: {
				link: null,
				icon: null
			}
		};
	},
	computed: {
		value() {
			return this.formStatus === "add"
				? this.createdMenu
				: this.selectedMenu;
		}
	},
	methods: {
		getValue(name) {
			if (this.value.hasOwnProperty(name)) {
				return this.value[name];
			}

			return null;
		},
		editMenu(selected) {
			this.formStatus = "edit";
			this.formLabel = "Edit " + selected.text;
			this.selectedMenu = selected;
			this.changePage("form");
		},
		addMenu() {
			this.formStatus = "add";
			this.formLabel = "Create New Menu";
			this.createdMenu.link = null;
			this.createdMenu.icon = null;
			this.changePage("form");
		},
		changePage(key) {
			this.$refs.paging.showPage(key);
		},
		onRemove(row) {
			let removeLink = parsedURL(this.removeAction, row);

			this.$dialog.confirm({
				title: "Confirm Remove",
				message:
					"You are trying to remove menu <b>" +
					row.text +
					"</b>. Are you sure ?",
				confirmText: "Yes",
				type: "is-danger",
				onConfirm: () => {
					window.location = removeLink;
				}
			});
		}
	}
};
</script>