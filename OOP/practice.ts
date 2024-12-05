// regular - 10%, 1
// premium - 20%, 2
// 추가: Gold - 30%, 3

interface Customer {
  giveDiscount(): number;
  addLoyaltyPoints(amountSpent: number): number;
}

class RegularCustomer implements Customer {
  giveDiscount(): number {
    return 10;
  }

  addLoyaltyPoints(amountSpent: number): number {
    return amountSpent;
  }
}

class PremiumCustomer implements Customer {
  giveDiscount(): number {
    return 20;
  }

  addLoyaltyPoints(amountSpent: number): number {
    return amountSpent * 2;
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

// 추가 가능

class GoldCustomer implements Customer {
  giveDiscount(): number {
    return 30;
  }

  addLoyaltyPoints(amountSpent: number): number {
    return amountSpent * 3;
  }
}

let goldCustomer = new GoldCustomer();
discount.giveDiscount(goldCustomer); // 30
