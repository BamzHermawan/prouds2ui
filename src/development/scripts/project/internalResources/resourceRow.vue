<template>
	<tr>
		<td class="is-grey is-lighter"><slot></slot></td>
		<td :class="rowClass + ' has-text-centered'">{{ days }}</td>
		<td :class="rowClass + ' has-text-centered'">{{ qty }}</td>
		<td :class="rowClass + ' has-text-right'">{{ mandays }}</td>
		<td :class="rowClass + ' has-text-right'">{{ rate | currency }}</td>
		<td :class="rowClass + ' has-text-right'">{{ cost | currency }}</td>
	</tr>
</template>

<script>
export default {
	props: {
		qty: {
			type: String,
			default: "0"
		},
		days: {
			type: String,
			default: "0"
		},
		rate: {
			type: String,
			default: "0"
		}
	},
	data() {
		return {
			color: "is-light"
		};
	},
	computed: {
		mandays() {
			return parseInt(this.qty) * parseInt(this.days);
		},
		cost() {
			return parseInt(this.rate) * this.mandays;
		},
		rowClass() {
			return this.color;
		}
	},
	mounted() {
		if (this.$parent.type === undefined) {
			console.log(this.$parent);
			this.$destroy();
			throw new Error("Resource Row must be wrapped on Resource Plan");
		}

		this.color = this.$parent.type;
		this.$parent.pushRow({
			qty: parseInt(this.qty),
			days: parseInt(this.days),
			rate: parseInt(this.rate),
			mandays: this.mandays,
			cost: this.cost
		});
	}
};
</script>