### Graph DFS

대략적인 수도 코드

```js
function dfs(vertex: object, start: any) {
  const result: any[] = [];
  const seen = {};
  function traverse(vertex: object, start: any) {
    if (!vertex[start]) return;
    seen[start] = true;
    result.push(start);

    vertex[start].forEach((element) => {
      if (!seen[element]) {
        traverse(vertex, element);
      }
    });
  }
  traverse(vertex, start);

  return result;
}
```

- 이제 수도코드를 코드로 작성한다.
- 곧 컴퓨터랑 깊은 대화 가능할 듯

---

#### 정답

```js
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
```

**_참조_**

- 배열의 반복 메서드는 break; 혹은 continue; 동작 안함
- 굳이 중지하고 싶다면 try..catch로 감싼다음 특정 조건에서 error를 발생시킨 후 catch문에서 처리해야함.
- 그럴바에 그냥 for 반복문으로 전환하는게 나음
