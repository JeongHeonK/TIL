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
