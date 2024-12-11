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

---

- director가 builder의 동작을 관리
- builder기 Product라는 객체를 계속 생성
- 새로운 객체를 만드는 것이기 때문에 불변성 구현
- 어렵다..
