### Factory Pattern

그 유명한 패턴

```ts
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
```

---

#### interface vs abstract

- abstract는 constructor가 있음
- 그래서 class에 Implement를 사용할 때마다 코드 반복 필요 없음
- 전달되는 파라미터 타입에 대한 걱정도 필요 없음.
- interface는 상속과 동시에 다형성때문에 method 수정 가능함.
- 그러나 abstract는 강제함.

즉,<br/>
interface는 **구현을 강제**하며, 메서드 수정은 구현체에서만 가능합니다.<br/>
abstract는 **강제와 선택 모두를 포함**하며, 수정(오버라이딩)이 가능합니다.<br/>
