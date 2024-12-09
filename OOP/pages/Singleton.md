### Singleton

- 클래스는 단 하나의 인스턴스만 가진다.
- 그리고 전역 스코프에서 이 인스턴스에 접근 가능한다.
- constructor는 Private method가 됨.
- getInstance() method 존재

```ts
class Singleton {
  private static instance: Singleton;

  private static _value: number;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  set value(value: number) {
    Singleton._value = value;
  }

  get value() {
    return Singleton._value;
  }
}
```

1. 전역 변수 사용할 때.

- data cache, system wide configuration setting 등
- 항상 예상 가능한 값을 가짐.

2. 같은 객체를 계속 초기화를 진행할 때.

---

#### 실습

```ts
// Singleton Logger Class
// log method

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const timestamp = new Date();
    console.log(`[${timestamp.toLocaleString()} - ${message}]`);
  }
}

const logger1 = Logger.getInstance();
logger1.log("This is the first message");

const logger2 = Logger.getInstance();
logger2.log("This is the second message");
```

---

#### 장점

##### 1. 객체의 전역 상태 관리

- 애플리케이션 전체에서 **단일 객체**를 공유하여 전역 상태를 관리할 수 있습니다.
- 전역적으로 접근 가능한 로깅 시스템, 설정 관리, 데이터베이스 연결 등에 적합합니다.

##### 2. 메모리 효율성

- 단 하나의 객체만 생성되므로 **불필요한 메모리 소비**를 방지할 수 있습니다.
- 여러 인스턴스를 생성할 때 발생하는 메모리 낭비를 줄입니다.

##### 3. 일관된 접근성

- 애플리케이션 전체에서 동일한 인스턴스를 사용하여 **일관된 데이터 접근**이 가능합니다.
- 데이터 동기화 문제를 방지할 수 있습니다.

##### 4. 초기화 제어

- 객체 생성 시점을 명확히 제어할 수 있습니다.
- **지연 초기화** 방식으로 필요할 때만 객체를 생성하므로, 애플리케이션 성능을 최적화할 수 있습니다.

##### 5. 코드 간소화 및 유지보수성 향상

- 단일 진입점을 보장하여 코드 구조가 간단해지고 유지보수가 용이합니다.
- 분산된 객체 관리 대신 단일 객체를 참조하므로 디버깅과 확장 작업이 쉬워집니다.

#### 싱글톤 패턴 활용 예

- **로깅 시스템**: 동일한 로그 객체를 통해 로그 메시지를 기록.
- **설정 관리**: 애플리케이션 전역에서 같은 설정을 참조.
- **데이터베이스 연결**: 중복된 연결을 방지하고 단일 커넥션을 공유.
- **캐싱**: 동일한 데이터를 여러 위치에서 참조할 수 있도록 공유 메모리 구현.

---

#### 참조

- `this.instance`가 아닌 `Logger.instance`인 이유
- static으로 선언해서 Logger.instance 로 접근하는 것이 일반적이며, static 임을 명시하기 위해 `Logger.instance`라고 씀.
