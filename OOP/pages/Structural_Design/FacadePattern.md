### Facade Pattern

복잡한 내부 method들을 감싸서 하나의 interface로 통합한다.

```ts
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
```

---

#### 장점

1. 하위 시스템과 클래스간의 강한 결합도
2. 독립된 클래스와 동작의 조합을 통한 복잡한 시스템
3. 내부 동작 코드를 숨길 수 있음.

---

- 함수형이랑 비슷하다. curry를 만든다던지, forEach에서 reduce까지 만들던 경험과 비슷하다.
- 함수형도 결국 베이스가 있었구나.
