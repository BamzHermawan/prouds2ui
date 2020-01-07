import qs from 'querystring';
import { parsedURL, axios } from 'helper-apis';
import Tree from 'helper-tree-class';
import { isEmpty } from 'helper-tools';

const mergeProgress = ($toMerge, $fetched) => {
	let { total, sigma, delta, tasks } = $toMerge;

	$toMerge.total = [...total, ...$fetched.total];
	$toMerge.sigma = [...sigma, ...$fetched.sigma];
	$toMerge.delta = [...delta, ...$fetched.delta];

	for (let i = 0; i < tasks.length; i++) {
		const task = $fetched.tasks[i];
		if (tasks[i].id === task.id) {
			$toMerge.tasks[i].weekly = [...tasks[i].weekly, ...task.weekly];
		}
	}

	$toMerge.week_count = $fetched.week_end;
	$toMerge.week_end = $fetched.week_end;

	return $toMerge;
}

class Tasks {
	constructor($project_id, $parent = null) {
		this.tasks = [];
		this.descendant = [];
		this.projectId = $project_id;

		if ($parent !== null) {
			this.parent = $parent.id;
			this.depth = ($parent.level + 1);
		} else {
			this.parent = 'root';
			this.depth = 0;
		}

		this.tree = new Tree({ 
			id: this.parent,
			data: 'root' 
		}, this.depth, $parent);
	}

	/**
	 * Parse Tree to Array sorted as table tree
	 * @returns array of tasks
	 */
	get parseArray() {
		if (this.tasks.length > 0) {
			return this.tasks;
		}

		const tasksArray = [];
		const parent = this.parent;

		// this is a recurse and immediately-invoking function 
		(function recurse(node) {
			if (node.id !== 'root' && node.id !== parent) {
				let task = node.data;
				task.id = node.id;
				task.level = node.depth;
				task.parent = node.parent.id;
				tasksArray.push(task);
			}
			for (var i = 0; i < node.child.length; i++) {
				recurse(node.child[i]);
			}
		})(this.tree.root);

		this.tasks = tasksArray;
		return this.tasks;
	}

	addDescendant (childId, parentId) {
		let rawAncestor = this.descendant.filter(node => node.descendant.includes(parentId));
		let listAncestor = [];

		for (let i = 0; i < rawAncestor.length; i++) {
			const ancestor = rawAncestor[i];
			listAncestor.push(ancestor.id);
		}

		if (!isEmpty(listAncestor)) {
			// add child as descendant in every ancestor
			this.descendant.forEach(node => {
				if (listAncestor.includes(node.id)) {
					node.descendant.push(childId);
				}
			});
		}
	}

	/**
	 * Add Child to parent in tree
	 * @param {*} child
	 * @param {*} parentId
	 */
	addChild (child, parentId) {
		if (parentId !== null && parentId !== 'root' && parentId !== this.parent) {
			let parent = this.descendant.findIndex(node => node.id === parentId);
			this.descendant[parent].descendant.push(child.id);
			this.addDescendant(child.id, parentId);
		}

		this.descendant.push({
			id: child.id,
			descendant: []
		});
	}

	/**
	 * Fetch tasks then create tree. When finish run callback
	 * @param {*} [$parent=null]
	 */
	fetch ($callback) {
		if (isEmpty(this.projectId)) {
			throw new Error('prouds err: project id is empty. [' + this.projectId + ']');
		} else {
			let request = undefined;
			if (this.parent === 'root') {
				request = axios.get(
					parsedURL("getProjectTasks", { project_id: this.projectId })
				);
			} else {
				request = axios.post(
					parsedURL("getProjectTasks", { project_id: this.projectId }), 
					qs.stringify({ parent: this.parent }), 
					{ headers: { "Content-Type": 'application/x-www-form-urlencoded' } }
				);
			}

			if (!isEmpty(request)) {
				let self = this;
				request
					.then(res => {
						let rootChild = [];
						const tasks = res.data.tasks;
						for (let i = 0; i < tasks.length; i++) {
							const task = tasks[i];
							const data = {
								name: task.name,
								weight: task.weight,
								progress: task.progress,
								start: task.start,
								end: task.end,
								hasChild: task.hasChild
							};
							let parent = 'root';
							if (task.parent !== null) {
								parent = task.parent;
							}
							let node = self.tree.add(task.id, parent, data);
							task.level = node.depth;
							self.addChild(task, parent);
							rootChild.push(task.id);
						}

						if (self.parent !== 'root') {
							this.descendant.splice(0, 0, {
								id: self.parent,
								descendant: rootChild
							});
						}

						$callback(self, null);
					}).catch(err => $callback(null, err));
			}
		}
	}

	/**
	 * Fetch Weekly task progress.
	 * @param {*} $start
	 * @param {*} $limit
	 * @param {*} $callback
	 */
	weekly ($start, $limit, $callback, $toMerge = null) {
		let task_id = [];
		this.parseArray.forEach(task => task_id.push(task.id));
		axios.post(parsedURL("getTasksProgress", { project_id: this.projectId }), qs.stringify({
			'week_start': $start,
			'week_limit': $limit,
			'tasks[]': task_id
		}), {
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded'
			}
		}).then(response => {
				if ($toMerge !== null) {
					response.data = mergeProgress($toMerge, response.data);
				}
				$callback(response.data, null);
			}).catch(err => $callback(null, err));
	}
}

export default Tasks;