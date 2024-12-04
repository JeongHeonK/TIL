### Single Responsibility Principle(SRP)

- 구현해야하는 법칙이라기 보다는 원리에 가까움.
- 그러나 유념하면서 프로그래밍하면 유용함.
- 클래스를 분리하기 isolate하기위한 원칙.
- 이러헥 함으로써 의존성을 낮춘다.

```ts
// 잘못된 예시
class User {
  constructor(name: string, email: string) {}

  userAuthentication() {}
}
```

- 보통 User 클래스안에 유저인증 메서드를 같이 넣는다.
- 그러나 User와 인증은 분리되어야 한다.

```ts
class User {
  constructor(name: string, email: string) {}
}

class UserAuthentication {
  constructor(user: User) {}

  authentication(password: string) {
    // implementation logic here
  }
}
```

- User class를 `UserAuthentication`에 주입해서 연결한다.
- 이 경우 다른 User type과도 호환 가능하게 됨.
