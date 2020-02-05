<template>
	<form :action="endPoint" method="post">
		<b-field horizontal label="Program Name">
			<b-input
				v-model="name"
				name="name"
				placeholder="Name of the program"
				expanded
				required
			></b-input>
		</b-field>
		<b-field horizontal label="Business Unit">
			<b-autocomplete
				v-model="model.unit"
				:data="foundUnits"
				field="name"
				placeholder="Find Business Unit"
				keep-first
				open-on-focus
				@select="selectUnit"
				required
			>
			</b-autocomplete>
		</b-field>
		<b-field horizontal label="Program Manager">
			<b-autocomplete
				v-model="model.manager"
				:data="foundManagers"
				field="name"
				placeholder="Find User to Assign as Program Manager"
				keep-first
				open-on-focus
				@select="selectManager"
				required
			>
			</b-autocomplete>
		</b-field>
		<b-field horizontal label="Start Date">
			<b-field>
				<crud-input
					type="datepicker"
					name="start"
					v-model="start"
					placeholder="Pick Start Date"
					input-style="margin-bottom: 0px;"
					required
				>
				</crud-input>
			</b-field>
			<b-field horizontal label="End Date" style="margin-left:2em;">
				<crud-input
					type="datepicker"
					name="end"
					v-model="end"
					:min-date="start"
					placeholder="Pick Finish Date"
					input-style="margin-bottom: 0px;"
					required
				>
				</crud-input>
			</b-field>
		</b-field>

		<b-field v-if="isEdit" horizontal label="Status Program">
			<b-select
				name="status"
				v-model="status"
				placeholder="Select Program Status"
			>
				<slot name="status-option"></slot>
			</b-select>
		</b-field>

		<b-field label="Summary">
			<b-input
				name="description"
				type="textarea"
				placeholder="Describe what this program is about.."
				v-model="description"
				required
			></b-input>
		</b-field>

		<input type="hidden" name="unit" v-model="unit" />
		<input type="hidden" name="manager" v-model="manager" />

		<b-field>
			<div class="buttons">
				<b-button type="is-success is-long" native-type="submit"
					>Submit</b-button
				>
				<b-button type="is-danger is-long" @click="cancel"
					>Cancel</b-button
				>
			</div>
		</b-field>
	</form>
</template>

<script>
import { crudInput } from "components";
import { parsedURL } from "helper-apis";
import Moment from "helper-moment";
export default {
	components: {
		crudInput
	},
	props: {
		action: {
			type: String,
			required: true
		},
		program: {
			default: undefined
		},
		units: {
			type: Array,
			default: []
		},
		managers: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			isEdit: false,
			name: null,
			unit: null,
			manager: null,
			start: null,
			end: null,
			description: null,
			status: null,
			model: {
				unit: "",
				manager: ""
			}
		};
	},
	computed: {
		endPoint() {
			let program = new Object();
			if (this.program !== undefined) {
				program = this.program;
			} else {
				return this.action.replace(/\{\w*\}/g, "-");
			}

			return parsedURL(this.action, program);
		},
		foundUnits() {
			return this.units.filter(option => {
				return option.name
					.toString()
					.toLowerCase()
					.includes(this.model.unit.toLowerCase());
			});
		},
		foundManagers() {
			return this.managers.filter(option => {
				return option.name
					.toString()
					.toLowerCase()
					.includes(this.model.manager.toLowerCase());
			});
		}
	},
	methods: {
		cancel() {
			this.clear();
			this.$emit("cancel");
		},
		clear() {
			this.name = null;
			this.unit = null;
			this.manager = null;
			this.start = null;
			this.end = null;
			this.description = null;
		},
		setProgram(program) {
			this.name = program.name;
			this.unit = program.unit.id;
			this.manager = program.pm.nik;
			this.start = new Date(Moment(program.start, "DD/MM/YYYY"));
			this.end = new Date(Moment(program.end, "DD/MM/YYYY"));
			this.description = program.description;
			this.status = program.status.id;

			this.model.unit = program.unit.name;
			this.model.manager = program.pm.name;
			this.isEdit = true;
		},
		selectUnit(opt) {
			this.unit = opt.id;
		},
		selectManager(opt) {
			this.manager = opt.nik;
		}
	},
	beforeMount() {
		this.start = new Date();
		this.end = new Date();
		this.isEdit = false;

		if (this.program !== undefined) {
			this.setProgram(this.program);
		}
	}
};
</script>