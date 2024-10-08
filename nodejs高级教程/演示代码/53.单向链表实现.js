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
        if (arguments.length === 1) { // 如果只有一个参数，默认添加到最后
            element = index;
            index = this.size;
        }
        if (index < 0 || index > this.size) return false;
        if (index === 0) { // 添加到头部
            let head = this.head;
            this.head = new Node(element, head);
        } else {
            let prevNode = this._getNode(index - 1);
            prevNode.next = new Node(element, prevNode.next);
        }
        this.size++;
    }

    // 单向链表02
    remove(index) {
        if (index < 0 || index >= this.size) return false;
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let prevNode = this._getNode(index - 1);
            prevNode.next = prevNode.next.next;
        }
        this.size--;
    }

    //03 修改某个元素
    set(index, element) {
        let node = this._getNode(index);
        node.element = element;
    }

    // 03 查询
    get(index) {
        return this._getNode(index);
    }

    // 04 清空
    clear() {
        this.head = null;
        this.size = 0;
    }
    // 输出链表结构
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

const l1 = new LinkedList();
l1.add('node1');
l1.add('node2');
l1.add(1, 'node3');// 
// l1.remove(1); // 移除 'node3'
l1.set(1, 'node3-3')
console.log(l1.get(1));
l1.clear();
console.log(l1.toString());
// console.log(l1.toString()); // 应该输出 "node1 -> node2"