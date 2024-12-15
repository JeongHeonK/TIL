### Factory Pattern

그 유명한 패턴

```ts
abstract class Car {
  constructor(public model: string, public productionYear: number) {}

  abstract displayCarInfo(): void;
}

class Sedan extends Car {
  displayCarInfo(): void {
    console.log("Sedan, model: " + this.model + "year :" + this.productionYear);
  }
}
class SUV extends Car {
  displayCarInfo(): void {
    console.log("SUV, model: " + this.model + "year :" + this.productionYear);
  }
}
class Hatchback extends Car {
  displayCarInfo(): void {
    console.log(
      "Hatchback, model: " + this.model + "year :" + this.productionYear
    );
  }
}

class CarFactory {
  public createCar(
    type: "sedan" | "suv" | "hatchback",
    model: string,
    productionYear: number
  ): Car {
    switch (type) {
      case "sedan":
        return new Sedan(model, productionYear);
      case "suv":
        return new SUV(model, productionYear);
      case "hatchback":
        return new Hatchback(model, productionYear);
      default:
        throw new Error("Invalid car type");
    }
  }
}

const carFactory = new CarFactory();

const sedan = carFactory.createCar("sedan", "멋진차", 3333);
```

---

#### 실습

```ts
abstract class PaymentProcessor {
  constructor(public amount: number) {}

  abstract processPayment(): void;
}

class PaypalProcessor extends PaymentProcessor {
  processPayment(): void {
    console.log(`Paypal: ${this.amount}`);
  }
}

class BankTransferProcessor extends PaymentProcessor {
  processPayment(): void {
    console.log(`BankTransfer: ${this.amount}`);
  }
}

class CreditCardProcessor extends PaymentProcessor {
  processPayment(): void {
    console.log(`CreditCard: ${this.amount}`);
  }
}

class PaymentProcessorFactory {
  public createProcessor(
    type: "paypal" | "bank" | "creditCard",
    amount: number
  ) {
    switch (type) {
      case "paypal":
        return new PaypalProcessor(amount);
      case "bank":
        return new BankTransferProcessor(amount);
      case "creditCard":
        return new CreditCardProcessor(amount);
      default:
        throw new Error("improper type provided");
    }
  }
}
```

- 중요한 점은 class를 **런타임**에서 결정해할 때 사용한다.

그리고 jwt로 토킅관리할때, header보낼때, 항상 직접 쓰거나 복사했었는데.

```ts
class HeaderFactory {
  static createHeaders(authToken: string): Record<string, string> {
    return {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };
  }
}

const headers = HeaderFactory.createHeaders("my-token");
console.log(headers);
// { Authorization: "Bearer my-token", "Content-Type": "application/json" }

const response = await fetch(url, {
  headers,
});
```

아 이렇게 쓸걸.

조만간 고해성사 리팩토링 프로젝트라도 해야겠다.

---

#### 장점

- 클래스간 의존성을 낮춤
- 새로운 클래스가 추가된다면, 클래스를 생성하고 switch문에 추가하면 됨.
- 근데 ocp는 위반아닌가..

#### 단점

- 클래스를 만들기 위해서 항상 `factory` 클래스를 생성해야함.
- return 값의 타입이 `union type`임. 불분명함.
- 생성 타입이 많아질 수록 코드가 복잡해짐 -> switch 문에서 다뤄야 하는 케이스가 증가함

---

#### 참고

[interface&abstract](./interface&abstact.md)
