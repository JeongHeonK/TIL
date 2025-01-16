### Prototypes

- 객체의 숨김 프로퍼티 `[[Prototype]]`
- null 혹은 다른 객체에 대한 참조
- 다른 객체를 참조하는 경우 참조 대상을 prototype이라 부름
- 엣날에는 `__proto__`를 사용해 지정
- 지금은 `Object.getPrototypeOf` 혹은 `Object.setPrototypeOf` 사용

```js
const animal = {
  eats: true,
};

const rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal;

console.log(rabbit.eats); // true
```

- 프로토타입체인에 의해서 현재 객체에 프로퍼티가 없으면, 프로토 타입을 참조한다.

```js
const animal = {
  eats: true,
  walk() {
    console.log("뚜벅뚜벅");
  },
};

const rabbit = {
  jumps: true,
  __proto__: animal,
};

rabbit.walks(); // 뚜벅뚜벅
```

- 순환참조 불가
- 객체나 null 자료형만 가능, 다른건 무시
- 하나만 존재 가능

---

#### 프로토타입은 **읽기 전용**임

```js
let user = {
  firstName: "john",
  lastName: "Smith",

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  },

  get fullName() {
    return this.firstName.concat(" ", this.lastName);
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName); // john Smith

admin.fullName = "james hogan";

console.log(admin.fullName); // james hogan
console.log(user.fullName); // john Smith
```

- admin의 set함수가 실행됨.
- 그러면서 `admin`의 값을 변경
- 그러나 `user`의 값을 변경하지 않음

---

#### this

- this는 항상 호출 시점에서 결정됨.
- prototype이 되는 객체에 this라고 적더라도 호출한 객체가 this가 됨

```js
const user = {
  name: "user1",
  log() {
    console.log(this);
  },
};

const admin = {
  __proto__: user,
  isAdmin: true,
};

admin.log(); // admin
user.log(); // user
```

---

#### 열거가능한 속성

```js
const user = {
  name: "user1",
  log() {
    console.log(this);
  },
};

const admin = {
  __proto__: user,
  isAdmin: true,
};

for (const key in admin) {
  console.log(key); // idAdmin, name, log
}
```

- 프로토타입 프로퍼티까지 모두 열거됨.
- `Object.hasOwn()`을 사용하거나, `Object.keys()`사용
