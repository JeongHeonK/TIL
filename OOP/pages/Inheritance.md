### Inheritance

- 이미 알게 모르게 많이 사용해서 익숙한 개념.
- CSS의 폰트 관련 속성같은 것

```ts
class Animal {
  constructor(public name: string) {}

  move(distance: number): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Dog extends Animal {
  constructor(public name: string = "dog") {
    super(name);
  }
}

let myDog = new Dog();
myDog.move(4);
```

연습

```ts
class Product {
  constructor(
    public id: string,
    public price: number,
    public description: string
  ) {
    this.id = id;
    this.price = price;
    this.description = description;
  }

  display(): void {
    const string = "";
    for (const key in this) {
      string.concat(String(this[key]));
    }
    console.log(string);
  }
}

class Book extends Product {
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public author: string,
    public title: string
  ) {
    super(id, price, description);
    this.author = author;
    this.title = title;
  }
}

class Electronic extends Product {
  constructor(
    public id: string,
    public price: number,
    public description: string,
    public brand: string,
    public model: string
  ) {
    super(id, price, description);
    this.brand = brand;
    this.model = model;
  }
}
```
