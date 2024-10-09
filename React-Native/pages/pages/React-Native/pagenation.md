## 페이지 전환

```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: "홈화면" }}
/>
```

- Stack.Screen내의 컴포넌트의 경우 Props로 `navigation`, `route`가 자동으로 전달됨.

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
