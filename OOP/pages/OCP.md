### Open-Close Principle (OCP)

- 확장에는 열려 있어야 하고, 수정에는 닫혀 있어야 한다.
- 기존 코드를 수정하지 않고 새로운 기능을 추가할 수 있게 해야 한다.

```ts
// regular - 10%
// premium - 20%

class Discount {
  giveDiscount(customerType: "premium" | "regular"): number {
    if (customerType === "regular") return 10;

    return 20;
  }
}
```

위 상황에서 Gold type일 경우 30% 할인을 추가하려 할 때

보통은 `giveDiscount()` 수정

#### 실습

```ts
// regular - 10%
// premium - 20%
// 추가: Gold - 30%

interface Customer {
  giveDiscount(): number;
}

class RegularCustomer implements Customer {
  giveDiscount(): number {
    return 10;
  }
}

class PremiumCustomer implements Customer {
  giveDiscount(): number {
    return 20;
  }
}

class Discount {
  giveDiscount(customer: Customer): number {
    return customer.giveDiscount();
  }
}

let premiumCustomer = new PremiumCustomer();
let discount = new Discount();

discount.giveDiscount(premiumCustomer); //20

// 고객 유형 추가

class GoldCustomer implements Customer {
  giveDiscount(): number {
    return 30;
  }
}

let goldCustomer = new GoldCustomer();
discount.giveDiscount(goldCustomer); // 30
```

---

#### 적립 포인트 추가

---

#### 장점

- 버그 찾기 쉬움
- 코드 재사용성 향상
- 새 기능 추가시, 기존 함수 수정하지 않음.

---

- interface를 지금까지 잘못 사용한 것 같다.
- 내부 구현이 어떻든 결과타입을 맞추도록 구현하는 방향으로 써야하는데 react prop타입 혹은 객체 타입 지정하는 식으로 일차원적으로 사용해왔다.

- 지금 프로젝트 리팩토링하면 리팩토링이 아니라 그냥 팩토링일 듯 하다.🫠🥲
