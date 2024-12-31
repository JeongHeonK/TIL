interface ServerRequest {
  handle(request: string): void;
}

class BaseServer implements ServerRequest {
  public handle(request: string): void {
    console.log(`request: ${request}`);
  }
}

abstract class ServerRequestDecorator implements ServerRequest {
  constructor(protected serverRequest: ServerRequest) {}
  abstract handle(request: string): void;
}

class LoggingMiddleware extends ServerRequestDecorator {
  public handle(request: string): void {
    console.log(request + "with");
    this.serverRequest.handle("base server");
  }
}

class AuthMiddleware extends ServerRequestDecorator {
  public handle(request: string): void {
    console.log(request + "with");
    this.serverRequest.handle("base server");
  }
}

// client

let baseServer = new BaseServer();
baseServer.handle("base");

baseServer = new LoggingMiddleware(baseServer);
baseServer.handle("logging");

baseServer = new AuthMiddleware(baseServer);
baseServer.handle("auth");
