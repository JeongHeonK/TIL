## TextInput

- `<TextInput>` 사용 시, 사용할 수 있는 속성들
  - keyboardType: phone 키보드 유형 선택 (문자, 숫자패드 등.)
  - onChangeText: onChange -> 여기서 사용됨.
  - secureTextEntry: type="password" 형식과 같음. 입력값 가려짐.
  - 자동채움 설정
    - importantForAutofill="yes"
    - autoComplete="password"
    - textContentType="password"
  - `onSubmitEditing={() => passwordRef.current?.focus()}` 다음 이동 ref로 연결 후 focus() 사용 시 다음 input으로 이동.
  - `onSubmitEditing={() => handleSubmit()}` 엔터 눌렸을 시, 제출 동작

### `StyleSheet.compose()`

- style들 혼합

```jsx
const Text = () => {
  return (
    <View style={{[styles.container, styles.activeContainer]}}>
      <Text>속성</Text>
    </View>
  )
}
```

- 이 속성을 함수를 이용해서 혼합.
- 뒤에 오는 것이 우선순위를 가짐.

```jsx
const Text = () => {
  return (
    <View style={StyleSheet.compose(styles.container, styles.activeContainer)}>
      <Text>속성</Text>
    </View>
  );
};
```
