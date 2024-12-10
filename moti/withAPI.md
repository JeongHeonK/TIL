### useSharedValue, cancelAnimation 및 애니메이션 관련 api in reanimated

#### reanimated의 cancelAnimation()

cancelAnimation은 shared value를 전달 받아 해당 애니메이션을 취소한다.

```js
import { cancelAnimation } from "react-native-reanimated";

function App() {
  const offset = useSharedValue(100);

  const handleCancel = () => {
    cancelAnimation(offset);
  };
}
```

그리고 위 예시와 같이 shared values는 `useSharedValue()`를 사용해서 정의 한다.

정의된 `shared value`를 사용할 때는 `offset.value`에 접근하는 방법을 사용한다.

다음 두가지 anti-pattern 에시가 있다.

```jsx
function App() {
  const sv = useSharedValue({ x: 0, y: 0 });

  sv.value.x = 50; // Reanimated loses reactivity 🚨

  sv.value = { x: 50, y: 0 }; // ✅
}

function App() {
  const sv = useSharedValue([1, 2, 3]);

  sv.value.push(1000); // Reanimated loses reactivity 🚨

  sv.value = [...sv.value, 1000]; // works, but creates a new copy ⚠️

  sv.modify((value) => {
    "worklet";
    value.push(1000); // ✅
    return value;
  });
}
```

위 두가지를 보면 값을 변경할 때, 얕은복사를 사용하거나 새로운 참조값을 만든다.

[다음](./motiAnimationProcess.md)
[main](./index.md)

즉, 리액트의 useState와 비슷하게 '값이 변했다'는 가정하에 애니메이션이 동작하는 것을 확인할 수 있다.

문제는 `Moti`라이브러리에서는 useSharedValue로 선언한 값은 `isMount`밖에 없다.

그럼 useSharedValue가 없이 어떻게 스타일을 변경하는 것인가?
