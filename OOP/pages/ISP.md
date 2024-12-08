### Interface Segregation Principle(ISP)

- 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다.
- 불필요한 의존성을 줄여 유지보수성을 높인다.
- 한 인터페이스가 다른 메서드를 여러개 포함(`Machine()` has `print()`, `scan()`, `fax()`)
- `Printer`, `Scanner`, `FaxMachine`인터페이스로 분리

```ts
// ISP

interface Machine {
  print(document: Document): void;
  scan(document: Document): void;
  fax(document: Document): void;
}

class MultiFunctionPrinter implements Machine {
  print(document: Document): void {
    console.log("printing");
  }
  scan(document: Document): void {
    console.log("scanning");
  }
  fax(document: Document): void {
    console.log("sending a fax");
  }
}

// 이 경우 하나의 함수만 필요한 interface를 만들 수 없음. 물론 유틸리타 함수 쓰면 되겠지만..

class PrintMachine implements Pick<Machine, "print"> {
  print(document: Document): void {
    console.log("printing");
  }
}

// 그러나 접근법 자체가 다르다. pick은 확장성을 생각하지 않고 이전에 정의된 타입에서 필요한 타입만 가져와 재정의 할때 사용한다.
//그러나 interface를 분리하는 것은 처음부터 확장성을 고려하면서 나중에 추가될 메서드가 생겨도 문제가 없는것을 전제로 한다.

// 하여튼 분리함.

interface Printer {
  print(document: Document): void;
}

interface Scanner {
  scan(document: Document): void;
}

interface FaxMachine {
  fax(document: Document): void;
}

class MultiFunctionPrinter2 implements Printer, Scanner, FaxMachine {
  print(document: Document): void {
    console.log("printing");
  }
  scan(document: Document): void {
    console.log("scanning");
  }
  fax(document: Document): void {
    console.log("sending a fax");
  }
}

class SimplePrinter implements Printer {
  print(document: Document): void {
    console.log("printttttiiinnggg");
  }
}
```

#### 실습

```ts
// creating Posts
// commenting Posts
// sharing Posts

// Admin, Regular user

interface Post {
  title: string;
  content: string;
}

interface Comment {
  title: string;
  content: string;
}

interface CreatingPosts {
  creatingPost(post: Post): void;
}

interface CommentingPosts {
  commentingPost(comment: Comment): void;
}

interface SharingPosts {
  sharingPosts(post: Post): void;
}

class Admin implements CreatingPosts, CommentingPosts, SharingPosts {
  creatingPost(post: Post): void {
    console.log("creating");
  }

  commentingPost(comment: Comment): void {
    console.log("commenting");
  }

  sharingPosts(post: Post): void {
    console.log("sharing....");
  }
}
class Regular implements CommentingPosts, SharingPosts {
  commentingPost(comment: Comment): void {
    console.log("commenting");
  }

  sharingPosts(post: Post): void {
    console.log("sharing....");
  }
}
```

- 한 인터페이스의 수정이 다른 클래스에 영향을 주지 않는다.
- `implement`는 class의 extends와 달리 다중 상속이 지원된다.
  `class Admin implements CreatingPosts, CommentingPosts, SharingPosts {`
- 이를 통한 캡슐화로 어디서 상속받았는지 추적이 쉽다.
