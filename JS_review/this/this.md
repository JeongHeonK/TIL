### this

```js
const person = {
  name: "some",
  city: "somewhere",
  sayName() {
    return this.name;
  },
};
```

여기서 this는 person.name을 가리킴

```js
const sayNameOut = person.sayName;

console.log(sayNameOut); // undefined
```

일반함수로 호출 시 this는 전역 객체인 'globalThis'를 호출한다.
그리고 전역 객체에는 name이 따로 할당되어 있지 않기 때문에 `undefined`를 return 한다.

**즉 this는 선언 시점이 아니라 호출시점에서 결정된다.**

#### class로 생성했을 경우.

```js
class Person {
  constructor(name) {
    this.firstName = name;
  }

  sayPersonName() {
    return this.firstName;
  }
}

const p = new Person("him");
const sayPName = p.sayPersonName;

console.log(sayPName());
```

이 경우에는 에러가 발생함.

- class는 ES6때 도입된 기능으로 항상 `Strict Mode`에서 동작한다.
- `Strict Mode`에서는 전역 객체는 힝싱 `undefined`를 return 한다.
- 그렇기 때문에 Undefined의 프로퍼티를 읽으려고 했으므로 에러를 발생시킨다.
