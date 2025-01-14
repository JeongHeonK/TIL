### 가중치 그래프 의사코드

#### a to e

<div align="center">
<img src="./가중치 그래프.png" width="400" alt="가중치 그래프" />
</div>

- a에서 가장 가까운 부분을 이동하면서 이전에 방문한 노드를 저장할 배열과 거리를 저장할 거리를 저장할 객체가 필요
- 배열에는 모든 방향을 탐색한 노드만 저장한다.
- 객체 previous에는 작은 값을 가진 이전 방문 노드를 저장한다.
- 거리 객체에는 작은 거리값만 계속해서 저장한다.

```js
const visited = [];

const previous = {
  A: null,
  B: null,
  C: null,
  D: null,
  E: null,
  F: null,
};

const ShortestDist = {
  A: Infinity,
  B: Infinity,
  C: Infinity,
  D: Infinity,
  E: Infinity,
  F: Infinity,
};
```

- 카데인 알고리즘이랑 섞인거 같음.
- 부분의 최소합이 전체의 최소합이다.
- 그래서 각 노드마다 최소한의 거리를 저장하고 업데이트 함.
