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
