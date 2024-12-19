interface Database {
  connect(): void;
  query(sql: string): void;
  close(): void;
}

class PostqreSQLDatabase implements Database {
  connect(): void {
    console.log("P connected");
  }

  query(sql: string) {
    console.log("execute query " + sql);
  }

  close(): void {
    console.log("P closed");
  }
}

class MongoDBDatabase implements Database {
  connect(): void {
    console.log("M connected");
  }

  query(sql: string) {
    console.log("execute query " + sql);
  }

  close(): void {
    console.log("M closed");
  }
}

abstract class DatabaseService {
  constructor(protected database: Database) {}

  abstract fetchData(query: string): any;
}

class ClientDatabaseService extends DatabaseService {
  fetchData(query: string) {
    this.database.connect();
    this.database.query(query);
    this.database.close();
  }
}

const clientMongoDatabaseService = new ClientDatabaseService(
  new MongoDBDatabase()
);
clientMongoDatabaseService.fetchData("dog");

const clientPostqreDatabaseService = new ClientDatabaseService(
  new PostqreSQLDatabase()
);
clientPostqreDatabaseService.fetchData("dog");
