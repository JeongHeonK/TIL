interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 4500;
  }

  description(): string {
    return "simple coffee";
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(private coffee: Coffee) {}
  abstract cost(): number;
  abstract description(): string;
}

class MildDecorator extends CoffeeDecorator {
  cost(): number {
    return 5500;
  }
  description(): string {
    return "milk coffee";
  }
}
