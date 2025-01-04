### Mixing Data & Functions With Objects

```js
function getTriangleArea(a, b) {
  return (a * b) / 2;
}

function getTriangleHypotenuse(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}
```

그러나 객체를 만들면 하나의 객체안에서 관리할 수 있다.

```js
const myTri = {
  a: 3,
  b: 4,
  getArea() {
    return (this.a * this.b) / 2;
  },
  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  },
};
```

그러나 새로운 삼각형 선언시 불편함.

그리고 함수도 항상 새로 선언하게 되면서 같은 동작을 하는 함수가 계속 생성되어, 불필요한 메모리 낭비가 생김

클래스로 만들면 동적으로 생성 가능

```js
class Triangle{
  constructor(public a: number, public b: number){}

  public getArea() {
    return (this.a * this.b) / 2;
  }

  public getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  },
}
```

여기서 선언한 함수는 자동으로 prototype으로 등록되기 때문에 메모리 절감 효과도 있음
