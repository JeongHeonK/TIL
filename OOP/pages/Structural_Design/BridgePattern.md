### Bridge Pattern

추상화와 구현을 분리하여 각각 독립적으로 변형할 수 있도록 하는 패턴

- 추상화 클래스는 구현 클래스를 참조
- 구현 클래스는 별도의 계층에서 관리

---

#### 예시

```ts
interface MediaPlayerImplementation {
  playAudio(): void;
  playVideo(): void;
}

class WindowsMediaPlayer implements MediaPlayerImplementation {
  public playAudio(): void {
    console.log("window audio");
  }

  public playVideo(): void {
    console.log("window video");
  }
}

class MacMediaPlayer implements MediaPlayerImplementation {
  public playAudio(): void {
    console.log("Mac audio");
  }

  public playVideo(): void {
    console.log("Mac video");
  }
}

abstract class MediaPlayerAbstraction {
  constructor(protected implementation: MediaPlayerImplementation) {}

  abstract playFile(): void;
}

class AudioPlayer extends MediaPlayerAbstraction {
  public playFile(): void {
    this.implementation.playAudio();
  }
}

class VideoPlayer extends MediaPlayerAbstraction {
  public playFile(): void {
    this.implementation.playVideo();
  }
}

const windowAudioPlayer = new AudioPlayer(new WindowsMediaPlayer());
windowAudioPlayer.playFile();

const macVideoPlayer = new VideoPlayer(new MacMediaPlayer());
macVideoPlayer.playFile();
```

---

#### 사용

- 구현과 추상의 확장 가능성이 중요할때
- 두 계층이 독립적으로 변경될 가능성이 높을때
- 분리함으로써 유지보수성이 증가할 때

---

#### 실습

```ts
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
```
