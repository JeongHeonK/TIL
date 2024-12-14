### Event Listeners

#### Event Bubbling

- 한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작한다.
- 그리고 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작한다.

#### Event Capturing

- Event Bubbling이전에 발생한다.
- Capturing -> target -> Bubbling 순서
- `onClick` 대신에 `onClickCapture`를 사용하면 된다.
