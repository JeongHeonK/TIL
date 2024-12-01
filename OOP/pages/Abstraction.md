### Abstraction

```ts
// shapes
// Area, Perimeter
// simple - single function calculateTotalArea

// Interface a Shape

interface Shape {
  area(): number;
  perimeter(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area(): number {
    return this.height * this.width;
  }

  perimeter(): number {
    return 2 * (this.height + this.width);
  }
}

function calculateTotalArea(shape: Shape): number {
  return shape.area();
}

const circle = new Circle(3);
const rectangle = new Rectangle(5, 10);

console.log(calculateTotalArea(circle));
console.log(calculateTotalArea(rectangle));
```

---

- 만약 데이터를 조작할 때, 절차적 프로그래밍이 필요하다면 class에 넣고, 함수형 프로그래밍과 조함해서 사용할 수 있을 것 같다.
- 순수 함수만으로 함수형 프로그래밍은 불가능하고 결국 기존 데이터를 바꾸는 부수효과를 가진 함수가 필요하기 때문이다.
- 어떻게든 억지로 추상화를 해서 사용하기보다는 둘 다 조합해서 사용하면 훨씬 가독성이 좋아질거 같다.

---

예시

1. `Date`

- `new Date().getFullYear()`을 사용할 때 getFullYear에 대한 내부 로직을 숨김.
- 이렇게 해당 메서드들을 추상화해서 사용하기 쉽게 사용자가 내부를 알 수 없게 만드는 것.

2. `typeorm`

```js
import { getRepository } from "typeorm";
import { User } from "./User";

async function getUser() {
  const uerRepository = getRepository(User);
  const user = await uerRepository.findOne({ id: 1 });

  return user;
}

async function createUser() {
  let user = new User();
  user.firstName = "oop";
  user.lastName = "kim";
  user.age = 1000;

  const userRepository = getRepository(User);
  await userRepository.save(user);
}
```

- typeorm에서 가져온 userRepository에서 메서드를 사용하지만 내부에서 어떤 데이터베이스를 사용하는지 알 필요가 없다.
- 단지 필요한 데이터를 전달하고 적합한 메서드를 사용하면 됨

---

#### 추상화 장점

1. 복잡한 디테일을 숨김다
2. 코드 수정이 application에 영향을 끼치지 않는다. 정확한 리턴값만 있다면 내부 수정 가능
3. 클래스 재사용 가능
4. 각각의 객체는 객체의 메서드를 관리해서 모듈화 가능
5. state를 private으로 지정해서 숨길 수 있음(보안)

---

- 함수형 프로그래밍과 비슷함.
- 차이점은 OOP의 경우 객체를 생성해서 그 안에서 변형하는 메서드를 추상화해서 만듬. 객체와 메서드가 모두 한 class에 포함되어 있음.
- 그러나 함수는 데이터는 따로 있고, 불변성을 이용해서 함수에 Input과 Output을 이용해서 변형된 데이터를 생성해 냄(원본 데이터는 유지)
- 그리고 함수의 동작을 하나로 유지하면서 복잡한 동작을 하도록 하기 위해 `pipe()`, `compose()`함수를 이용해서 동작을 조합해서 마치 절차형 프로그래밍처럼 사용함.
