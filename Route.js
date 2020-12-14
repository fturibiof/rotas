class Node {

    constructor(x) {
        this.x = x;
        this.edges = [];
    }

    addEdge(e) {
        this.edges.push(e);
    }

}

class Edge {

    constructor(from, to, value) {
        this.from = from;
        this.to = to;
        this.value = value;
    }

}

module.exports = { Node, Edge };