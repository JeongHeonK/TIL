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
