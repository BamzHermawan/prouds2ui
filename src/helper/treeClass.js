class Queue {
	constructor() {
		this.dataStore = []
        /**
         * add queue
         * @param {*} element
         */
		this.enqueue = function (element) {
			this.dataStore.push(element)
		}
        /**
         * shift queue
         */
		this.dequeue = function () {
			return this.dataStore.shift()
		}
        /**
         * get first element of queue
         */
		this.front = function () {
			return this.dataStore[0]
		}
        /**
         * get last element of queue
         */
		this.back = function () {
			return this.dataStore[this.dataStore.length - 1]
		}
	}
}

class Node {
	constructor(id, data) {
		this.id = id
		this.parent = null
		this.child = []
		this.data = data
		this.depth = 0
	}
}

/**
 * Create a Tree Object
 * @param {*} node: {id, data}
 */
class Tree {
	constructor(node, depth = 0, parent = null) {
		const root = new Node(node.id, node.data)
		root.parent = parent
		root.depth = depth
		this.root = root
	}

	/**
	 * Loop tree from root to leaf
	 * @param {*} callback
	 */
	traverseBF (callback) {
		let queue = new Queue()

		// start loop from root
		let current = this.root
		let depth = current.depth;
		while (current) {

			// start callback
			callback(current, depth)

			// lets go to children
			depth++

			// add every child ro queue
			for (let i = 0; i < current.child.length; i++) {
				queue.enqueue({
					node: current.child[i],
					depth: depth
				})
			}

			let next = queue.dequeue()
			if (next) {
				current = next.node
				depth = next.depth
			} else {
				current = next
			}
		}
	}

	add (id, parentId, data) {
		let node = new Node(id, data)
		let parent = null
		this.traverseBF((eachNode, depth) => {
			if (eachNode.id === parentId) {
				parent = eachNode
				node.depth = depth
			}
		})

		if (parent !== null) {
			parent.child.push(node)
			node.parent = parent
			return node
		} else {
			console.log(this)
			throw new Error('Cannot add node to a non-existent parent. [' + id + ' -> ' + parentId + ']')
		}
	}
}

export default Tree;