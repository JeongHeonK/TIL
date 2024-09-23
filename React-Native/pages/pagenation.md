## 페이지 전환

```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ title: "홈화면" }}
/>
```

- Stack.Screen내의 컴포넌트의 경우 Props로 `navigation`, `route`가 자동으로 전달됨.
