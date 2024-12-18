class Amplifier {
  public turnOn(): void {
    console.log("Amplifier turned On");
  }

  public setVolume(level: number): void {
    console.log(`now volume level is ${level}`);
  }
}

class DvdPlayer {
  public turnOn(): void {
    console.log("DvdPlayer Turned on");
  }

  public play(movie: string): void {
    console.log(`${movie} is playing`);
  }
}

class Projector {
  public turnOn(): void {
    console.log(`Project turned on`);
  }

  public setInput(dvdPlayer: DvdPlayer): void {
    console.log("Dvd Player is connected");
  }
}

class Lights {
  public dim(level: number): void {
    console.log(`Light level is ${level}`);
  }
}

class HomeTheaterFacade {
  constructor(
    private amplifier: Amplifier,
    private dvdPlayer: DvdPlayer,
    private projector: Projector,
    private light: Lights
  ) {}

  watchMovie(movie: string, volume: number, level: number): void {
    this.light.dim(level);
    this.amplifier.turnOn();
    this.amplifier.setVolume(volume);
    this.dvdPlayer.turnOn();
    this.projector.turnOn();
    this.projector.setInput(this.dvdPlayer);
    this.dvdPlayer.play(movie);
  }
}

let homeTheater = new HomeTheaterFacade(
  new Amplifier(),
  new DvdPlayer(),
  new Projector(),
  new Lights()
);

homeTheater.watchMovie("finding dory", 3, 4);
