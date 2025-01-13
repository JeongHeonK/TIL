const person = {
  name: "some",
  city: "somewhere",
  sayName() {
    return this.name;
  },
};

const pName = person.sayName;
console.log(pName());

class Person {
  constructor(name) {
    this.firstName = name;
  }

  sayPersonName() {
    return this.firstName;
  }
}

const p = new Person("him");
const sayPName = p.sayPersonName;

console.log(sayPName());
