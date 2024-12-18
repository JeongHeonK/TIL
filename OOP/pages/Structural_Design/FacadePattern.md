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

#### 특징

1. 하위 시스템과 클래스간의 강한 결합도
2. 독립된 클래스와 동작의 조합을 통한 복잡한 시스템
3. 내부 동작 코드를 숨길 수 있음.

---

#### 실습

```ts
class Amplifier {
  public turnOn(): void {
    console.log("Amplifier turned On");
  }

  public setVolume(level: number): void {
    console.log(`now volume level is ${level}`);
  }
}

class DvdPlayer {
  public turnOn(): void {
    console.log("DvdPlayer Turned on");
  }

  public play(movie: string): void {
    console.log(`${movie} is playing`);
  }
}

class Projector {
  public turnOn(): void {
    console.log(`Project turned on`);
  }

  public setInput(dvdPlayer: DvdPlayer): void {
    console.log("Dvd Player is connected");
  }
}

class Lights {
  public dim(level: number): void {
    console.log(`Light level is ${level}`);
  }
}

class HomeTheaterFacade {
  constructor(
    private amplifier: Amplifier,
    private dvdPlayer: DvdPlayer,
    private projector: Projector,
    private light: Lights
  ) {}

  watchMovie(movie: string, volume: number, level: number): void {
    this.light.dim(level);
    this.amplifier.turnOn();
    this.amplifier.setVolume(volume);
    this.dvdPlayer.turnOn();
    this.projector.turnOn();
    this.projector.setInput(this.dvdPlayer);
    this.dvdPlayer.play(movie);
  }
}

let homeTheater = new HomeTheaterFacade(
  new Amplifier(),
  new DvdPlayer(),
  new Projector(),
  new Lights()
);

homeTheater.watchMovie("finding dory", 3, 4);
```

- 아무리 생각해도 함수형과 비슷
- 근데 쓸데없는 제너릭 지정으로 인한 피로도가 없어서 오히려 나은 선택인거 같다.
- 그리고 내부 코드는 절차적 코드라 익숙함.

---

#### 장점

- 복잡한 코드를 method안에 숨김으로써 간단한 InteRface 제공
- 클래스를 생성할 뿐 그 메서드 사용은 facade class 안에서 사용되기에 의존성 감소.
- 유지보수 쉬움

---

#### 단점

- 과도한 추상화의 위험성
- 제한된 확장성과 유연성
- 정보 전달 차단
  - 인수가 어떻게 쓰이는지 client는 알 수 없음.
  - 어떤 메서드로 어떤 순서로 종작하는 지 알 수 없음.

---

#### 사용

- 주문 시스템 (재고, 결제, 배송 시스템)
- 계죄이체(유저 확인, 잔고 확인, 이체, 영수증 시스템)

---

- 함수형이랑 비슷하다. curry를 만든다던지, forEach에서 reduce까지 만들던 경험과 비슷하다.
- 함수형도 결국 베이스가 있었구나.
