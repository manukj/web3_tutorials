const TrieNode = require("./TrieNode");

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }
  insert(word) {
    console.log(word);
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
      }
      node = node.children[word[i]];
      if (i == word.length - 1) {
        node.isWord = true;
      }
    }
  }

  contains(word, node = this.root) {
    var char = word.charAt(0);
    if (!node.children[char]) {
      return false;
    }
    if (word.length === 1) {
      return node.children[char].isWord;
    }
    return this.contains(word.substring(1), node.children[char]);
  }
}

module.exports = Trie;
