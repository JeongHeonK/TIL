## React-Navigation

사용전

```jsx
import { NavigationContainer } from "@react-navigation/native";

function App() {
  return (
    <NavigationContainer>
      {/** 한번 감싸줘야함. */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Overview" }}
        />
        <Stack.Screen name="Details">
          {(props) => <DetailsScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

- `<NavigationContainer />`사용 해야 내부에서 작동
- `<Stack.Navigator />` 페이지들의 묶음
- `<Stack.Screen />` 하나의 페이지들.

```jsx
<Stack.Screen name="Details">
  {(props) => <DetailsScreen {...props} />}
</Stack.Screen>
```

- 위의 방식은 페이지로드 시 prop들 넘길 때 사용
