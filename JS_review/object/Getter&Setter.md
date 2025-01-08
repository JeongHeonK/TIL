### Getter & Setter

```js
class Circle {
  constructor(radius) {
    this._radius = radius;
    // 직접 접근해서 변경하지 말라는 의도를 명시
  }

  get radius() {
    return this._radius;
  }
  // Underscore말고 이걸 사용해라

  get diameter() {
    return this._radius * 2;
  }
}

const circle = new Circle(4);

console.log(circle.diameter); // 8
console.log(circle.diameter()); // not a function error
```

```js
class Circle {
  constructor(radius) {
    this._radius = radius;
    // 직접 접근해서 변경하지 말라는 의도를 명시
  }

  get radius() {
    return this._radius;
  }
  // Underscore말고 이걸 사용해라

  set radius(radius) {
    if (radius < 0) throw new Error("음수 안됨");
    this._radius = radius;
  }
}

const circle = new Circle(4);

console.log(circle.radius); // 4
circle.radius = -1; // Error "음수 안됨"
```

- 클래스 프로퍼티의 변경을 방지할 수 있음.
- 함수로 정의하지만 동작은 마치 property처럼 함.
- 기존 프로퍼티를 통해 새로운 프로퍼티도 생성할 수 있음.
