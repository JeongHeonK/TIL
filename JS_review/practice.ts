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
