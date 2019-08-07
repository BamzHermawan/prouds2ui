<template>
	<div class="container">
		<article
			v-for="(booking, index) in filterBooking(true)"
			:key="index"
			class="message is-primary"
		>
			<div class="message-body">
				<nav class="level">
					<div class="level-left">
						<p class="title is-size-5">
							Unfinished Booking:
							<span class="tag is-dark">📅 04/11/2019</span>
						</p>
					</div>
					<div class="level-right">
						<div class="level-item">
							<b-taglist attached>
								<b-tag type="is-dark">Saved Resource</b-tag>
								<b-tag type="is-info"
									>👨‍💼 {{ booking.resource.length }}</b-tag
								>
							</b-taglist>
						</div>
						<div class="level-item">
							<a
								:href="booking.updateLink"
								class="button is-small is-success"
								>📝 Update</a
							>
						</div>
					</div>
				</nav>
			</div>
		</article>

		<nav class="level">
			<div class="level-left">
				<p class="title is-size-4">Booking List</p>
			</div>
			<div class="level-right">
				<slot name="new-request-button"></slot>
			</div>
		</nav>

		<div class="columns multiline">
			<div
				class="column is-4"
				v-for="(booking, index) in filterBooking(false)"
				:key="index"
			>
				<article class="message is-dark">
					<div
						v-if="
							booking.projectId !== null &&
								booking.projectId !== undefined
						"
						class="message-header"
					>
						<p>
							<span class="tags has-addons">
								<span class="tag is-light">📅</span>
								<span class="tag is-info">28/10/2019</span>
							</span>
						</p>
						<button
							class="button is-small is-info"
							@click="$parent.openDetail(booking)"
						>
							🔎 Detail
						</button>
					</div>
					<div v-else class="message-header">
						<p>
							<b-icon
								icon="alert"
								type="is-warning"
								size="is-small"
							></b-icon>
							Booking not Finished
						</p>
						<a
							:href="booking.updateLink"
							class="button is-small is-success"
							>📝 Update</a
						>
					</div>
					<div class="message-body">
						<b-field label="Project Name">
							{{ booking.projectName }}
						</b-field>
						<b-field label="Booking Periode">
							{{ booking.periode }}
						</b-field>
						<b-field grouped group-multiline>
							<div
								v-for="(user, index) in resourceCount(
									booking.resource
								)"
								:key="index"
								class="control"
							>
								<b-taglist attached>
									<b-tag type="is-dark">{{
										user.status
									}}</b-tag>
									<b-tag type="is-info"
										>👨‍💼 {{ user.total }}</b-tag
									>
								</b-taglist>
							</div>
						</b-field>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script>
import DataTable from "../../components/dataTable";
export default {
	components: { DataTable },
	props: {
		userBooking: {
			type: Array,
			required: true
		}
	},
	methods: {
		filterBooking(onlyNull = false) {
			if (onlyNull) {
				return this.userBooking.filter(
					batch =>
						batch.projectId === null ||
						batch.projectId === undefined ||
						batch.projectId === ""
				);
			} else {
				return this.userBooking.filter(
					batch =>
						batch.projectId !== null &&
						batch.projectId !== undefined &&
						batch.projectId !== ""
				);
			}
		},
		resourceCount(resource) {
			let count = {};
			resource.forEach(user => {
				if (count.hasOwnProperty(user.status)) {
					count[user.status].total++;
				} else {
					count[user.status] = {
						status: user.status,
						total: 1
					};
				}
			});

			return count;
		}
	}
};
</script>

