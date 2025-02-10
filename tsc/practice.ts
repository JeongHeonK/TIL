type Replace<
  T extends string,
  From extends string,
  To extends string
> = T extends `${infer R}${From}${infer S}` ? `${R}${To}${S}` : T;

type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'
