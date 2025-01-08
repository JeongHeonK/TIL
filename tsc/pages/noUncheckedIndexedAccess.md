### noUncheckedIndexedAccess

```ts
export const myObj: Record<string, string[]> = {};

myObj.foo.push("bar");
```

이 경우 error가 발생하지 않음.

```json
"noUncheckedIndexedAccess": true;
```

이 옵션을 사용하면 check 가능

```ts
export const myObj: Record<string, string[]> = {};

// foo가 undefined 일 수도 있음
myObj.foo?.push("bar");
```
