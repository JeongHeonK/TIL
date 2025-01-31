type Includes<T extends any[], U> = {
  [Key in T[number]]: true;
}[U] extends true
  ? true
  : false;

type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], 3>; // expected to be `false`
