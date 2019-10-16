<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<form :action="actionEvent" method="POST">
			<section class="modal-card-body">
				<input type="hidden" name="parentID" v-model="parentId" />
				<b-field label="Parent Name">
					<b-message type="is-info" class="is-on-field">
						<p class="has-text-dark">{{ parentName }}</p>
					</b-message>
				</b-field>
				<crud-input
					type="text"
					label="BU Name"
					placeholder="BU Name"
					name="buName"
					input-style="margin-bottom:15px;"
				>
				</crud-input>
				<crud-input
					type="text"
					label="BU Code"
					placeholder="BU Code"
					name="buCode"
					:maxLength="3"
					input-style="margin-bottom:0px;"
				>
				</crud-input>
				<crud-input
					type="text"
					label="BU Head"
					placeholder="BU Head"
					name="buHead"
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
		parentId: {
			type: Number,
			required: true
		},
		parentName: {
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