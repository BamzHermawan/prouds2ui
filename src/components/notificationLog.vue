<template>
	<div :class="'notification-log animated fadeIn' + mainClass">
		<div class="log-left">
			<div class="checkbox-container">
				<b-checkbox
					v-model="selected"
					@input="toggleSelect"
				></b-checkbox>
			</div>
		</div>
		<div class="log-header content" @click="toggleOpen">
			<p class="is-log-subject">{{ subject }}</p>
			<p class="is-sinopsis">{{ sinopsis }}</p>
			<p v-if="isOpen" class="is-marginless has-text-info">
				{{ fullDate() }} - {{ time }}
			</p>
		</div>
		<div class="log-stamp">
			<div v-if="!isOpen" class="content">
				<p>{{ dateStamp }}</p>
				<p>{{ time }}</p>
			</div>
		</div>
		<div class="log-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import Moment from "helper-moment";
import { cutShort, isEmpty } from "helper-tools";
export default {
	props: {
		index: {
			required: true
		},
		logId: {
			required: true
		},
		subject: {
			type: String
		},
		date: {
			type: String,
			default: Moment().format("DD/MM/YYYY")
		},
		time: {
			type: String,
			default: undefined
		},
		isRead: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selected: false,
			isOpen: false,
			readMore: false,
			contentEmpty: false
		};
	},
	computed: {
		dateStamp() {
			return Moment(this.date, "DD/MM/YYYY").calendar(null, {
				sameDay: "[Today]",
				nextDay: "[Tomorrow]",
				nextWeek: "dddd",
				lastDay: "[Yesterday]",
				lastWeek: "DD MMM YYYY",
				sameElse: "DD MMM YYYY"
			});
		},
		sinopsis() {
			if (!isEmpty(this.$slots.default)) {
				let text = this.$slots.default[0].data.domProps.innerHTML;

				if (!isEmpty(text)) {
					return cutShort(text, 15);
				} else {
					this.contentEmpty = true;
					return "";
				}
			}
		},
		mainClass() {
			let kelas = this.isRead ? " is-read" : "";
			kelas += this.isOpen ? " is-open" : "";

			return kelas;
		}
	},
	methods: {
		fullDate() {
			return Moment(this.date, "DD/MM/YYYY").format("dddd, DD MMMM YYYY");
		},
		toggleOpen() {
			let alreadyOpen = this.$parent.getActiveLog(this);
			if (!isEmpty(alreadyOpen)) {
				alreadyOpen.isOpen = false;
			}

			this.$parent.activeId = this.index;
			this.isOpen = !this.isOpen;

			this.$emit("toggle", this);
		},
		toggleSelect(status) {
			this.$emit("selected", {
				vue: this,
				status: status
			});
		}
	}
};
</script>


