### Graph

- 긴가민가 해서 복습
- 노드들의 연결을 모은 것.
- Vertex: node
- Edge: node 사이의 연결들

---

#### 관계를 저장하는 방법

- Adjacency Matrix

|     | A   | B   | C   | D   | E   | F   |
| --- | --- | --- | --- | --- | --- | --- |
| A   | 0   | 1   | 0   | 0   | 0   | 1   |
| B   | 1   | 0   | 1   | 0   | 0   | 0   |
| C   | 0   | 1   | 0   | 1   | 0   | 0   |
| D   | 0   | 0   | 1   | 0   | 1   | 0   |
| E   | 0   | 0   | 0   | 1   | 0   | 1   |
| F   | 1   | 0   | 0   | 0   | 1   | 0   |

- 많은 공간차지
- 연결 확인 느림
- 특정 연결 찾을 때 빠름 (O(n))

---

- Adjacency List

```js
{
  A: ["B", "F"],
  B: ["A", "C"],
  C: ["C", "E"],
  D: ["C", "E"],
  E: ["D", "F"],
  F: ["E", "A"]
}
```

- 적은 공간 차지
- 연결 확인 시 빠름
- 특정 연결 찾을 때 느림

---

```js
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
```
