import Vue from 'vue';
import Buefy from 'buefy';
import graphbox from './graphbox.vue';
import feasibility from './feasibility.vue';
import { addScopeofWork, axios, parsedURL } from 'helper-apis';
import { checkConnection, notified } from 'helper-tools';

const implantTag = document.querySelector('#implantedJSON');
const implantData = JSON.parse(implantTag.innerHTML);

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { graphbox, feasibility },
	beforeMount() {
		const el = document.getElementById('contentApp');
		this.viewAccess = el.getAttribute('view-access');
		this.projectID = el.getAttribute('project-id');
		if (implantData.hasOwnProperty('document')) {
			this.documentData = implantData.document;
		}

		this.scopes = implantData.scope;
		this.graphList = implantData
			.compath.sort((a, b) => {
				if (a.level > b.level) {
					return -1;
				}
				if (a.level < b.level) {
					return 1;
				}

				return 0;
			});
	},
	mounted() {
		global.$loader.hide();
	},
	data: {
		viewAccess: 'readonly',
		documentData: undefined,
		projectID: '',
		graphList: [],
		document: null,
		scopes: [],
		review: {
			display: false,
		},
		scopeForm: {
			display: false,
			scope: "",
			status: undefined,
			message: ''
		},
		compath: {
			edit: false,
			add: {
				display: false,
				left: {
					title: '',
					name: ''
				},
				right: {
					title: '',
					name: ''
				}
			},
			reform: undefined,
			reform_level: undefined
		}
	},
	computed: {
		compath_has_change() {
			if (this.compath.edit) {
				return true;
			}

			if (this.compath.reform !== undefined) {
				return true;
			}

			return false;
		},
		compath_list() {
			if (this.compath.reform instanceof Array) {
				return this.compath.reform;
			}

			return this.graphList;
		}
	},
	methods: {
		add_scope() {
			if (this.scopeForm.scope === "") {
				this.scopeForm.status = 'is-danger';
				this.scopeForm.message = 'Scope of work can not be empty!'
				return false;
			}

			const self = this;
			addScopeofWork(this.projectID, this.scopeForm.scope)
				.then(res => {
					if (!res.data.status) {
						throw new Error('add_scope methods: False status return from server.');
					}

					self.scopes.push({
						id: res.data.scope_id,
						note: self.scopeForm.scope,
						checked: false
					});
				})
				.catch(err => {
					console.log(err);
					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem.<br>Please Try again later. 🙏"
						);
					}
				}).finally(() => {
					self.cancel_add_scope()
				});
		},
		delete_scope(id, index, note) {
			const self = this;
			const requestDelete = () => {
				axios.get(parsedURL('DeleteScopeofWork', { scope_id: id }))
					.then(res => {
						if (!res.data.status) {
							throw new Error('delete_scope methods: False status return from server.');
						}

						self.scopes.splice(index, 1);
						notified(self.$notification).success(
							"Succesfully delete scope of work. 👍"
						);
					})
					.catch(err => {
						console.log(err);
						if (checkConnection(self.$notification)) {
							notified(self.$notification).error(
								"Sorry we are encountering a problem.<br>Please Try again later. 🙏"
							);
						}
					});
			}

			const message = `Are you sure you want to <b>delete</b> this scope of work bellow ?<br>
			<p class="has-text-danger"><small>⚠ Please note that this action cannot be undone.</small></p><br>
			<article class="message is-small">
				<div class="message-body">
					${note}
				</div>
			</article>`;

			this.$dialog.confirm({
				title: 'Deleting Scope of Work',
				message: message,
				confirmText: 'Delete',
				type: 'is-danger',
				hasIcon: false,
				onConfirm: requestDelete
			})
		},
		cancel_add_scope() {
			this.scopeForm.status = undefined;
			this.scopeForm.display = false;
			this.scopeForm.message = '';
			this.scopeForm.scope = "";
		},
		add_between(before) {
			this.compath.reform_level = parseInt(before);
			this.compath.add.display = true;

			console.log(before, this.compath.reform_level);
		},
		add_top() {
			this.compath.reform_level = null;
			this.compath.add.display = true;
		},
		cancel_add_compath() {
			this.compath.reform = undefined;
			this.compath.reform_level = undefined;
			this.compath.add.display = false;
		},
		revert_change() {
			const self = this;
			const reverting = () => {
				self.cancel_add_compath();
				self.compath.edit = false;
			}

			this.$dialog.confirm({
				title: 'Revert Changes',
				message: 'Are you sure you want to revert changes on <b>Communication Path</b>?',
				confirmText: 'Yes',
				type: 'is-danger',
				hasIcon: false,
				onConfirm: reverting
			});
		},
		reform_compath() {
			if (this.compath.reform === undefined) {
				this.compath.reform = [...this.graphList];
			}

			const left = {
				title: this.compath.add.left.title,
				name: this.compath.add.left.name
			};

			const right = {
				title: this.compath.add.right.title,
				name: this.compath.add.right.name
			};

			if (this.compath.reform_level !== null) {
				for (let i = 0; i < this.compath.reform.length; i++) {
					let level = this.compath.reform[i].level;
					if (level == this.compath.reform_level) {
						level = parseInt(level) + 1;
						this.compath.reform.splice(i, 0, {
							left, right, level
						}); break;
					} else {
						this.compath.reform[i].level = (parseInt(level) + 1).toString();
					}
				}
			} else {
				const level = parseInt(this.compath.reform[0].level) + 1;
				this.compath.reform.unshift({
					left, right, level
				});
			}

			this.compath.add.left.title = '';
			this.compath.add.left.name = '';
			this.compath.add.right.title = '';
			this.compath.add.right.name = '';
			this.compath.add.display = false;
		}
	}
});