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
