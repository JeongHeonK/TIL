### class

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return "bark";
  }

  walk() {
    return "walk";
  }
}

const dog1 = new Dog("1");
const dog2 = new Dog("2");

console.log(dog1.bark === dog2.bark); // true
```

- 생성자 함수로 만들경우, 속성을 지정하는 로직과 프로토타입을 지정하는 로직을 분리해서 작성한다.
- 관심사의 분리가 아니라 좀 이상함.
- class를 통해 한곳에서 모두 처리할 수 있다.
- class는 문법접 설탕인가? 질문하면 당연한걸 왜 물어보냐는 듯이 맞다고 대답 가능
