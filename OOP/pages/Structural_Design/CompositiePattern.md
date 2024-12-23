### Composite Design Pattern

객체를 트리 구조로 구성하여 단일 객체와 복합 객체를 동일하게 취급한다.
Component, Leaf, Composite로 구성됨

1. Component: 공통 인터페이스 또는 추상 클래스이다. 이 인터페이스로 Leaf와 Composite객체들이 동일한 방시으로 처리된다.

2. Leaf: 트리의 말단 노드

3. Composite: 하위 요소를 포함하는 복합 객체

```js
interface Employee {
  getName(): string;
  getSalary(): number;
  getRole(): string;
}

class Developer implements Employee {
  constructor(private name: string, private salary: number) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getRole(): string {
    return "Developer";
  }
}
class Designer implements Employee {
  constructor(private name: string, private salary: number) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getRole(): string {
    return "Designer";
  }
}

interface CompositeEmployee extends Employee {
  addEmployee(employee: Employee): void;
  removeEmployee(employee: Employee): void;
  getEmployee(): Employee[];
}

class Manager implements CompositeEmployee {
  constructor(
    private name: string,
    private salary: number,
    private employee: Employee[] = []
  ) {}

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  getRole(): string {
    return "Manager";
  }

  addEmployee(employee: Employee): void {
    this.employee.push(employee);
  }

  removeEmployee(employee: Employee): void {
    // 객체니까 다 다르다고 함.
    // 함수형에서는 객체 비교할 때 간소화를 위해 JSON.stringify 사용
    // 물론 허점이 존재.
    // Lodash의 isEqual 사용하거나 메서드 사용.
    // 그래서 이름으로 비교해서 삭제.
    if (
      !this.employee.some((current) => current.getName() === employee.getName())
    )
      return;

    this.employee = this.employee.filter(
      (current) => current.getName() !== employee.getName()
    );
  }

  getEmployee(): Employee[] {
    return this.employee;
  }
}
```

- 중첩 객체를 생성할 때, 혹은 계층 구조가 필요할 때 사용.

---

#### 실습

```js
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
}

class FileSys implements FileSystemComponent {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }
}

interface CompositeFileSystemComponent extends FileSystemComponent {
  addComponent(component: FileSystemComponent): void;
  removeComponent(component: FileSystemComponent): void;
  getComponents(): FileSystemComponent[];
}

class Folder implements CompositeFileSystemComponent {
  constructor(
    private name: string,
    private components: FileSystemComponent[] = []
  ) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    if (this.components.length === 0) return 0;
    return this.components.reduce(
      (total, component) => component.getSize() + total,
      0
    );
  }

  addComponent(component: FileSystemComponent): void {
    this.components.push(component);
  }

  removeComponent(component: FileSystemComponent): void {
    const targetIdx = this.components.indexOf(component);

    if (targetIdx !== -1) {
      this.components.splice(targetIdx, 1);
    }
  }

  getComponents(): FileSystemComponent[] {
    return this.components;
  }
}

const file1 = new FileSys("알고리즘1", 10);
const file2 = new FileSys("알고리즘2", 20);

const folder1 = new Folder("딱따구리");

folder1.addComponent(file1);
folder1.addComponent(file2);
folder1.getComponents();
folder1.removeComponent(file1);
```

---

- 객체 비교는 위험성이 너무 크다.
- 이래서 아직까지 lodash를 많이 사용하는 구나.
- 지금까지 안 쓰고 만든 내 프로젝트의 신뢰성은 어찌 보장하는가.😇🫠
