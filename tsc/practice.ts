type Space = " " | "\n" | "\t";

type Trim<T extends string> = T extends
  | `${Space}${infer R}`
  | `${infer R}${Space}`
  ? Trim<R>
  : T;

type trimmed = Trim<"  Hello World  ">; // expected to be 'Hello World'
