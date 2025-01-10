### Static Initialization Blocks

```jsx
class MyClass {
  static {
    console.log("CLASS IS LOADED");
  }
}
```

- class가 생성될 때 한번 실행됨
- 내부에서 this를 호출하면 클래스 자기 자신을 가리킴

```jsx
class DatabaseConnection {
  static connection;
  static {
    DatabaseConnection.connection =
      process.env.NODE_ENV === "production"
        ? this.loadProductionConnection()
        : this.loadDevelopmentConnection();
  }

  static loadProductionConnection() {}
  static loadDevelopmentConnection() {}
}
```

- 싱글턴 사용할 때 한번 사용할 거 같음
