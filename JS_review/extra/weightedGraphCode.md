### 가중치 그래프 코드

1. 우선 순위 큐 생성

```js
class PriorityQueue {
  constructor() {
    this.value = [];
  }

  sort() {
    this.value.sort((a, b) => a.priority - b.priority);
  }

  enqueue(val, priority) {
    this.value.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.value.shift();
  }
}
```

- O(N \* log(N))

```js
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    const path = [];
    let smallest;

    for (const vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.unshift(smallest);
          smallest = previous[smallest];
        }
        path.unshift(start);
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (const nextNode of this.adjacencyList[smallest]) {
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
  }
}
```

ㅋㅋㅋㅋㅋㅋ🫠🫠🫠🫠
