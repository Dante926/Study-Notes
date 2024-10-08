class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    _getNode(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('越界');
        }
        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    add(index, element) {
        if (arguments.length === 1) {
            element = index;
            index = this.size;
        }
        if (index < 0 || index > this.size) return false;
        if (index === 0) {
            let head = this.head;
            this.head = new Node(element, head);
        } else {
            let prevNode = this._getNode(index - 1);
            prevNode.next = new Node(element, prevNode.next);
        }
        this.size++;
    }

    remove(index) {
        let rmNode = null;
        // if (index < 0 || index >= this.size) return false;
        if (index === 0) {
            rmNode = this.head;
            if (!rmNode) {
                return undefined;
            }
            this.head = rmNode.next;
        } else {
            let prevNode = this._getNode(index - 1);
            rmNode = prevNode.next;
            prevNode.next = rmNode.next;
        }
        this.size--;
        return rmNode
    }

    set(index, element) {
        let node = this._getNode(index);
        node.element = element;
    }

    get(index) {
        return this._getNode(index);
    }

    clear() {
        this.head = null;
        this.size = 0;
    }
    toString() {
        let current = this.head;
        let result = '';
        while (current) {
            result += current.element + (current.next ? ' -> ' : '');
            current = current.next;
        }
        return result || 'Empty List';
    }
}

class Queue {
    constructor() {
        this.LinkedList = new LinkedList();
    }
    enQueue(data) {
        this.LinkedList.add(data);
    }
    deQueue() {
        return this.LinkedList.remove(0);
    }
}

module.exports = Queue;