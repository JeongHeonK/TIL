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
// myAccount.balance = 20;

myAccount.deposit(100);
myAccount.deposit(100000);
