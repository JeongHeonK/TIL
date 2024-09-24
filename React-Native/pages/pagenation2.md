## stack & tab

### Tab

```ts
export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: { orderId: string };
};
```

- 하단 탭 생성
- `const Tab = createBottomTabNavigator();`

### Stack

```ts
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
```

- 하나씩 페이지가 쌓이는 형식
- `const Stack = createNativeStackNavigator<RootStackParamList>();`

---

### 로그인

- `<TextInput>` 사용 시, 사용할 수 있는 속성들
  - keyboardType: phone 키보드 유형 선택
  - onChangeText: onChange -> 여기서 사용됨.
  - secureTextEntry: type="password" 형식과 같음
  - 자동채움 설정
    - importantForAutofill="yes"
    - autoComplete="password"
    - textContentType="password"
  - `onSubmitEditing={() => passwordRef.current?.focus()}` 다음 이동 ref로 연결해야함.
  - `onSubmitEditing={() => handleSubmit()}` 엔터 눌렷을시 제출 동작
- `StyleSheet.compose()` -> style들 혼합 뒤에 오는 것이 우선순위 가짐
