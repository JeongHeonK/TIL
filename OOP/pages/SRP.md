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

#### 실사용 예시

```ts
// 잘못된 코드 BlogPost가 너무 많은 책임을 가짐.
// Blog 조작 메서드는 다른 클래스에서 관리되어야 함.
class BlogPost {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  createPost() {}

  updatePost() {}

  deletePost() {}

  displayHTML(targetNode: HTMLElement) {
    const wrapper = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = this.title;

    const content = document.createElement("p");
    content.textContent = this.content;

    wrapper.append(title);
    wrapper.append(content);

    return wrapper;
  }
}
```

내가 생각한 분리

- 이정도로 분리해야 하는가...

```ts
class BlogPost {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

class CreatePost {
  post: BlogPost;
  constructor(blogPost: BlogPost) {
    this.post = blogPost;
  }

  create() {}
}

class UpdatePost {
  post: BlogPost;
  constructor(blogPost: BlogPost) {
    this.post = blogPost;
  }

  update() {}
}

class DeletePost {
  post: BlogPost;
  constructor(blogPost: BlogPost) {
    this.post = blogPost;
  }

  delete() {}
}

class DisplayPost {
  post: BlogPost;
  constructor(blogPost: BlogPost) {
    this.post = blogPost;
  }

  displayHTML(targetNode: HTMLElement) {
    const wrapper = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = this.post.title;

    const content = document.createElement("p");
    content.textContent = this.post.content;

    wrapper.append(title);
    wrapper.append(content);

    return wrapper;
  }
}
```

- 지나치게 세분화된 설계는 과도한 복잡성을 초래한다.
- 이 경우 데이터 관리/조작/표시 3가지로 분리한다.

```ts
// 데이터와 관련된 로직
class BlogPost {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

// 블로그 포스트 조작 로직
class BlogPostService {
  create(post: BlogPost) {}

  update(post: BlogPost, updatedData: Partial<BlogPost>) {}

  delete(post: BlogPost) {}
}

// 블로그 포스트 표시 로직
class BlogPostRenderer {
  renderHTML(post: BlogPost, targetNode: HTMLElement) {
    const wrapper = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = post.title;

    const content = document.createElement("p");
    content.textContent = post.content;

    wrapper.append(title, content);
    targetNode.append(wrapper);
  }
}
```

- 쉬운게 없다.

#### 단일 책임 원칙(Single Responsibility Principle, SRP)의 장점

##### 1. 유지보수성 향상

- 클래스가 하나의 책임(또는 변경 이유)만 가지므로 특정 기능이나 요구사항 변경 시 관련된 코드만 수정하면 됩니다.
- 다른 책임과 얽혀 있지 않아 수정 범위가 명확해집니다.

##### 2. 코드 가독성 증가

- 각 클래스가 명확한 역할을 가지므로 코드의 목적과 동작을 이해하기 쉽습니다.
- 역할별로 구분된 클래스를 보면 전체 설계를 빠르게 파악할 수 있습니다.

##### 3. 테스트 용이성

- 클래스가 단일 책임을 가지므로 독립적인 단위 테스트 작성이 가능합니다.
- 테스트 범위가 좁아지고, 문제가 발생했을 때 원인을 빠르게 추적할 수 있습니다.

##### 4. 재사용성 증가

- 클래스가 하나의 역할에 집중하므로 다른 프로젝트나 기능에서 쉽게 재사용할 수 있습니다.
- 불필요한 의존성이 제거되어 유연하게 활용할 수 있습니다.

##### 5. 확장성 향상

- 새로운 기능을 추가하거나 기존 기능을 확장할 때 기존 클래스의 책임을 변경하지 않아도 됩니다.
- SRP를 따른 구조는 확장에 강하고, OCP(Open/Closed Principle)를 준수하기 쉬워집니다.

##### 6. 의존성 관리 용이

- 클래스가 하나의 책임만 가지므로 외부 의존성도 해당 책임과 관련된 것에 국한됩니다.
- 의존성이 줄어들어 코드를 수정하거나 교체할 때 부담이 적어집니다.

단일 책임 원칙은 코드를 **명확하고, 수정과 확장에 강한 구조로 만드는 기반**이 되며, 이를 통해 개발자의 생산성을 높이고 오류 발생 가능성을 줄이는 데 기여합니다.

#### 확장

```ts
class BlogPostJson {
  blogPost: BlogPost;
  constructor(blogPost: BlogPost) {
    this.blogPost = blogPost;
  }

  returnJSON() {
    return JSON.stringify(this.blogPost);
  }
}
```
