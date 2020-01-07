<template>
	<div class="container">
		<div :class="cardClass">
			<header v-if="title !== undefined && !noCard" class="card-header">
				<p class="card-header-title">
					{{ title }}
				</p>
				<slot name="head-right"></slot>
			</header>

			<div class="b-table">
				<div class="table-wrapper table-container">
					<table :class="tableClass">
						<thead>
							<tr>
								<slot name="thead"></slot>
							</tr>
						</thead>
						<tbody>
							<tr
								:key="index"
								:data-row="row.id"
								:data-parent="row.parent"
								:class="rowClass(row, index)"
								v-for="(row, index) in table"
							>
								<td :class="level(row.depth)">
									<span
										v-if="row.hasChild"
										class="mdi mdi-toggle-folder"
										@click.stop="toggleChild(row.id, index)"
									></span>

									<slot
										name="labelrow"
										:row="row"
										:index="index"
									>
										{{ row.text }}
									</slot>
								</td>

								<slot
									name="tbody"
									:row="row"
									:index="index"
									:get-ancestor="getAncestor"
									:get-descendant="getDescendant"
								/>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Tree from "./treeController";
export default {
	props: {
		title: {
			type: String,
			default: undefined
		},
		data: {
			type: Array,
			required: true
		},
		noCard: {
			type: Boolean,
			default: false
		},
		shadow: {
			type: Boolean,
			default: true
		},
		bordered: {
			type: Boolean,
			default: false
		},
		hoverable: {
			type: Boolean,
			default: false
		},
		striped: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			table: [],
			descendant: [],
			tree: undefined
		};
	},
	mounted() {
		let self = this;
		this.tree = new Tree({
			beforeAppend(node) {
				if (!node.hasOwnProperty("open")) node.open = true;
				return node;
			},
			persistData: ["open"]
		});

		this.tree.import(this.data, tree => {
			self.table = tree.table;
			self.descendant = tree.descendant;

			self.$emit("loaded", this);
		});
	},
	methods: {
		level(depth) {
			return "has-depth-" + depth;
		},

		getAncestor(id) {
			let cooked = [];
			let ancestor = this.descendant.filter(row =>
				row.descendant.includes(id)
			);
			for (let i = 0; i < ancestor.length; i++) {
				const node = ancestor[i];
				cooked.push(node.id);
			}

			return cooked;
		},

		getDescendant(id) {
			let found = this.descendant.find(row => row.id === id);
			return found instanceof Object ? found.descendant : undefined;
		},

		// toggle display descendant
		toggleChild(id, index) {
			let self = document.querySelector("[data-row='" + id + "']");
			let isHidden = self.classList.contains("is-folded");
			let row = this.descendant.find(node => node.id === id);

			for (let i = 0; i < row.descendant.length; i++) {
				const child = row.descendant[i];
				if (isHidden) {
					document
						.querySelectorAll("[data-row='" + child + "']")
						.forEach(node => {
							node.classList.remove("is-hidden", "is-folded");
						});
				} else {
					document
						.querySelectorAll("[data-row='" + child + "']")
						.forEach(node => {
							node.classList.add("is-hidden");
						});
				}
			}

			self.classList.toggle("is-folded");
			document.querySelector(".contentPage").scrollTop = 0;
		},

		rowClass(row, index) {
			let parentisFolded = this.descendant.find(node => {
				return node.descendant.includes(row.id) && !node.open;
			});

			return {
				"is-folded": !row.open,
				"is-hidden": parentisFolded
			};
		}
	},
	computed: {
		cardClass() {
			return {
				card: !this.noCard,
				"is-shadowless": !this.shadow
			};
		},
		tableClass() {
			return {
				table: true,
				"is-narrow": true,
				"is-tree-table": true,
				"is-fullwidth": true,
				"is-bordered": this.bordered,
				"is-hoverable": this.hoverable,
				"is-striped": this.striped
			};
		}
	}
};
</script>