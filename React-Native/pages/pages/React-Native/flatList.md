## FlatList

- `ScrollView`를 사용하면 모든 요소를 렌더링함. (화면 밖 요소들 포함)
- 메모리 낭비 및 성능 저하 유발
- 서버에서 데이터를 받으며 map을 사용해서 렌더링 할 경우 `FlatList` 사용

사용 예시

```jsx
import { FlatList } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const FlatListExample = () => {
  // useCallback으로 사용보다는 그냥 분리하는 것이 좋음
  const Component = useCallback(
    ({ title }: { title: string }) => {
      return (
        <View>
          <Text>{title}</Text>
        </View>
      );
    },
    [title]
  );

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => data.id}
      renderItem={(item) => <Component title={item.title} />}
    />
  );
};
```
