### Dynamic function arguments with GENERICS

```js
const sendEvent = <Type extends Event["type"]>(
  ...args: Extract<Event, { type: Type }> extends { payload: infer TPayload }
    ? [type: Type, payload: TPayload]
    : [type: Type]
) => {};
```

- 여기서 Type은 Event['type'] 중의 하나가 된다.
- 'mouseEvent', 'keyboardEvent'등
- {payload: infer TPayload}
- 타입은 집합을 보는 관점으로 이해해야한다.
- 좀 더 자세할 수록 `subType`이고 제한을 덜 할 수록, `superType`이다.
- 즉 Extract 의 결과값은 보통 `{type: "mouseEvent", payload: "something"}`이고,
- `{ payload: infer TPayload }`의 서브 타입이된다.
