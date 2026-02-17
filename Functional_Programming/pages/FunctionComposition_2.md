### 함수형 프로그래밍 문제점

1. 함수를 인수로 전달하기 때문에 오른쪽에서 왼쪽으로 읽어야 한다. -> 가독성 저하

```js
const trim = (str) => str.replace(/^\s*|\s*$/g, "");

const noPunct = (str) => str.replace(/[?.,!]/g, "");

const capitalize = (str) => str.toUpperCase();

const breakout = (str) => str.split(" ");

const noArticles = (str) => str !== "A" && str !== "AN" && str !== "THE";

const filterArticles = (arr) => arr.filter(noArticles);

console.log(filterArticles(breakout(capitalize(noPunct(trim(someString))))));
// ?????
```

가독성 향상을 위해 Pipe 함수를 사용.

```js
const compose = function (...fns) {
  return (x) => fns.reduceRight((v, f) => f(v), x);
};

const prepareString = compose(filterArticles,, breakout, capitalize, noPunct, trim);

const result = prepareString(someString);

console.log(result);
```

reduceRight의 3개월 전쯤, 리액트 훅을 통한 마이크로 상태관리에서 배운것을 토대로 `Provider`컴포넌트들로 중첩되기 시작하는 변수를 정리할 때 사용했었다.

```jsx
<QueryProviders>
  {providers.reduceRight((child, Component) => {
    return createElement(Component, null, child);
  }, children)}
  <DevTools />
</QueryProviders>
```

DevTools의 위치와 QueryProviders의 부작용때문에 이렇게 만들었는데 차라리 좀더 가독성 좋게

```jsx
interface Props {
  children: ReactNode;
  Components: ReactNode[];
}

const CustomQueryProvider = ({ children, Components }) => {
  return (
    <QueryProviders>
      {Components.reduceRight((child, Component) => {
        return createElement(Component, null, child);
      }, children)}
      <DevTools />
    </QueryProviders>
  );
};

// 사용

{
  <CustomQueryProvider
    Components={[SessionProvider, ToastProvider, CountProvider, GNB]}
  >
    {children}
  </CustomQueryProvider>;
}
```

지금이라면 이렇게 사용해서 최상단에서 QueryProvider가 감싸고 그 내부에 이런 순서로 Custom Provider들이 전달된다고 표현해서 의도를 명확히 했을 것 같다.

공부하면 공부할수록 모르는게 많은 듯 하다.

하여튼 reduce는 값을 하나로 줄인다는 방법이 함수를 계속 실행해서 그 결과를 Accumulator에 저장하는 방법으로도 사용하는 것을 배웠다.
예전에 reduce가 정말 강력한 함수라는 글을 보고 넘긴적이 있는데 이제 조금 이유를 알 것 같다.

---

### 실습

```js
type Func<T = any, R = any> = (arg: T) => R;

const pipe = <T extends number[], R extends number>(
  ...fns: Func<any, any>[]
) => {
  return (x: T): R => fns.reduce((v, fn) => fn(v), x as any);
};

const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

const bootSingleScores = <T extends number>(arr: T[]) =>
  arr.map((val: T) => (val < 10 ? val * 10 : val));

const rmOverScores = <T extends number>(arr: T[]) =>
  arr.filter((val) => {
    if (val <= 100) return true;
    return false;
  });

const rmZeroScores = <T extends number>(arr: T[]) =>
  arr.filter((val) => val > 0);

const scoresSum = <T extends number>(arr: T[]) =>
  arr.reduce((sum, val) => sum + val, 0);

const scoresCnt = <T extends number>(arr: T[]) =>
  arr.reduce((cnt) => cnt + 1, 0);

const getAverage = <T extends number>(arr: T[]) => scoresSum(arr) / arr.length;

const rmBothHighLow = pipe(rmZeroScores, rmOverScores);

const getTotalSum = pipe(bootSingleScores, rmBothHighLow, scoresSum);

const sum = getTotalSum(scores);

const average = pipe(bootSingleScores, rmBothHighLow, getAverage)(scores);
```

---

> 참고: [JS Review - compose](../../JS_review/FP/compose.md)
