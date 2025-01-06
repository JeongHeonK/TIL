### Class

```js
class Triangle {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  getArea() {
    return (this.a * this.b) / 2;
  }

  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
}

const tri = new Triangle(3, 4);

const tri2 = new Triangle(5, 6);
```

tri1과 tri2는 method를 프로토타입 슬롯에서 공유함.

새로 함수를 선언한 것이 아님

그리고 `constructor()`를 사용하면 객체 생성 전에 유효성 검사 가능

```js
class Triangle {
  constructor(a, b) {
    if (!Number.isFinite(a) || a <= 0) throw new Error("Invalid A");
    if (!Number.isFinite(b) || b <= 0) throw new Error("Invalid B");

    this.a = a;
    this.b = b;
  }

  // .. 생략
}
```

**_참고_**

- `isFinite()`는 형변환을 발생시키나, `Number.isFinite()`는 형변환을 발생시키지 않는다.

---

#### 실습

```js
class BankAccount {
  constructor(
    public balance: number = 0,
    public accountHolder: string,
    public accountNumber: number
  ) {
    if (accountNumber < 0) throw new Error("invalid holder number");

    if (accountHolder.trim().length <= 0) throw new Error("invalid holder");

    if (balance < 0) throw new Error("invalid balance");
  }

  deposit(amt: number) {
    if (amt < 0) throw new Error("마이너스 어떻게 입금함?");

    return this.balance + amt;
  }

  withdraw(amt: number) {
    if (this.balance - amt < 0) throw new Error("돈 없어요");

    return `amt withdrew your balance: ${this.balance}`;
  }
}
```
