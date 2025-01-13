### 가중치 그래프

```js
class Node {
  constructor(name, weight) {
    this.node = name;
    this.weight = weight;
  }
}

class weightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push(new Node(vertex2, weight));
    this.adjacencyList[vertex2].push(new Node(vertex1, weight));
  }
}
```

- 기존 그래프와 달리 가중치를 추가함.
- 거의 비슷하나 단순히 값만 저장하던 배열에서 객체를 저장하는 차이가 존재
