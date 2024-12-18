### Liskov Substitution Principle(LSP)

- 리스코프 치환 원칙
- 자식 클래스는 언제나 부모 클래스를 대체할 수 있어야 한다.
- 자식 클래스는 부모의 동작을 그대로 유지하며 추가 기능만 제공해야 한다.

```ts
abstract class Shape {
  abstract calculateArea(): number;
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
    // 부모 클래스 Constructor를 불러 초기화
    // Parameter Property 문법.
  }

  calculateArea(): number {
    return this.height * this.width;
  }
}

class Square extends Shape {
  constructor(public side: number) {
    super();
  }

  calculateArea(): number {
    return this.side ** 2;
  }
}

function area(shape: Shape) {
  return shape.calculateArea();
}

let rectangle = new Rectangle(10, 12);
let square = new Square(9);

area(rectangle);
area(square);
```

---

실습

```ts
// Payment Processor
// Credit Card
// Debit Card
// Paypal

abstract class Payment {
  abstract processPayment(amount: number): void;
}

class CreditCard extends Payment {
  processPayment(amount: number): void {
    console.log(`Processing Credit Card Payments - Amount ${amount}`);
  }
}

class DebitCard extends Payment {
  processPayment(amount: number): void {
    console.log(`Processing Debit Card Payments - Amount ${amount}`);
  }
}

class Paypal extends Payment {
  processPayment(amount: number): void {
    console.log(`Processing Paypal Payments - Amount ${amount}`);
  }
}

class Bitcoin extends Payment {
  processPayment(amount: number): void {
    console.log(`Processing Bitcoin Payments - Amount ${amount}`);
  }
}

function executePayments(payment: Payment, amount: number) {
  return payment.processPayment(amount);
}

executePayments(new Paypal(), 1000);
executePayments(new DebitCard(), 3000);
executePayments(new CreditCard(), 9000);
executePayments(new Bitcoin(), 5000);
```
