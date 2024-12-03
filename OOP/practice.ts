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
