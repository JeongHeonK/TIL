### SOLID

- `Gang of Four`과 완전히 다르지만, 기초가 되는 패턴
- `Clean Architecture` 한 번 읽어볼 것

#### SOLID 구성

- SRP: Single Responsibility Principle
  - 단일 책임 원칙
  - 하나의 클래스는 하나의 책임만 가진다.
- OCP: Open-Closed Principle
  - 확장에는 열려 있어야 하고, 수정에는 닫혀 있어야 한다.
  - 기존 코드를 수정하지 않고 새로운 기능을 추가할 수 있게 해야 한다.
- LSP: Liskov Substitution Principle
  - 리스코프 치환 원칙
  - 자식 클래스는 언제나 부모 클래스를 대체할 수 있어야 한다.
  - 자식 클래스는 부모의 동작을 그대로 유지하며 추가 기능만 제공해야 한다.
- ISP: Interface Segregation Principle
  - 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다.
  - 불필요한 의존성을 줄여 유지보수성을 높인다.
  - 한 인터페이스가 다른 메서드를 여러개 포함(`Machine()` has `print()`, `scan()`, `fax()`)
  - `Printer`, `Scanner`, `FaxMachine`인터페이스로 분리
- DIP: Dependency Inversion Principle
  - 의존성 역전 원칙
  - 고수준 모듈은 저수준 모듈에 의존하지 않고 둘 다 추상화에 의존해야 한다.
  - 의존성을 낮춰서 더 유연한 인터페이스 구현 가능

#### DIP 예시

```js
// 추상화: 데이터베이스 인터페이스 정의
class Database {
  connect() {}
  query(sql) {}
}

// 저수준 모듈: MySQL 구현
class MySQLDatabase extends Database {
  connect() {
    console.log("MySQL 연결");
  }
  query(sql) {
    console.log(`MySQL 쿼리 실행: ${sql}`);
  }
}

// 고수준 모듈: 데이터베이스 인터페이스에만 의존
class OrderProcessor {
  constructor(database) {
    this.db = database; // 추상화에 의존
  }

  processOrder(orderId) {
    this.db.connect();
    this.db.query(`SELECT * FROM orders WHERE id = ${orderId}`);
  }
}

// 실행
const mySQLDataBase = new MySQLDatabase();
const processor = new OrderProcessor(mySQLDataBase);
processor.processOrder(123);
```
