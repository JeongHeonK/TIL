### new keyword

- 생성자 함수 사용시 사용하는 키워드

```js
function User(name, id) {
  this.name = name;
  this.id = id;
}

const user1 = new User("Some", "some@some.com");
```

- 생성자 함수는 return 을 사용하지 않는다.
- 객체를 생성하기 때문에 return값이 항상 존재하는 것으로 간주
- 여기서 사용되는 this는 빈 객체이다.
- 빈 객체에 프로퍼티를 할당한다.
- 그리고 생성된 객체를 리턴한다.
- 이게 인스턴스

```js
const obj = new Object();
obj.a = 1;

const obj2 = {};
obj2.b = 2;
```

같음, arr도 마찬가지
