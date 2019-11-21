<template>
	<div class="container">
		<div class="card">
			<header v-if="title !== undefined" class="card-header">
				<p class="card-header-title">
					{{ title }}
				</p>
				<slot name="head-right"></slot>
			</header>

			<table class="table">
				<thead>
					<tr>
						<th>Nama Unit</th>
						<th>Person in Charge</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr class="is-parent" data-id="1">
						<td>Telkomsigma</td>
						<td>Ade Wiranata Putra</td>
						<td>Action</td>
					</tr>
					<tr class="is-parent is-child" data-id="2" data-parent="1">
						<td>Solution Delivery</td>
						<td>Ade Wiranata Putra</td>
						<td>Action</td>
					</tr>
					<tr class="is-parent is-child" data-id="3" data-parent="2">
						<td>System Integration 1 Delivery</td>
						<td>Ade Wiranata Putra</td>
						<td>Action</td>
					</tr>
					<tr class="is-child" data-id="5" data-parent="3">
						<td>Child of Child</td>
						<td>Ade Wiranata Putra</td>
						<td>Action</td>
					</tr>
					<tr class="is-child" data-id="4" data-parent="2">
						<td>System Integration 2 Delivery</td>
						<td>Ade Wiranata Putra</td>
						<td>Action</td>
					</tr>
					<tr class="is-child" data-id="6" data-parent="1">
						<td>Banking Solution</td>
						<td>Ade Wiranata Putra</td>
						<td>Action</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: undefined
		}
	},
	data() {
		return {
			org: [
				{
					id: 1,
					parent: null,
					label: "Telkomsigma"
				},
				{
					id: 2,
					parent: 1,
					label: "Solution Delivery"
				},
				{
					id: 3,
					parent: 1,
					label: "Banking Solution Delivery"
				},
				{
					id: 4,
					parent: 2,
					label: "System Integration 1 Delivery"
				},
				{
					id: 5,
					parent: 2,
					label: "System Integration 2 Delivery"
				},
				{
					id: 6,
					parent: 4,
					label: "Child of Child"
				}
			]
		};
	},
	computed: {
		parsedTable() {
			let cook = [];
			var mapping = this.org.reduce(function(map, node) {
				map[node.id] = node;
				return map;
			}, {});

			for (let i = 0; i < this.org.length; i++) {
				let org = this.org[i];
				org.child = [];

				if (org.parent === null) {
					cook.push(org);
				} else {
					let parent = mapping[org.parent];
					parent.child.push(org);
				}
			}

			return cook;
		}
	}
};
</script>