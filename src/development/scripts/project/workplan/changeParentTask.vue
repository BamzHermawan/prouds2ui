<template>
	<form :action="actionEvent" method="POST">
		<input type="hidden" name="projectId" v-model="projectId" />
		<input type="hidden" name="taskID" v-model="task.pID" />

		<b-field horizontal label="Progress Group">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ processGroupName }}</span
			>
		</b-field>

		<b-field horizontal label="Task">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ task.pName }}</span
			>
		</b-field>

		<b-field horizontal label="Start Date">
			<b-field>
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ start }}</span
				>
			</b-field>
			<b-field horizontal label="End Date" style="margin-left:2em;">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ finish }}</span
				>
			</b-field>
		</b-field>

		<b-field horizontal label="Duration">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ task.duration }}</span
			>
		</b-field>

		<input type="hidden" name="parent" :value="parent" />
		<input type="hidden" name="previous_parent" :value="parent_last" />

		<b-field horizontal label="Parent">
			<b-autocomplete
				expanded
				ref="selectColumn"
				v-model="query"
				placeholder="Select Parent Task"
				:open-on-focus="true"
				:data="autoComplete"
				field="name"
				@select="selectedParent"
				@blur="queryChanged"
			>
			</b-autocomplete>
		</b-field>

		<b-field horizontal>
			<div class="buttons">
				<button
					class="button is-success is-long"
					type="submit"
					:disabled="disableButton"
				>
					Save
				</button>
				<b-button type="is-danger is-long" @click="$emit('cancel')"
					>Cancel</b-button
				>
			</div>
		</b-field>

		<div class="white-space"></div>
	</form>
</template>

<script>
import moment from "helper-moment";
import crudInput from "components";
import { isEmpty } from "helper-tools";

const checkPass = val => {
	return isEmpty(val) ? null : val;
};

export default {
	components: { crudInput },
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		projectId: {
			type: String,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dataBaru: GANTT,
			start: "",
			finish: "",
			parent: null,
			parent_last: null,
			selected: null,
			query: ""
		};
	},
	methods: {
		getTreeName(taskNode) {
			let treeName = taskNode.pName;
			let current = taskNode.pParent;

			for (let i = 0; i < 3; i++) {
				if (current != 0) {
					let parent = this.dataBaru.find(
						node => node.pID === current
					);

					if (parent === undefined) {
						console.log("error parent tidak ditemukan:", current);
						return 0;
					}

					let name = parent.pName.split(" ");
					if (name.length > 2) {
						treeName =
							name.slice(0, 2).join(" ") + "… » " + treeName;
					} else {
						treeName =
							name.slice(0, 2).join(" ") + " » " + treeName;
					}

					current = parent.pParent;
				}
			}

			return "※ " + treeName;
		},
		selectedParent(option) {
			if (option) {
				this.parent = option.id;
				this.selected = option.name;
				this.query = option.name;
			}
		},
		queryChanged() {
			setTimeout(() => {
				let node = this.dataBaru.find(
					task => task.pName == this.parseTreeName
				);

				if (node === undefined) {
					this.query = this.selected;
				} else {
					this.query = this.getTreeName(node);
				}
			}, 100);
		},
		removeLink() {
			this.predecessor = null;
			this.selected = "";
			this.query = "";
		}
	},
	computed: {
		parseTreeName() {
			return this.query
				.replace("※ ", "")
				.replace("…", "")
				.split(" » ")
				.pop();
		},
		disableButton() {
			return this.parent == this.task.pParent;
		},
		processGroupName() {
			if (
				this.task.processGroupID != 0 ||
				this.task.processGroupID !== ""
			) {
				let found = this.dataBaru.find(
					task => task.pID === this.task.processGroupID
				);

				if (found != undefined && found.hasOwnProperty("pName")) {
					return found.pName;
				} else {
					return "";
				}
			}
		},
		autoComplete() {
			let filtered = [];
			let rawName = this.parseTreeName;
			for (let i = 0; i < this.dataBaru.length; i++) {
				const node = this.dataBaru[i];

				let checkName =
					node.pName
						.toString()
						.toLowerCase()
						.indexOf(rawName.toLowerCase()) >= 0;

				if (checkName && node.pID !== this.task.pID) {
					let option = { id: node.pID };
					if (node.hasOwnProperty("treeName")) {
						option.name = node.treeName;
					} else {
						this.dataBaru[i].treeName = this.getTreeName(node);
						option.name = this.dataBaru[i].treeName;
					}

					filtered.push(option);
				}
			}

			return filtered;
		}
	},
	beforeMount() {
		this.start = moment(this.task.pStart).format("dddd, DD MMMM YYYY");
		this.finish = moment(this.task.pEnd).format("dddd, DD MMMM YYYY");
		this.parent = checkPass(this.task.pParent);
		this.parent_last = checkPass(this.task.pParent);
	},
	mounted() {
		let node = this.dataBaru.find(task => task.pID === this.parent);

		if (node !== undefined) {
			if (node.hasOwnProperty("treeName")) {
				this.selected = node.treeName;
			} else {
				this.selected = this.getTreeName(node);
			}

			this.query = this.selected;
			this.$refs.selectColumn.setSelected({
				id: this.parent,
				name: this.selected
			});
		}
	}
};
</script>