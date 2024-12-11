### Prototype Pattern

```ts
interface UserDetails {
  name: string;
  age: number;
  email: string;
}

interface Prototype {
  clone(): Prototype;
  getUserDetails(): UserDetails;
}

class ConcretePrototype implements Prototype {
  constructor(private user: UserDetails) {}

  public clone(): Prototype {
    const clone = Object.create(this);
    clone.user = { ...this.user };
    return clone;
  }

  public getUserDetails(): UserDetails {
    return this.user;
  }
}

let user1 = new ConcretePrototype({
  name: "John",
  age: 32,
  email: "john@email.com",
});

let user2 = user1.clone();
```

#### 주 사용

- 객체 생성이 복잡하거나 비용이 많이 드는 경우.
- 기존 객체를 기반으로 유사한 객체를 반복적으로 생성해야 하는 경우.
- 객체 생성 과정이 런타임에 동적으로 결정되는 경우.
- 객체의 생성 로직을 외부에 숨겨야 하는 경우.
- 여러 종류의 객체를 다형적으로 관리해야 하는 경우.
- 리액트에서 current와 workInProgress를 만들때 이 패턴 사용.

#### Prototype 패턴을 사용하지 않아도 되는 경우

- 객체가 단순하며 생성 비용이 크지 않은 경우.
- 객체 생성 로직이 명확하고 생성자를 사용하는 것이 더 직관적인 경우.
- 복제가 필요하지 않고, 생성 시 객체를 독립적으로 설정할 수 있는 경우.

---

#### 실습

```ts
abstract class Shape {
  constructor(public properties: ShapeProperties) {}

  abstract clone(): Shape;
}

class Rectangle extends Shape {
  constructor(
    properties: ShapeProperties,
    public width: number,
    public height: number
  ) {
    super(properties);
  }

  public clone(): Shape {
    const clonedProperties: ShapeProperties = {
      color: this.properties.color,
      x: this.properties.x,
      y: this.properties.y,
    };

    return new Rectangle(clonedProperties, this.width, this.height);
  }
}

class Circle extends Shape {
  constructor(properties: ShapeProperties, public radius: number) {
    super(properties);
  }

  clone(): Shape {
    const clonedProperties: ShapeProperties = {
      color: this.properties.color,
      x: this.properties.x,
      y: this.properties.y,
    };

    return new Circle(clonedProperties, this.radius);
  }
}

const redRectangle = new Rectangle({ color: "red", x: 10, y: 20 }, 20, 20);
const anotherRectangle = redRectangle.clone();
anotherRectangle.properties.color = "blue";
```

- 비슷한 객체를 만들어서 속성 1~2개만 바꿀 때 유용할 것 같다.
- 문제는 이럴거면 그냥 class로 여러 객체 만들어도 될거 같은데

---

#### Prototype pattern 주의점

- 얕은 복사만 가능, 만약 깊은 복사를 구현한다면 코드 복잡성 증가
- `JSON.parse(JSON.stringify(targe))`만으로도 깊은 복사 가능.

#### 실제 사용 예시

- Graphics Editors: 복잡한 객체를 복사할 때
- Game Development: 유사한 유닛이나 물체를 효율적으로 복사할 때
- Data Processing Pipeline: immutable 구현. 기존 데이터를 유지하면서 가공된 데이터를 Return 할때.

그냥 복사해서 수정하는 것이 아니라 복사할 때, 로직을 추가해서 비슷하지만 약간 다른 객체를 `clone()`으로 만들어 낼때 사용
