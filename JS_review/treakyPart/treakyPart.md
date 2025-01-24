### Tricky part

#### Float

```js
0.1 + 0.2;
0.30000000000000004;
0.1 + 0.2 === 0.3;
false;

// wtf
```

- 소수점 사용시, 차라리 라이브러리 사용 권장

#### `BigInt("")`

- 거의 안쓰는거
- 작년 말 퇴출 기능으로 거론 되었던 것

#### NaN

```js
NaN === NaN false
```

NaN은 고유한 값

- isNaN()은 형변환 발생
- Number.isNaN() 형변환 미발생
- 엄격한 검사 실행 (=== 처럼)

#### `--x` || `x--`

호출 시점에서는 값이 다름

```js
let x = 1;

console.log(x++); // 1

console.log(++x); // 3
```

그래서 할당 시, 원치 않은 값이 할당될 위험 존재

```js
let x = 3;

let y = x++;

console.log(x, y); // 4, 3
```

---

#### 자동 Semi-colon 삽입

```js
function test() {
  return;
  {
    name: "test";
  }
}
```

- 이경우 return에 세미콜론이 자동으로 붙음
- `undefine` return
- 하단 코드 미실행
- 근데 name: "test"에는 왜 붙은건가..
- 괄호를 추가해줘야 함

```js
function test() {
  return {
    name: "test",
  };
}
```
