### Moti 라이브러리 애니메이션 구현

useShared value가 없는데 어떻게 애니메이션을 구현하는 것인지 궁금했다.
처음에는 암묵적으로 shared value가 전달되는 줄 알았으나 useSpring(), useTiming()등에 전달되는 값은 마지막 값 뿐이었다.

그럼 어떻게 초기값을 생성하고 다시 원상태로 돌리는가?

React Native에서 style에 배열을 전달할 경우, 자동으로 병합해서 최종 스타일을 부여한다.

```jsx
// 예시

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const App = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsActive(!isActive)}
        style={[styles.button, isActive && styles.activeButton]} // 스타일 병합
      >
        <Text style={[styles.text, isActive && styles.activeText]}>
          {isActive ? "Active" : "Inactive"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: "#28a745",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
  activeText: {
    fontWeight: "bold",
  },
});

export default App;
```

라이브러리를 쓰지 않고 UI 애니메이션 업데이트를 할 경우 이 방법을 사용한다.

그리고 Moti는 이 방법과 `useAnimatedStyle()`을 결합한다.

`useMotify()`는 최종값으로 객체에 style 프로퍼티를 추가해서 return 한다.

```jsx
export function useMotify<Animate>({
  animate: animateProp,
  from: fromProp = false,
  transition: transitionProp,
  exitTransition: exitTransitionProp,
  delay: defaultDelay,
  state,
  stylePriority = 'animate',
  onDidAnimate,
  exit: exitProp,
  animateInitialState = false,
  usePresenceValue,
  presenceContext,
}: MotiProps<Animate> & {
  presenceContext?: Pick<
    NonNullable<React.ContextType<typeof PresenceContext>>,
    'custom' | 'initial'
  > | null
  usePresenceValue?: ReturnType<typeof useFramerPresence>
}) {
// ... 생략

  return {
    style,
  }
}
```

그리고 이 style은 `withAnimations()`에서 사용되며 생성한 컴포넌트에 style을 부여한다.

```jsx
 const withAnimations = () => {
    const Motified = forwardRef<
      Ref,
      Props &
        AnimatedProps<Props> &
        MotiProps<Animate> & {
          children?: React.ReactNode
        }
    >(function Moti(props, ref) {
      const animated = useMotify({
        ...props,
        usePresenceValue: usePresence(),
        presenceContext: useContext(PresenceContext),
      })
      // 상단에서 animated라는 객체를 생성한다.

      const style = (props as any).style

      return (
        <Component
          {...(props as any)}
          //... 그리고 하단에서 animated.style을 생성한 컴포넌트에 부여한다.
          style={style ? [style, animated.style] : animated.style}
          ref={ref as any}
        />
      )
```

그럼 이제
`const isMounted = useSharedValue(false)`
이 코드만 useSharedValue에 false로 저장되었는지 알 수 있다.

위 값은 하단의 useEffect에서 true로 변경된다.

```jsx
useEffect(
  function allowUnMountIfMissingExit() {
    if (fromProp && isMounted.value === false) {
      // put this here just to avoid having another useEffect
      isMounted.value = true;
    }
    if (!isPresent && !hasExitStyle) {
      reanimatedSafeToUnmount();
    }
  },
  [hasExitStyle, isPresent, reanimatedSafeToUnmount]
);
```

useEffect는 리액트의 대표적인 비동기함수로 렌더링 완료 시점에서 실행된다.
즉, isMount를 통해서 Mount여부를 판단하는 것이다.

그리고 하단의 조건문을 통해서 내보낼 style의 속성들을 결정한다. 그리고 isMount에 따라서 어떤 스티일 값이 부여되는지 결정된다.

```jsx
if (
  !isMounted.value &&
  !disableInitialAnimation &&
  Object.keys(initialStyle).length
) {
  mergedStyles = initialStyle as Animate
} else {
  mergedStyles = Object.assign({}, initialStyle, mergedStyles)
} // mount되면 변경되는 style

if (isExiting && exitStyle) {
  mergedStyles = Object.assign({}, exitStyle) as any
}
```

처음 `isMounted.value`가 `false일` 경우, 그리고 애니메이션이 자동으로 시작되도록 설정했을 경우,
`mergedStyles`에 `initialStyle`을 할당한다.

그리고 `isMounted`가 `true`일 경우, `Object.assign()` 이용해서 mergedStyled을 덮어씌운다.

왜냐면 하단에서 `mergedStyle`은 로직에 따라 최종값으로 계산된다.

그리고 `exitStyle`이 있다면 `exitStyle`을 `mergedStyled`에 할당한다. 여기서는 `framer-motion`의 api인 `PresenceContext`와 `usePresence`를 사용한다.

그리고 이 mergedStyle은 `Object.keys()`를 이용해서 각 스타일마다 reanimated의 api를 사용해서 동작할 값들을 부여되게 된다.

```js
Object.keys(mergedStyles as any).forEach((key) => {
//... 중략

final[key] = finalValue

// ... 중략
        for (const innerStyleKey in value || {}) {
          let finalValue = animation(value, config, callback)

          if (shouldRepeat) {
            finalValue = withRepeat(
              finalValue,
              repeatCount,
              repeatReverse,
              undefined,
              reduceMotion
            )
          }

          if (delayMs != null) {
            final[key][innerStyleKey] = withDelay(
              delayMs,
              finalValue,
              reduceMotion
            )
          } else {
            final[key][innerStyleKey] = finalValue
          }
        }
      } else {
        let finalValue = animation(value, config, callback)
        if (shouldRepeat) {
          finalValue = withRepeat(
            finalValue,
            repeatCount,
            repeatReverse,
            undefined,
            reduceMotion
          )
        }

        if (delayMs != null && typeof delayMs === 'number') {
          final[key] = withDelay(delayMs, finalValue, reduceMotion)
        } else {
          final[key] = finalValue
        }

///...중략

  return final;
}
```

그리고 이 로직은 `useAnimatedStyle()`을 통해서 실되어 style을 생성한다.

```jsx
const style = useAnimatedStyle(() => {}, []);
```

`useAnimatedStyle()`는 스타일 객체를 생성한다. 그리고 이 스타일은 Animated컴포넌트의 스타일 프로퍼티에 전달된다. 그리고 연결된 공유 값이나 React의 상태가 변경될 때마다 자동으로 업데이트 된다.

Moti는 이 방법으로 새로운 스타일을 업데이트하고 transition을 부여해서 애니메이션을 생성한다.

즉, 기본 동작은 style객체의 프로퍼티들을 조작해서 css를 변경하는 것이다.

```jsx
let mergedStyles: Animate = {} as Animate
if (stylePriority === 'state') {
  mergedStyles = Object.assign({}, animateStyle, variantStyle)
} else {
  mergedStyles = Object.assign({}, variantStyle, animateStyle)
}
```

cancelAnimation()이 동작하지 않고 전달된 props의 from과 to로 이동했던것도 이제 원인을 알 수 있다.
`stylePriority`에 따라서 스타일 객체에 animateStyle을 사용하거나 variantStyle을 사용해서 새로운 css값을 할당하고 있기 때문이다.

그럼 cancelAnimation은 useSharedValue의 사용 부재로 불가능할까?

지금 상황으로는 Moti의 철학과 달리 api를 분리해서 animation을 변경하는 `useAnimationState()`와 `useDynamicAnimation()`을 분석해봐야 한다.
