### Builder Pattern

```ts
interface Builder {
  setPartA(): void;
  setPartB(): void;
  setPartC(): void;
}

class Product {
  private parts: string[] = [];

  public add(part: string): void {
    this.parts.push(part);
  }

  public listParts(): void {
    console.log(`Product Parts: ${this.parts.join(", ")}`);
  }
}

class ConcreteBuilder implements Builder {
  private product!: Product;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product();
  }

  public setPartA(): void {
    this.product.add("PartA");
  }
  public setPartB(): void {
    this.product.add("PartB");
  }
  public setPartC(): void {
    this.product.add("PartC");
  }

  public getProduct(): Product {
    const result = this.product;

    this.reset();

    return result;
  }
}

class Director {
  private builder!: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimumProduct(): void {
    this.builder.setPartA();
  }

  public buildFullProduct(): void {
    this.builder.setPartA();
    this.builder.setPartB();
    this.builder.setPartC();
  }
}

const builder = new ConcreteBuilder();
const director = new Director();

director.setBuilder(builder);

director.buildMinimumProduct();
let minProduct = builder.getProduct();
// ["PartA"]

director.buildFullProduct();
let gullProduct = builder.getProduct();
// ["PartA", "PartB", "PartC"]
```

#### When to use

1. 복잡한 객체 생성: 객체 생성 시 설정해야 할 속성이 많거나 필수/선택 속성이 섞여 있을 때.
2. 불변 객체 생성: 생성 후 수정할 수 없는 객체를 단계별로 설정하고 싶을 때.
3. 가독성 향상: 생성자나 팩토리 메서드로 많은 매개변수를 처리하기 어렵거나 가독성이 떨어질 때.
4. 유연한 설정: 객체의 다양한 변형이나 설정을 쉽게 관리하고 싶을 때.

#### 추가

- 생성해야 할 객체가 하나 있고 여러가지 종류의 객체를 만들어야 할때 사용한다.
- 이 방법이 없을 경우 많은 Argument를 전달해야 했다.

```js
class User {
  constructor(email, phone, location, firstName, lastName, age)
}
```

- 이 경우 순서 전달 문제 및 오타로 인한 실수 가능성이 증가한다.
- 사실 예시가 잘 생각 안난다. 단계별로 객체를 생산해야 하는데, 상위 클래스인 Director를 통해 method들을 한번에 실행시켜 실수를 방지하는 것만 알겠다.
- 일단은 그냥 클래스로 User 생성하는 것이 나아보인다.

---

#### 실습

```ts
interface IUser {
  [key: string]: string | number;
}

class User {
  private user: IUser;

  public setUser(key: string, value: string | number) {
    this.user[key] = value;
  }
}

class ConcreteUserBuilder implements IUserBuilder {
  private user!: User;

  constructor() {
    this.reset();
  }

  public reset() {
    this.user = new User();
  }

  public setFirstName(value: string) {
    this.user.setUser("firstName", value);
    return this;
  }
  public setLastName(value: string) {
    this.user.setUser("lastName", value);
    return this;
  }
  public setAge(value: number) {
    this.user.setUser("age", value);
    return this;
  }
  public setLocation(value: string) {
    this.user.setUser("firstName", value);
    return this;
  }
  public setHobby(value: string) {
    this.user.setUser("hobby", value);
    return this;
  }

  public getUser(): User {
    const result = this.user;
    this.reset();

    return result;
  }
}

interface IUserBuilder {
  setFirstName(value: string): IUserBuilder;
  setLastName(value: string): IUserBuilder;
  setAge(value: number): IUserBuilder;
  setLocation(value: string): IUserBuilder;
  setHobby(value: string): IUserBuilder;
}

class UserDirector {
  private builder: IUserBuilder;

  public setBuilder(builder: IUserBuilder): void {
    this.builder = builder;
  }

  public buildMinUser(user: { firstName: string; lastName: string }): void {
    const { firstName, lastName } = user;
    this.builder.setFirstName(firstName).setLastName(lastName);
  }

  public builderMaxUser(
    firstName: string,
    lastName: string,
    age: number,
    location: string,
    hobby: string
  ) {
    this.builder
      .setFirstName(firstName)
      .setLastName(lastName)
      .setAge(age)
      .setLocation(location)
      .setHobby(hobby);
  }
}

const userDirector = new UserDirector();
const userBuilder = new ConcreteUserBuilder();

userDirector.setBuilder(userBuilder);
userDirector.builderMaxUser("john", "doe", 10000, "nowhere", "cross-fit");

const newUser = userBuilder.getUser();
```

- 개인적으로 만들긴 했지만 아무리 생각해도 그냥 클래스로 만드는게..

---

- director가 builder의 동작을 관리
- builder기 Product라는 객체를 계속 생성
- 새로운 객체를 만드는 것이기 때문에 불변성 구현
- 어렵다..
