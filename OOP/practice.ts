class Grinder {
  public grindBeans(): void {
    console.log("Grinding beans...");
  }
}

class Boiler {
  public boilWater(): void {
    console.log("Boiling water..");
  }
}

class Brewer {
  public brewCoffee(): void {
    console.log("Brewing Coffee...");
  }
}

class CoffeeMakerFacade {
  constructor(
    private grinder: Grinder,
    private boiler: Boiler,
    private brewer: Brewer
  ) {}

  public makeCoffee() {
    this.grinder.grindBeans();
    this.boiler.boilWater();
    this.brewer.brewCoffee();
    console.log("coffee is ready");
  }
}

// Client Code

const coffeeMaker = new CoffeeMakerFacade(
  new Grinder(),
  new Boiler(),
  new Brewer()
);

coffeeMaker.makeCoffee();

/**
 * "Grinding beans..."
 * "Boiling water.."
 * "Brewing Coffee..."
 * "coffee is ready"
 */
