### Prototype Method

#### Object.create(`object`)

- argument를 프로토타입으로 가진 객체 생성
- 생성자 함수를 통해 상속을 진행할 때 사용

```js
function Vehicle(name, speed) {
  this.name = name;
  this.speed = speed;
}

Vehicle.prototype.run = function () {
  return "run";
};

function LightCar(name, speed) {
  Vehicle.apply(this, arguments);
}

LightCar.prototype = Object.create(Vehicle.prototype);
LightCar.prototype.constructor = LightCar;
```

- 고대 클래스가 없던 시절 이렇게 상속 구현함.
- 에러가 거의 없는 방법이긴 함.
- extend의 존재만으로도 감사해짐.

---

#### Object.getPrototypeOf()

- 프로토 타입이 뭔지 알려줌

---

#### Object.setPrototypeOf(`object`, `prototype`)

- 객체의 프로토타입을 교체해버림.
- 상속을 변경하거나 할때 사용하는 듯.
