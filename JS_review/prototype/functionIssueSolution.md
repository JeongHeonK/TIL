### 생성자 함수 문제점 해결

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function () {
  return "bark";
};
Dog.prototype.walk = function () {
  return "walk";
};

const dog1 = new Dog("1");
const dog2 = new Dog("2");
const dog3 = new Dog("3");

console.log(dog1.bark === dog2.bark); // true
```

- 이렇게 수동으로 프로토타입 설정해주면 됨.
- 프로토타입은 객체이기 때문에 객체 프로퍼티 추가하듯이 하면 됨.
- 차라리 class를 사용한다.
