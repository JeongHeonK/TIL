### OOP

Gof(Gang of four design pattern)

객체 지향을 베이스로 만들어진 디자인 패턴.
소프트웨어 공학에서 가장 많이 사용되는 디자인 패턴으로 목적에 따라

- 생성 패턴 5개
- 구조 패턴 7개
- 행위 패턴 11개

총 23개의 패턴으로 구성된다.

---

### interface

독립되고 관계가 없는 시스템이 접촉하거나 통신이 일어나는 부분
타입만 같다면 어떠한 기기가 연결되는지 신경쓰지 않는다.

type에서도 공통된 타입만 있다면, `implements`를 통해서 연결할 수 있다.
그리고 다른 동작을 수행한다.

- example

```ts
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log("멍멍");
  }
}

class Cat implements Animal {
  constructor(public name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log("냐옹");
  }
}
```
