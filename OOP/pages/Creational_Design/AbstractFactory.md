### Abstract Factory

Abstract Factory는 관련되거나 의존적인 객체들의 가족(군)을 <br />
구체적인 클래스 지정 없이 생성할 수 있는 인터페이스를 제공하는 생성 디자인 패턴입

```ts
interface IProductA {
  operationA(): string;
}

interface IProductB {
  operationB(): string;
  combineOperation(collaborator: IProductA): string;
}

interface IFactory {
  createProductA(): IProductA;
  createProductB(): IProductB;
}

class ProductA implements IProductA {
  public operationA(): string {
    return "This is the result Operation A";
  }
}

class ProductB implements IProductB {
  public operationB(): string {
    return "this is the result of Operation B";
  }

  public combineOperation(collaborator: IProductA): string {
    return "The result of Product B Collaborating with ".concat(
      collaborator.operationA()
    );
  }
}

class Factory implements IFactory {
  public createProductA(): IProductA {
    return new ProductA();
  }
  public createProductB(): IProductB {
    return new ProductB();
  }
}

const factory = new Factory();

const productA = factory.createProductA();

const productB = factory.createProductB();

productB.combineOperation(factory.createProductA());
```

#### 사용

1. 관련 객체들을 그룹화해서 생성해야 할 때

2. 클라이언트 코드에서 객체의 구체적인 클래스에 의존하지 않도록 하고 싶을 때

3. 객체 생성 과정이 복잡하거나, 객체 생성 로직이 여러 곳에서 중복될 위험이 있을 때

ex) <br />

- UI 테마 설정: 다크 모드와 라이트 모드에서 다른 스타일의 컴포넌트를 생성해야 할 때.
- 플랫폼 독립적인 개발: Windows와 MacOS에서 각각 다른 UI를 제공해야 할 때.
- 데이터베이스 드라이버 선택: 서로 다른 데이터베이스(MySQL, PostgreSQL 등)에 따라 서로 다른 연결 객체를 생성할 때.

#### 실습

```ts
interface Button {
  render(): void;
  onClick(f: Function): void;
}

interface Checkbox {
  render(): void;
  toggle(): void;
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(button: Button): Checkbox;
}

class WindowButton implements Button {
  public render(): void {
    console.log("Render a button in Window Style");
  }

  onClick(f: Function): void {
    console.log("window button was clicked");
    f();
  }
}

class WindowCheckbox implements Checkbox {
  constructor(private button: Button) {}

  render(): void {
    console.log("Render a checkbox in Window Style");
  }

  toggle(): void {
    this.button.onClick(() => {
      console.log("Window checkbox toggled");
    });
  }
}

class MacOSButton implements Button {
  public render(): void {
    console.log("Render a button in MacOS Style");
  }

  onClick(f: Function): void {
    console.log("MacOS button was clicked");
    f();
  }
}

class MacOSCheckbox implements Checkbox {
  constructor(private button: Button) {}

  render(): void {
    console.log("Render a checkbox in MacOS Style");
  }

  toggle(): void {
    this.button.onClick(() => {
      console.log("MacOS checkbox toggled");
    });
  }
}

class WindowFactory implements GUIFactory {
  public createButton(): Button {
    return new WindowButton();
  }

  public createCheckbox(button: Button): Checkbox {
    return new WindowCheckbox(button);
  }
}

class MacOSFactory implements GUIFactory {
  public createButton(): Button {
    return new MacOSButton();
  }

  public createCheckbox(button: Button): Checkbox {
    return new MacOSCheckbox(button);
  }
}

function renderUI(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox(button);

  button.render();
  checkbox.render();

  button.onClick(() => {
    console.log("buttons Clicked");
  });
  checkbox.toggle();
}

renderUI(new WindowFactory());
renderUI(new MacOSFactory());
```

- Interface를 사용해서 비슷하지만 다른 로직을 구현할 수 있다.
- 그리고 이걸 factory를 통해서 그룹화 한다.
- 마지막으로 하나의 함수를 만들어 관련된 객체들을 묶을 때 사용한다.

---

#### 장점

- 일관성: Implement를 사용해서 Method내의 코드는 조금 다를지라도 전체적인 구조는 비슷하다.
- 실제 구현 클래스를 사용하지 않는다. 그래서 재사용성과 유연성이 증가한다.
- 단일 책임원칙을 지킬 수 있다.
- OCP 원칙을 따르기 용이하다.

#### 단점

- 보일러 플레이트가 너무 많음.
- 개인적으로 굳이 이렇게 해야하나 싶음.
- superset 하나 변경하면 그에 따른 sub class 코드 모두 수정해야함(특히 method 추가시)
- 클래스간 의존성이 높아 테스트하기 어려움

---
