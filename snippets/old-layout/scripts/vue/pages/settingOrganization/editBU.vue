<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<form :action="actionEvent" method="POST">
			<section class="modal-card-body">
				<input type="hidden" name="buId" v-model="buId" />
				<crud-input
					type="text"
					label="BU Name"
					placeholder="BU Name"
					name="buName"
					v-model="buName"
					input-style="margin-bottom:15px;"
				>
				</crud-input>
				<crud-input
					type="text"
					label="BU Code"
					placeholder="BU Code"
					name="buCode"
					:maxLength="3"
					v-model="buCode"
					input-style="margin-bottom:0px;"
				>
				</crud-input>
				<crud-input
					type="text"
					label="BU Head"
					placeholder="BU Head"
					name="buHead"
					v-model="buHead"
					input-style="margin-bottom:15px;"
				>
				</crud-input>
			</section>
			<section class="modal-card-foot is-clearfix is-block">
				<div class="is-pulled-right">
					<a class="button is-danger" @click="$parent.close()">
						Cancel
					</a>
					<button class="button is-success" type="submit">
						Save Task
					</button>
				</div>
			</section>
		</form>
	</div>
</template>

<script>
import CrudInput from "../../components/crud/crudInput";
export default {
	components: { CrudInput },
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		buId: {
			type: Number,
			required: true
		},
		buName: {
			type: String,
			required: true
		},
		buCode: {
			type: String,
			required: true
		},
		buHead: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	}
};
</script>