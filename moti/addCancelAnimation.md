### cancel Animation 추가

cancel Animation의 경우

```js
import { cancelAnimation } from "react-native-reanimated";

function App() {
  const offset = useSharedValue(100);

  const handleCancel = () => {
    cancelAnimation(offset);
  };
}
```

이렇게 쓰인다.

Moti에서 제공하는 component에서는 `useSharedValue()`가 사용되지 않으나, Moti에서 제공하는 hook에서는 사용된다.

```js
export default function useAnimationState<V extends Variants<V>>(
  _variants: V,
  {
    from = 'from' as keyof V,
    to = 'to' as keyof V,
  }: UseAnimationStateConfig<V> = {}
) {
  const controller = useRef<UseAnimationState<V>>()
  const __state = useSharedValue<InternalControllerState<V>>(
    from ? _variants[from] : 0
  )
// ...생략

}
```

그래서 `useAnimationState()`를 사용할 때 key로 from을 추가할 것을 권장한다.
초기 스타일이 from이 되기 때문이다.

그리고 다음과 같이 업데이트한다.

```js
useEffect(
  function maybeTransitionOnMount() {
    if (variants.current[to]) {
      if (variants.current[from]) {
        controller.current?.transitionTo(to);
      } else {
        console.error(
          `🐼 [${PackageName}]: Called useAnimationState with a "to" variant, but you are missing a "from" variant. A "from" variant is required if you are using "to". Instead, you passed these variants: "${Object.keys(
            variants.current
          ).join(
            ", "
          )}". If you want to just use the "to" value without "from", you shouldn't use this hook. Instead, just pass your values to a ${PackageName} component's "animate" prop.`
        );
      }
    }
  },
  [from, to]
);
```

from이 있다면 to로 할당한다. 그리고 없으면 error를 던진다.

자유도는 떨어지나 moti의 철학자체가 단순하고 쉽게 애니메이션을 구현하는 것이기 때문에 이렇게 만든듯 한다.

```js
if (controller.current == null) {
  controller.current = {
    __state,
    transitionTo(nextStateOrFunction) {
      const runTransition = (nextStateKey: keyof V) => {
        selectedVariant.current = nextStateKey

        const value = variants.current[nextStateKey]

        if (value) __state.value = value as any
      }

      if (typeof nextStateOrFunction === 'function') {
        // similar to setState, let people compose a function that takes in the current value and returns the next one
        runTransition(nextStateOrFunction(this.current as keyof V))
      } else {
        runTransition(nextStateOrFunction)
      }
    },
    get current(): keyof V {
      return selectedVariant.current
    },
  }
}
```

그리고 위에서 useRef로 선언한 controller에서 animationTo method를 추가한다.

```js
return controller.current as UseAnimationState<V>
```

그리고 마지막에 current를 Return 한다.

근데 그럼..

```js
const animateState = useAnimationState({
  //... 생략
});

const handelCancel = () => {
  cancelAnimation(animateState.__state);
};
```

이렇게 해도 동작했을 듯하다.

하지만 그럼 사용방법만 복잡해지고 사용하기를 원치 않으니 protected 속성을 부여해서 의도를 드러냈을 것이다.

그래서 일단 추가했다.

```js
if (controller.current == null) {
  controller.current = {
    __state,
    transitionTo(nextStateOrFunction) {
      const runTransition = (nextStateKey: keyof V) => {
        selectedVariant.current = nextStateKey

        const value = variants.current[nextStateKey]

        if (value) __state.value = value as any
      }

      if (typeof nextStateOrFunction === 'function') {
        // similar to setState, let people compose a function that takes in the current value and returns the next one
        runTransition(nextStateOrFunction(this.current as keyof V))
      } else {
        runTransition(nextStateOrFunction)
      }
    },
    get current(): keyof V {
      return selectedVariant.current
    },
    cancel() {
      cancelAnimation(__state)
    },
  }
}
```

이렇게 되면

```js
const animationState = useAnimationState({
  from: {
    opacity: 0,
    scale: 0.9,
  },
  to: {
    opacity: 1,
    scale: 1.1,
  },
  expanded: {
    scale: 2,
  },
});

const onPress = () => {
  if (animationState.current === "to") {
    animationState.transitionTo("expanded");
  }
};

const onCancel = () => {
  animationState.cancel();
};
```

이렇게 사용가능해진다.

---

겨우 여기까지 왔다..🙂

그리고 이와 비슷하게 useDynamicAnimation()에도 추가했다.

```js
if (controller.current == null) {
  controller.current = {
    __state,
    // @ts-ignore
    get current(): DynamicStyleProp<Animate> {
      return __state.value;
    },
    animateTo(nextStateOrFunction) {
      "worklet";

      const nextStyle =
        typeof nextStateOrFunction === "function"
          ? nextStateOrFunction(__state.value)
          : nextStateOrFunction;

      __state.value = nextStyle;
    },
    cancel() {
      cancelAnimation(__state);
    },
  };
}
```

그리고 타입도 수정해준다.

```js
{
  animateTo: (
    key:
      | DynamicStyleProp<Animate>
      | ((currentState: DynamicStyleProp<Animate>) => DynamicStyleProp<Animate>)
  ) => void

  cancel: () => void
}
```

이제 끝이 보인다.

[PR link](https://github.com/nandorojo/moti/pull/367#issuecomment-2500236087)
