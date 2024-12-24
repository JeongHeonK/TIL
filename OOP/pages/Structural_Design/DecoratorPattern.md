### Decorator Pattern

기존 클래스의 기능을 수정하지 않고도 새로운 기능을 추가.

1. Component
2. ConcreteComponent
3. Decorator
4. ConcreteDecorator

---

#### 연습

```ts
interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 4500;
  }

  description(): string {
    return "Simple Coffee";
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  abstract cost(): number;
  abstract description(): string;
}

class MildDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return this.coffee.cost() + 1000;
  }
  description(): string {
    return "Milk ".concat(this.coffee.description().split(" ")[1]);
  }
}

// client code

let coffee = new SimpleCoffee();
coffee.cost(); // 4500

coffee = new MildDecorator(coffee);
coffee.cost(); // 5500
```
