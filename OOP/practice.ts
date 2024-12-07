abstract class Shape {
  abstract calculateArea(): number;
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
    // 부모 클래스 Constructor를 불러 초기화
    // Parameter Property 문법.
  }

  calculateArea(): number {
    return this.height * this.width;
  }
}

class Square extends Shape {
  constructor(public side: number) {
    super();
  }

  calculateArea(): number {
    return this.side ** 2;
  }
}

function area(shape: Shape) {
  return shape.calculateArea();
}

let rectangle = new Rectangle(10, 12);
let square = new Square(9);

area(rectangle);
area(square);
