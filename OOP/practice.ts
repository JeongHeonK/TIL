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
