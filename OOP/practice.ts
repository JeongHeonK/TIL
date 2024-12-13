abstract class Car {
  constructor(public model: string, public productionYear: number) {}

  abstract displayCarInfo(): void;
}

class Sedan extends Car {
  displayCarInfo(): void {
    console.log("Sedan, model: " + this.model + "year :" + this.productionYear);
  }
}
class SUV extends Car {
  displayCarInfo(): void {
    console.log("SUV, model: " + this.model + "year :" + this.productionYear);
  }
}
class Hatchback extends Car {
  displayCarInfo(): void {
    console.log(
      "Hatchback, model: " + this.model + "year :" + this.productionYear
    );
  }
}

class CarFactory {
  public createCar(
    type: "sedan" | "suv" | "hatchback",
    model: string,
    productionYear: number
  ): Car {
    switch (type) {
      case "sedan":
        return new Sedan(model, productionYear);
      case "suv":
        return new SUV(model, productionYear);
      case "hatchback":
        return new Hatchback(model, productionYear);
      default:
        throw new Error("Invalid car type");
    }
  }
}

const carFactory = new CarFactory();

const sedan = carFactory.createCar("sedan", "멋진차", 3333);
