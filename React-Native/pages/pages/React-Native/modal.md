## modal

- 최상단 페이지에 modal이 될 component를 만든다.
- 점점 쌓여서 생성되므로 가장 위에 두기위해서 최하단에 배치한다.
- `position: absolute` 적용
- 배경까지 적용하기

```jsx
{
  isOpen && (
    <View
      onPress={() => setIsOpen(false)}
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: rgba(0, 0, 0, 0.5),
        position: "absolute",
      }}
    >
      <View
        onPress={() => setIsOpen(false)}
        style={{
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
          backgroundColor: modalColor,
          position: "absolute",
        }}
      >
        <Text>모달입니더.</Text>
      </View>
    </View>
  );
}
```
