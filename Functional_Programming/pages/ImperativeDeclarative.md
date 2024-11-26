### Imperative vs Declarative

#### Imperative Programming(명령형 프로그래밍)

- 프로그램의 상태에 대한 문장들을 작성하는 스타일
- 절차적 프로그래밍, 객체 지향 프로그래밍등이 있음
- 많은 조건문과 반복문으로 프로세스를 다룸.

#### 예시

```js
(function (fns) {
  let acc = x;

  for (const fn of fns) {
    acc = fn(acc);
  }

  return acc;
})(x);
```

- 반복문 사용
- 각 loop에서 무엇을 해야하는지 명시

#### Declarative Programming(선언형 프로그래밍)

- 원하는 결과를 묘사하는 방식으로 코드 작성
- 어떻게 할지가 아니라 무엇을 할지에 대한 코드 작성
- 목표를 명시하기보다는 알고리즘을 명시함.

#### 예시

```js
(function (fns) {
  return fns.reduce((v, f) => f(v), x);
})(x);
```

위의 예시에서는 굳이 반복을 순회하라는 코드도, 어떻게 저장하는지도 적을 필요가 없다.
