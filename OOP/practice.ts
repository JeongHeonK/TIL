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
