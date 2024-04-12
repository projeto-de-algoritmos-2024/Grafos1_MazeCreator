class Graph {
  constructor() {
		this.adjacencyList = {};
  }

  // Adiciona um nó ao grafo
  addNode(node) {
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = [];
    }
  }

  // Adiciona uma aresta entre dois nós
  addConnection(node1, node2) {
    this.adjacencyList[node1].push(node2);
    this.adjacencyList[node2].push(node1);
  }

  // Remove uma aresta entre dois nós
  removeConnection(node1, node2) {
    this.adjacencyList[node1] = this.adjacencyList[node1].filter(
      (v) => v !== node2
    );
    this.adjacencyList[node2] = this.adjacencyList[node2].filter(
      (v) => v !== node1
    );
  }

  // Procura se existe uma aresta entre dois nós
  searchConnection(node1, node2) {
    let result1 = this.adjacencyList[node1].filter((v) => v === node2);
    let result2 = this.adjacencyList[node2].filter((v) => v === node1);
    if (result1.length > 0 && result2.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // Remove um nó do grafo, ao mesmo tempo que remove suas conexões
  removeNode(node) {
    while (this.adjacencyList[node].length) {
      const adjacentNode = this.adjacencyList[node].pop();
      this.removeConnection(node, adjacentNode);
    }
    delete this.adjacencyList[node];
  }
}

export default Graph;
