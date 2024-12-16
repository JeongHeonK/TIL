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
