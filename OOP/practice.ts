// Singleton Logger Class
// log method

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const timestamp = new Date();
    console.log(`[${timestamp.toLocaleString()} - ${message}]`);
  }
}

const logger1 = Logger.getInstance();
logger1.log("This is the first message");

const logger2 = Logger.getInstance();
logger2.log("This is the second message");

class Application {
  constructor(private logger: Logger) {}

  run(): void {
    this.logger.log("Application is running");
    this.logger.log("Application is shutting down");
  }
}

const app = new Application(Logger.getInstance());
app.run();

// app은 이제 logger와 결합도가 높아짐.
