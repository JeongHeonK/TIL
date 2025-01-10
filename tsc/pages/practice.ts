class Graph {
  constructor(protected node: any) {}

  DFSW(start) {
    const stack: any[] = [];
    stack.push(start);
    const result: any[] = [];
    const visited = {};

    while (stack.length > 0) {
      const current = stack.pop();
      visited[current] = true;
      this.vertexList[current].forEach((elem) => {
        if (!visited[elem]) {
          stack.push(elem);
        }
      });
    }

    return result;
  }
}
