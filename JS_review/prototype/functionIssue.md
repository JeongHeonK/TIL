### 생성자 함수 문제점

```js
function Dog(name) {
  this.name = name;
  this.bark = function () {
    return "bark";
  };
  this.walk = function () {
    return "walk";
  };
}

const dog1 = new Dog("1");
const dog2 = new Dog("2");
const dog3 = new Dog("3");

console.log(dog1.bark === dog2.bark); // false
```

- 각각의 생성된 객체마다 개별적으로 함수를 소유함
- 메모리 낭비
