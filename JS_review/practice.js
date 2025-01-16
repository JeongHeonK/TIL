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
