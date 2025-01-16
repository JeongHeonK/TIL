### Remove Prefix

```ts
interface ApiData {
  "maps:longitude": string;
  "maps:latitude": string;
}

type RemovePrefix<T> = T extends `maps:${infer U}` ? U : T;

type RemovePrefixFromObj<T> = {
  [K in keyof T as RemovePrefix<K>]: T[K];
};

type Data = RemovePrefixFromObj<ApiData>;
```

- 내부에서 다시 타입 캐스팅을 사용하여 유틿타입 추가
- 리터럴 타입과 infer, extends 다 잘 사용해야 함.
