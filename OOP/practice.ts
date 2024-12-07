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

function executePayments(payment: Payment, amount: number) {
  return payment.processPayment(amount);
}

executePayments(new Paypal(), 1000);
executePayments(new DebitCard(), 3000);
executePayments(new CreditCard(), 9000);
