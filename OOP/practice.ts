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
