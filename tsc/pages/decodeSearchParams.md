### Decode Search params with TS

- [ts-toolbelt 라이브러리](https://github.com/millsp/ts-toolbelt?tab=readme-ov-file)
- js의 Lodash와 비슷한 ts라이브러리

```js
import { String, Union } from "ts-toolbelt";

const query = "/home?a=wonderful&b=wow";

type Query = typeof query;

type SecondQueryPart = String.Split<MediaQueryList, "?">[1];

type QueryElements = String.Split<SecondQueryPart, "&">;

type QueryParams = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.split<QueryElement, "=">[0]]: String.Split<
      QueryElement,
      "="
    >[1];
  };
}[QueryElements[number]];


type Result = Union.merge<QueryParams>  // {a: "wonderful", b: "wow}
```

알아야 할점.

- toolbelt사용하면, js method 사용하듯이 type을 나눌 수 있음
- 거기서 객체에 키르를 사용하듯이 넣을 경우 자동으로 순회하면서 union 타입으로 만들어줌

```js
type QueryParams = { "a=wonderful": {a: "wonderful"} "b=wow" : {b: "wow"}}[QueryElement]
```

- 내 프로젝트에 사용해야 겠다.
