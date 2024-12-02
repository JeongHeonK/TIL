### Encapsulation

- 관심사 분리와 데이터 은닉
- 외부에서 내부의 코드(state)에 접근해서 수정하는 것을 막음.
- 대신 getter method나 setter method를 제공함.

```ts
// BankAccount
// Depositing
// Withdrawing
// Balance - hidden - encapsulated

class BankAccount {
  private _balance: number;

  constructor(initialBalance: number) {
    this._balance = initialBalance;
  }

  // Getter to get balance of the bank account
  // 이렇게 Getter method를 만들면, this.balance는 read-only 속성을 가지게 된다.
  public get balance(): number {
    return this._balance;
  }

  // Method Deposit Money
  public deposit(amount: number): void {
    if (amount < 0) throw new Error("Invalid deposit Amount");

    this._balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount < 0) throw new Error("Invalid deposit Amount");

    if (this._balance < amount) throw new Error("Insufficient Funds");

    this._balance -= amount;
  }
}

const myAccount = new BankAccount(1000);

// 에러 발생
myAccount.balance = 20;

myAccount.deposit(100);
myAccount.deposit(100000);
```

Encapsulation 예시

```ts
const now = new Date();

now.getFullYear();
now.getMonth();
now.getDate();
```

- JS는 UNIX Epoch Time을 기반으로 계산해서 사용한다.
- 그러나 이렇게 캡슐화 및 추상화를 할 경우 이런 사실을 몰라도 낸다.
- Method 내에서 처리될 뿐, 알 필요 없다.
- 그리고 Epoch Time을 우리가 수정할 수 없다.

---

- 근데 method로 내부값을 변경을 하면, 초기값은 어디서 확인할 수 있는 걸까?
- 그래서 함수형 프로그래밍이 나온건가 싶다.
- 아니면 initialState 객체를 만들어서 Constructor에 넣어야 하는 듯 하다.
- 차라리 oop를 공부하고 함수형을 했다면, 처음느꼈던 그 난해함이 좀 덜하지 않았을까 싶다.
