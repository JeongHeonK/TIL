## 기본 개념들

### 1. 스타일 생성

```tsx
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

// 사용
const SomeComp = () => {
  return (
    <view style={styles.SectionContainer}>
      <text>예시입니다.</text>
    </view>
  );
};
```

- 단위는 'dp'
- 단위 생략하고 적으면 해당 단위로 자동 적용.
- 해상도만 같다면 같은 넓이를 보장
- 360px에서 120이면 33% 의미
- 축약형 표현 불가 -> `border: 1px solid black` 같은거 불가
- 기본은 flex column이 기본.

---

### Component

- `<View> </View>` -> `<div> </div>`랑 '비슷'
- `<Text> </Text>` -> `<Span> </span>`과 '비슷'
- `<SafeAreaView> </SafeAreaView>` 위 쪽 죽은 공간(노치, dynamic-island) 제외하고 채워줌.
- `<StatusBar> </StatusBar>` 배터리 시간 같은 상단 부분, 색 조절할때 사용.
- `<ScrollView> </ScrollView>` 일반 `<View>`를 사용할 경우 화면 넘어갈 시, scroll 불가. 다만, 성능 이슈 있으므로 조심할 것.

---

### 스타일에 배열 넣기 가능

```jsx
<Text
  style={[
    styles.sectionTitle,
    {
      color: isDarkMode ? Colors.white : Colors.black,
    },
  ]}
>
  무언가
</Text>
```

- 상단처럼 배열 사용 가능.
- 첫번째 스타일 적용되고, 두번째가 덮어씀.
- StyleSheet에서 속성 생성 불가.
- 조건문 사용시, 배열로 입력.
