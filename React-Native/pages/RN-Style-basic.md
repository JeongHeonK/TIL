## RN-Style-basic

- 기본적으로 flex 적용됨.
- `flex: 1` 은 `flex-grow: 1; flex-shrink: 1; flex-basis: 0;` 줄임.

```jsx
<View style={{flex: 5}}>
  5
</View>
<View style={{flex: 2}}>
  2
</View>
```

- 이 경우 전체 크기의 5/7, 2/7사용

- justify-content와 align-items 축 바뀜 -> 기본 방향 `flex-direction: column`
- Button은 보통 `Pressable`, `TouchableOpacity`, `TouchableWithoutFeedback` 사용
- eventHandler는 `onPress` 사용, `onClick` 아님.
- `padding: '20 40'`주는 건 불가능
- `paddingTop: 20, paddingBottom: 20, paddingRight: 40, paddingLeft: 40`이렇게 따로 줘야함.
- 혹은 `paddingHorizontal: 40, paddingVertical: 20`으로 속성 부여 가능
