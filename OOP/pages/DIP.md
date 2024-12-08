### Dependency Inversion Principle (DIP)

- 의존성 역전 원칙
- 고수준 모듈은 저수준 모듈에 의존하지 않고 둘 다 추상화에 의존해야 한다.
- 의존성을 낮춰서 더 유연한 인터페이스 구현 가능

```ts
class MySqlDatabase {
  save(data: string): void {}
}

class HighLevelModule {
  constructor(private database: MySqlDatabase) {}

  execute(data: string) {
    this.database.save(data);
  }
}

// 이 경우 데이터베이스를 변경해야한다면 HighLevelModule의 constructor부터 수정들어가야함
```

고수준의 타입을 만들어서 constructor에 할당하는 것만으로도 데이터베이스 교체가 가능해짐.

```ts
interface Idatabase {
  save(data: string): void;
}

class MySqlDatabase implements Idatabase {
  save(data: string): void {
    console.log(`${data} is being saved MySql`);
  }
}

class MongoDBDatabase implements Idatabase {
  save(data: string): void {
    console.log(`${data} is being saved MongoDB`);
  }
}

class HighLevelModule {
  constructor(private database: Idatabase) {}

  execute(data: string) {
    this.database.save(data);
  }
}

const highLevelModule1 = new HighLevelModule(new MongoDBDatabase());
const highLevelModule2 = new HighLevelModule(new MySqlDatabase());

highLevelModule1.execute("data1");
highLevelModule2.execute("data2");
```

예전에 싱글턴으로 전역상태를 구현할 때, 리액트의 생명주기와 맞추기 위해서 zustand를 사용했었다.

여기서 과제가 zustand와의 의존성을 낮추고 다른 전역상태 라이브러리를 쓰더라도 사용가능 하도록 해보는게 목적이었다.

그 당시에는 고차함수로 어떻게 하려고 했었는데, DIP 원칙을 공부하니까

```ts
interface GlobalState {
  get<T>(key: string): T;
  set(key: string, data: string): void;
}

class ZustandStore implements GlobalState {
  get<T>(key: string): T {
    return useStore()[key];
  }
  set(key: string, data: string) {
    useStore()[key](data);
  }
}

class RecoilStore implements GlobalState {
  get<T>(key: string): T {
    return useRecoilValue(key);
  }

  set(key: string, data: string) {
    useSetRecoilState(key)(data);
  }
}

const initialState = {
  id: "123",
  firstName: "John",
  lastName: "Doe",
};

class SingleTone {
  constructor(
    private initialValue: typeof initialState,
    private globalState: GlobalState
  ) {}

  getState(key: string) {
    return this.globalState.get(key);
  }

  save(key: string, data: string) {
    this.globalState.set(key, data);
  }
}

const test = new SingleTone(initialState, new ZustandStore());
test.save("comment", "1111");
test.getState("comment");
```

이렇게 전역상태를 관리하는 클래스를 따로 만들고 interface로 추상화를 통해 새로운 타입을 만들어, constructor로 넘겨줬다면... 좋았을 거 같다.
아니 이랬어야 하는거 같다.

그리고 한 객체에서 너무 많은 책임을 가져가 controller와 state를 관리하는 모든 로직이 함께 있었는데 SRP에 따라 분리할 수 있었을 것 같다.

왜 이걸 생각못했을까?
