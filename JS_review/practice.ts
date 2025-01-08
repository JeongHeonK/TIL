class Graph {
  constructor(protected node: any) {}

  DFSR(start) {
    const result: any[] = [];
    const visited = {};

    (function dfs(vertex) {
      if (!vertex) return;

      visited[vertex] = true;
      result.push(vertex);
      this.adjacencyList[vertex].forEach((elem) => {
        if (!visited[elem]) {
          dfs(elem);
        }
      });
    })(start);

    return result;
  }
}
