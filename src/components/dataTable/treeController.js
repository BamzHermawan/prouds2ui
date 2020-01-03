import Tree from 'helper-tree-class';
import { isEmpty } from 'helper-tools';

class TreeTable {
	constructor(config = null) {
		this.config = {
			persistData: null,
			beforeAppend: null
		};

		if (config instanceof Object) {
			if (config.hasOwnProperty('persistData')) {
				this.config.persistData = config.persistData;
			}

			if (config.hasOwnProperty('beforeAppend')) {
				this.config.beforeAppend = config.beforeAppend;
			}
		};

		this.list = [];
		this.descendant = [];

		this.tree = new Tree({ 
			id: 'root',
			data: 'root' 
		});
	}

	/**
	 * Parse Tree to Array sorted as table tree
	 * @returns Array
	 */
	get table() {
		if (this.list.length > 0) {
			return this.list;
		}

		const arrayed = [];
		const parent = this.parent;

		// this is a recurse and immediately-invoking function 
		(function recurse(node) {
			if (node.id !== 'root' && node.id !== parent) {
				let row = node.data;
				row.id = node.id;
				row.dept = node.depth;
				row.parent = node.parent.id;
				arrayed.push(row);
			}

			for (var i = 0; i < node.child.length; i++) {
				recurse(node.child[i]);
			}
		})(this.tree.root);

		this.list = arrayed;
		return this.list;
	}

	/**
	 * Adding self to every ancestor descendant list
	 * @param {*} childId
	 * @param {*} parentId
	 * @memberof TreeTable
	 */
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
	 * @memberof TreeTable
	 */
	addChild (child, parentId) {
		if (parentId !== null && parentId !== 'root' && parentId !== this.parent) {
			let parent = this.descendant.findIndex(node => node.id === parentId);
			this.descendant[parent].descendant.push(child.id);
			this.addDescendant(child.id, parentId);
		}

		let pack = {
			id: child.id,
			descendant: []
		};

		if (this.config.persistData instanceof Array) {
			this.config.persistData.forEach(persist => {
				if (child.hasOwnProperty(persist)) {
					pack[persist] = child[persist];
				}
			});
		}

		this.descendant.push(pack);
	}

	/**
	 * insert data to tree. When finish run callback
	 * @param {*} [$parent=null]
	 */
	import ($data, $callback) {
		for (let i = 0; i < $data.length; i++) {
			const row = $data[i];

			let parent = 'root';
			if (!isEmpty(row.parent)) {
				parent = row.parent;
			}

			if (typeof this.config.beforeAppend === "function") {
				$data[i] = this.config.beforeAppend($data[i]);
			}

			let node = this.tree.add(row.id, parent, $data[i]);
			row.depth = node.depth;
			this.addChild(row, parent);
		}

		$callback(this);
	}

	/**
	 * append child to specific node in tree
	 * @param {*} $data
	 * @param {*} $callback
	 * @memberof TreeTable
	 */
	append ($data, $callback) {
		let parent = 'root';
		if (!isEmpty($data.parent)) {
			parent = $data.parent;
		}

		if (typeof this.config.beforeAppend === "function") {
			$data = this.config.beforeAppend($data);
		}

		let node = this.tree.add($data.id, parent, $data);
		$data.depth = node.depth;
		this.addChild($data, parent);

		$callback(this);
	}

}

export default TreeTable;