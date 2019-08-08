<template>
	<div class="container">
		<b-loading :active.sync="loading"></b-loading>
		<p class="title is-size-4">🎯 Detail Booking</p>
		<nav class="level">
			<div class="level-left">
				<div class="level-item">
					<div style="margin-right: 50px;">
						<p class="heading">Project Name</p>
						<p class="title is-size-5">
							{{ projectName }}
						</p>
					</div>
				</div>
				<div class="level-item">
					<div style="margin-right: 50px;">
						<p class="heading">Project Manager</p>
						<p class="title is-size-5">{{ projectManager }}</p>
					</div>
				</div>
				<div class="level-item">
					<div style="margin-right: 50px;">
						<p class="heading">Booking Periode</p>
						<p class="title is-size-5">{{ periode }}</p>
					</div>
				</div>
			</div>
			<div class="level-right">
				<b-button type="is-danger" @click="$parent.shutDetail"
					>🏃‍ Exit Detail</b-button
				>
			</div>
		</nav>
		<data-table
			title="Booked Resource"
			:data="resource"
			:fields="[]"
			:detailed="showDetail"
			detail-key="userId"
			:show-detail-icon="true"
		>
			<template slot-scope="props">
				<b-table-column field="name" label="👨‍💼 Nama">
					<span>{{ props.row.name }}</span>
				</b-table-column>
				<b-table-column field="bu" label="🏢 bu">
					<span>{{ props.row.bu }}</span>
				</b-table-column>
				<b-table-column field="status" label="🔎 Status">
					<span>{{ props.row.status }}</span>
				</b-table-column>
				<b-table-column field="approvalBy" label="✅ Approval">
					<span
						v-if="
							props.row.approvalBy !== null &&
								props.row.approvalBy !== undefined &&
								props.row.approvalBy !== ''
						"
					>
						{{ props.row.approvalBy }} @
						{{ props.row.approvedDate }}
					</span>
					<span v-else class="tag is-warning">Waiting Approval</span>
				</b-table-column>
			</template>
			<template slot="head-right">
				<span></span>
			</template>
			<template slot="top-right">
				<div class="field is-grouped">
					<div class="control">
						<div class="tags has-addons are-medium">
							<span class="tag is-dark">
								Total Resource
							</span>
							<span class="tag is-success">{{
								resource.length
							}}</span>
						</div>
					</div>
				</div>
			</template>
			<template slot="detail" slot-scope="props">
				<div class="container">
					<div class="container">
						<div class="columns">
							<div class="column">
								<p class="title is-size-5">
									{{ props.row.name }}
								</p>
								<p class="subtitle is-size-6">
									NIK. {{ props.row.userId }}
								</p>
							</div>
							<div class="column">
								<p class="title is-size-6">🏢 Business Unit</p>
								<p class="subtitle is-size-5">
									{{ props.row.bu }}
								</p>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<div class="content">
									<p class="title is-size-6">
										Kemampuan (Skill)
									</p>
									<ol
										v-if="props.row.skills.length > 0"
										type="1"
									>
										<li
											v-for="(skill, index) in props.row
												.skills"
											:key="index"
										>
											<b>{{ skill.skillName }}</b
											>:
											{{ skill.skillLevel }}
										</li>
									</ol>
									<p v-else class="tag is-warning">
										Tidak Ada Data
									</p>
								</div>
							</div>
							<div class="column">
								<div class="content">
									<p class="title is-size-6">Training</p>
									<ol
										v-if="props.row.course.length > 0"
										type="1"
									>
										<li
											v-for="(course, index) in props.row
												.course"
											:key="index"
										>
											{{ course.courseName }}
										</li>
									</ol>
									<p v-else class="tag is-warning">
										Tidak Ada Data
									</p>
								</div>
							</div>
							<div class="column">
								<div class="content">
									<p class="title is-size-6">Certificate</p>
									<ol
										v-if="props.row.competency.length > 0"
										type="1"
									>
										<li
											v-for="(competency, index) in props
												.row.competency"
											:key="index"
										>
											{{ competency.competencyName }}
										</li>
									</ol>
									<p v-else class="tag is-warning">
										Tidak Ada Data
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</data-table>
	</div>
</template>

<script>
import DataTable from "../../components/dataTable";
import { notified } from "../../../tools.js";
import Axios from "axios";
export default {
	components: { DataTable },
	props: {
		apiDetailResource: {
			type: String,
			required: true
		},
		batchDetail: {
			type: Object,
			required: true
		},
		isOpen: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			resource: [],
			projectName: "",
			projectManager: "",
			periode: "",
			loading: false,
			showDetail: false
		};
	},
	methods: {
		checkEmptyDetail(resource) {
			return (
				resource.skills === undefined ||
				resource.course === undefined ||
				resource.competency === undefined
			);
		},
		fetchDetail(userId) {
			let self = this;
			return Axios.get(this.apiDetailResource, {
				params: { userId: userId }
			})
				.then(function(response) {
					let detail = response.data;
					let idex = self.resource.findIndex(
						bit => bit.userId === userId
					);

					self.resource[idex].skills = detail.skills;
					self.resource[idex].course = detail.course;
					self.resource[idex].competency = detail.competency;
					self.showDetail = true;
				})
				.catch(function(error) {
					self.showDetail = false;
					notified(self.$toast).error(
						"Mohon Maaf Kami Tidak dapat Terhubung dengan Server, Silakan Cek Koneksi Anda. Terimakasih 🙏"
					);
				});
		},
		doReload(newBatch) {
			if (newBatch.resource !== undefined) {
				let self = this;
				this.resource = newBatch.resource;
				this.resource.forEach(user => {
					self.fetchDetail(user.userId);
				});
			}

			if (newBatch.projectName !== undefined) {
				this.projectName = newBatch.projectName;
			}

			if (newBatch.projectManager !== undefined) {
				this.projectManager = newBatch.projectManager;
			}

			if (newBatch.periode !== undefined) {
				this.periode = newBatch.periode;
			}
		}
	},
	watch: {
		batchDetail: function(newBatch) {
			this.doReload(newBatch);
		}
	}
};
</script>

