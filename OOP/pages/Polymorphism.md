### Polymorphism(다형성)

- OOP의 핵심 개념
- superclass의 객체를 여러 다른 클래스처럼 다룰 수 있게 해준다.

1. Subtype Polymorphism (상속 또는 구현 다형성)
2. Parametric Polymorphism (제네릭으로 알려짐)
3. Ad hoc Polymorphism (함수 오버로딩 또는 연산자 오버로딩으로 알려짐)

```ts
import express, { Request, Response, NextFunction } from "express";

const app = express();

const middleware1 = (req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware 1");
  next();
};

const middleware2 = (req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware 2");
  next();
};

app.use(middleware1);
app.use(middleware2);
```

- middleware를 사용하면서 같은 처리에 대해서 다형성을 줄 수 있다.
- 중간에 어떤 middleware를 사용하느냐예 따라서 전혀 다른 결과를 얻는다.

---

#### advantage

1. Code Reusability
2. interface consistency
3. Robustness: 광범위한 상황을 다룰 수 있음
4. flexibility
5. Scalability(기존 타입을 재사용할 수 있음)
6. Reduced Complexity
7. Enhanced Collaboration: 개발자가 동기적으로 다른 시스템부분도 작업할 수 있음
