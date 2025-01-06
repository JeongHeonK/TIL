### Instance

- 다형성 구현시 사용.
- 비슷한 클래스에 약간의 변형을 줄때(메서드 오버라이드/추가 혹은 property 오버라이드/추가)

```js
class MutatedTri extends Triangle {
  mutate(num) {
    this.a = this.a + num;
    this.b = this.b + num;
  }

  getNum() {
    return `${this.a} and ${this.b}`;
  }
}
```

원리

### 프로토타입 체이닝

1. 자신의 프로퍼티 탐색
2. 없으면 프로토타입 탐색
3. 없으면 부모의 프로토 타입 탐색
4. 이렇게 프로토타입을 쭉 탐색해가며 올라감
5. 찾지못하면 `undefined` 여기서 undefined를 실행하려해서 다음과 같은 에러 발생
   `TypeError: undefined is not a function`

#### `super()`

- 기본 `constructor`수정시 `super()`키워드 호출 필요
- 그럼 superset의 컨스트럭터가 호출됨

```js
class MutatedTri extends Triangle {
  constructor(a, b, color) {
    super(a, b);
    this.color = color;
  }

  mutate(num) {
    this.a = this.a + num;
    this.b = this.b + num;
  }
}
```

#### Static

- 생성자 함수에서 직접 사용되는 속성
- 상속되지 않음

```js
class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static species = "short tail";

  static meow() {
    return "meow";
  }
}

const smallCat = new Cat();
console.log(Cat.species); // "short tail"
console.log(Cat.meow()); // "meow"
consol.log(smallCat.species); // undefined
console.log(smallCat.meow()); // TypeError: undefined is not a function
```

---

#### this 중요

- class에서 this는 생성될 `instance`를 가리킨다.
- 그러나 static method에서 호출할 경우 class 자체를 가리킨다.
- 다른 객체지향 언어에서는 static 메서드는 class 자체에 접근할 수 없다.
- 그래서 `class method`와 `static method`를 구분한다.

---

#### static은 언제 쓰는가?

- static으로만 구성된 class를 만들어 함수들을 정리하고 구조화할 때
- instance를 관리하는 메서드이나 상속이 필여없는 함수를 만들 때(factory function)
