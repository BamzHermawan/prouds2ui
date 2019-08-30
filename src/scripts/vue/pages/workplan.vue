<template>
	<div class="container">
		<br />
		<p class="title is-size-3" style="margin-bottom:10px;">
			Workplan
		</p>
		<br />

		<nav class="level">
			<div class="level-left">
				<button
					class="button is-primary"
					@click="onCancel"
					style="width:100%;"
				>
					<span>🏃‍ Exit Workplan</span>
				</button>
			</div>
			<div class="level-right">
				<div class="level-item">
					<button class="button is-success" style="width:100%;">
						<b-icon icon="restore"></b-icon>
						<span>Rebaseline</span>
					</button>
				</div>
				<div class="level-item" v-if="selectedDocument">
					<form :action="apiAction" method="post">
						<input
							type="hidden"
							name="image"
							v-model="selectedDocument.name"
						/>
						<button
							class="button is-warning is-fullwidth"
							type="submit"
						>
							📬 Send File
						</button>
					</form>
					<span class="file-name" v-if="selectedDocument">
						{{ selectedDocument.name }}
					</span>
				</div>
				<div class="level-item" v-else>
					<b-upload
						v-model="selectedDocument"
						name="evidDoc"
						native
						required
						style="width:100%;"
						accept=".xml,.jpg"
					>
						<a class="button is-info is-fullwidth">
							<b-icon icon="upload"></b-icon>
							<span>Upload XML</span>
						</a>
					</b-upload>
				</div>
			</div>
		</nav>
		<v-chart :dataBaru="dataBaru"></v-chart>
	</div>
</template>

<script>
import vChart from "../components/ganttchart";
export default {
	components: {
		vChart
	},
	props: {
		apiAction: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dataBaru: DATA,
			selectedDocument: null,
			test: "kocok"
		};
	},
	methods: {
		onCancel() {
			window.history.back();
		}
	},
	computed: {
		documentName() {
			if (this.selectedDocument !== null) {
				let size = this.formatSizeString(this.selectedDocument.size);
				this.checkExtention(this.selectedDocument.name);
				return this.selectedDocument.name + " [ " + size + " ] ";
			}

			return "No Document Selected";
		}
	}
};
</script>
