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

#### 사용

- 이미 생성된 객체를 변경할 때.
- 상속을 대체하고 런타임에서 수정하고 싶을 때.
- 객체에 기능을 동적으로 추가할 때

---

#### 실습

```ts
interface ServerRequest {
  handle(request: string): void;
}

class BaseServer implements ServerRequest {
  public handle(request: string): void {
    console.log(`request: ${request}`);
  }
}

abstract class ServerRequestDecorator implements ServerRequest {
  constructor(protected serverRequest: ServerRequest) {}
  abstract handle(request: string): void;
}

class LoggingMiddleware extends ServerRequestDecorator {
  public handle(request: string): void {
    console.log(request + "with");
    this.serverRequest.handle("base server");
  }
}

class AuthMiddleware extends ServerRequestDecorator {
  public handle(request: string): void {
    console.log(request + "with");
    this.serverRequest.handle("base server");
  }
}

// client

let baseServer = new BaseServer();
baseServer.handle("base");

baseServer = new LoggingMiddleware(baseServer);
baseServer.handle("logging");

baseServer = new AuthMiddleware(baseServer);
baseServer.handle("auth");
```
