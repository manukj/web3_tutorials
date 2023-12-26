class Tree {
  constructor() {
    this.root = null;
  }

  addNode(node) {
    if (!this.root) {
      this.root = node;
    } else {
      this.addNodeRecursive(this.root, node);
    }
  }

  addNodeRecursive(root, node) {
    if (node.data < root.data) {
      if (root.left === null) {
        root.left = node;
      } else {
        this.addNodeRecursive(root.left, node);
      }
    } else if (node.data > root.data) {
      if (root.right === null) {
        root.right = node;
      } else {
        this.addNodeRecursive(root.right, node);
      }
    }
  }

  hasNode(data) {
    return this.searchNode(this.root, data);
  }

  searchNode(root, data) {
    if (!root) {
      return false;
    }
    if (root.data === data) {
      return true;
    }
    if (root.data > data) {
      return this.searchNode(root.left, data);
    }
    if (root.data < data) {
      return this.searchNode(root.right, data);
    }
  }
}

module.exports = Tree;
