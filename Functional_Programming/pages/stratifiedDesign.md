## 계층형 설계

### 소프트웨어 설계

코드를 만들고, 테스트하고, 유지보수하기 쉬운 프로그래밍 방법을 선택하기 위해 미적(?) 감각을 사용하는 것.
|함수 본문|계층 구조|함수 시그니처|
|:---:|:-----:|:------:|
|길이|화살표 길이|함수명|
|복잡성|응집도|인자 이름|
|구체화 단계|구체화 단계|인잣값|
|함수호출||리턴값|
|프로그래밍 언어의 기능 사용|||

- 조직화
  - 새로운 함수를 어디에 놓을 지 결정
  - 함수를 다른 곳으로 이동
- 구현
  - 구현바꾸기
  - 함수 추출하기
  - 데이터 구조 바꾸기
- 변경
  - 새 코드를 작성할 곳 선택하기
  - 적절한 수준의 구체화 단계 결정하기

---

### 계층형 설계 패턴

1. 직접 구현
2. 추상화 벽
3. 작은 인터페이스
4. 편리한 계층

---

### 연습 문제

```js
function setPriceByName(cart, name, price) {
  const cartCopy = cart.slice();
  for (let i = 0; i < cartCopy.length; i++) {
    if (cartCopy[i].name === name) {
      cartCopy[i] = setPrice(cartCopy[i], price);
    }
  }

  return cartCopy;
}

function indexOfItem(cart, name) {
  for (let i = 0; i < cart.length; i++) {
    if (arrayGet(cart, i) === name) return i;
  }
  return null;
}

function arraySet(array, idx, value) {
  const copy = array.slice();
  copy[idx] = value;

  return copy;
}

function arrayGet(cart, i) {
  const copy = [...cart];
  return copy[i];
}

function setPriceByName(cart, name, price) {
  const idx = indexOfItem(cart, name);
  if (idx) {
    const item = arrayGet(cart, idx);
    cart = arraySet(cart, idx, setPrice(item, price));
  }

  return cart;
}
```
