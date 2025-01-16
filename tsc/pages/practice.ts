interface ApiData {
  "maps:longitude": string;
  "maps:latitude": string;
}

type RemovePrefix<T> = T extends `maps:${infer U}` ? U : T;

type RemovePrefixFromObj<T> = {
  [K in keyof T as RemovePrefix<K>]: T[K];
};

type Data = RemovePrefixFromObj<ApiData>;
