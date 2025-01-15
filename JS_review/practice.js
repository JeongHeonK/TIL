class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex2].push(vertex1);
    this.adjacencyList[vertex1].push(vertex2);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  deleteVertex(vertex) {
    if (!this.adjacencyList[vertex]) return;

    while (this.adjacencyList[vertex].length) {
      const current = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, current);
    }

    delete this.adjacencyList[vertex];
  }
}
