## Performance Optimization

### What is the mechanism of React Native?

React Native의 새로운 아키텍처는 성능과 개발 효율성을 개선하는 것을 목표로 한 업그레이드입니다. 이 새로운 아키텍처는 JavaScript와 네이티브 코드 간의 기존 통신 메커니즘인 Bridge를 **JavaScript Interface (JSI)**라는 새로운 방식으로 대체합니다. 이를 통해 JavaScript에서 네이티브 객체를 직접 접근할 수 있게 되고, 반대로도 네이티브 코드에서 JavaScript를 직접 호출할 수 있게 됩니다. JSI는 직접적인 접근을 제공하기 때문에 직렬화나 큐 처리가 필요하지 않습니다.

또한, 새로운 아키텍처는 **최소 지속성(minimal persistence)**이라는 새로운 방식으로 컴포넌트를 관리합니다. 이 방식은 메모리 사용량을 줄이고 코드를 단순화하는 데 도움을 줍니다. 그리고 Hermes라는 새로운 JavaScript 엔진을 채택해, React Native에 최적화된 빠른 시작 시간, 낮은 메모리 사용량, 더 작은 앱 크기를 제공합니다.

새로운 아키텍처의 주요 구성 요소:

- Turbo Modules:<br />
  Turbo Modules는 더 효율적인 네이티브 모듈 시스템으로, 플랫폼별 API를 활용하여 네이티브 모듈을 구현할 수 있습니다. 기존의 Bridge를 사용하지 않고 JSI를 사용하여 JavaScript와 네이티브 코드 간의 상호작용을 개선합니다.
- Fabric:<br />
  Fabric은 React Native UI 레이어의 새로운 구현으로, 동시 렌더링(concurrent rendering), 비동기 레이아웃(asynchronous layout), 부드러운 애니메이션을 지원합니다. 이는 앱의 UI를 더 빠르고 유연하게 렌더링할 수 있도록 도와줍니다.
- Codegen:<br />
  Codegen은 네이티브 코드와 JavaScript 간의 타입 안전성을 보장하기 위해 사용되며, JSI와 Turbo Modules의 효율성을 높입니다.
- Yoga:<br />
  Yoga는 Flexbox 기반의 레이아웃 엔진으로, UI 요소의 크기와 배치 계산을 효율적으로 처리하며, React Native의 렌더링 성능을 향상시킵니다.

---

### Use FlatList or SectionList to display large lists in React Native

큰 목록을 처리할 때, 모든 항목을 한 번에 렌더링하면 성능 문제가 발생할 수 있습니다. 그러나 `FlatList`를 사용한 지연 로딩은 성능을 개선할 수 있습니다.

`FlatList` 컴포넌트는 화면에 표시되는 항목만 렌더링하고 더 이상 화면에 표시되지 않는 항목은 제거합니다. 이를 통해 메모리 사용을 절약하고 앱을 훨씬 빠르게 만듭니다.

```jsx
import React from 'react'
import {FlatList} from 'react-native'

const data = [
  {
    id: 1,
    text: 'First'
  },
  {
    id: 2,
    text: 'Second'
  },
  ...
]

const App = () => {
  const renderItem = ({item}) =>(
    <View>
      <Text>{item.text}</Text>
    </View>
  )
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
```

`FlatList`와 `SectionList`는 비슷한 용도로 사용되며 둘 다 앱의 성능을 향상시킬 수 있습니다. 그러나 각 컴포넌트는 특정 상황에서 더 적합하게 사용됩니다.

- FlatList: 일반적인 목록을 렌더링할 때 사용됩니다. 성능을 최적화하는 다양한 기능을 제공하며, 긴 목록을 처리하는 데 이상적입니다.
- SectionList: 섹션별로 목록을 렌더링할 때 사용됩니다. 예를 들어, 제목별로 그룹화된 목록을 만들 때 유용합니다. 섹션을 처리하는 데 특화되어 있으며, FlatList와 비슷한 성능 최적화를 제공합니다.

또한 **VirtualizedList**는 FlatList와 SectionList의 기반 클래스이므로 더 많은 유연성이 필요한 경우 사용할 수 있습니다. VirtualizedList는 FlatList나 SectionList에서 제공하는 기본적인 기능 외에도 추가적인 설정을 할 수 있습니다.

map()을 사용한 목록 렌더링:<br />
map()을 사용하여 목록을 렌더링할 수 있지만, React Native에서는 **FlatList, SectionList**와 같은 최적화된 컴포넌트를 사용하는 것이 좋습니다. map()을 사용하면 각 항목이 모두 한 번에 렌더링되어 성능에 부정적인 영향을 미칠 수 있습니다.

---

### Delete all console statements

콘솔 문장은 JavaScript 코드를 디버깅할 때 유용하지만, 개발 용도로만 사용해야 합니다. 이러한 문장이 번들링 전에 제거되지 않으면 React Native 애플리케이션에서 성능 문제를 일으킬 수 있습니다.

개발 중에는 콘솔 문장이 유용하지만, 프로덕션 빌드에서 콘솔 문장이 포함되면 앱의 성능에 영향을 줄 수 있습니다.
콘솔 문장을 제거하는 방법으로는 `babel-plugin-transform-remove-console`와 같은 플러그인을 설치할 수 있지만, 앱에 추가적인 종속성을 추가하고 싶지 않다면 수동으로 제거하는 것이 더 좋습니다.

---

### Cache expensive computations

React에서는 불필요한 재렌더링을 방지하고 성능을 최적화하기 위해 여러 가지 방법을 제공합니다. memo HOC(고차 컴포넌트)와 useMemo 훅은 각각 React v16.6과 v16.8에서 도입되었습니다. useMemo는 비싼 계산을 최적화하는 데 사용되며, useCallback 훅은 콜백 함수의 재생성을 방지하는 데 사용됩니다.

#### 👉 The React.memo Higher Order Component (HOC)

React.memo는 함수형 컴포넌트에서 React.PureComponent와 같은 역할을 하도록 도입되었습니다. memo는 컴포넌트의 불필요한 재렌더링을 방지하고, 애플리케이션의 성능을 최적화하는 데 도움이 됩니다.

하지만 다른 최적화 기법들처럼, memo는 필요할 때만 사용해야 합니다. 일부 경우에는 불필요한 재렌더링이 성능에 큰 영향을 미치지 않을 수 있습니다.

예시 코드

```jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Element = ({ children, value, setValue }) => {
  const handleOperation = () => setValue(value * 2);
  return (
    <View>
      <Text>{value}</Text>
      <TouchableOpacity onPress={handleOperation}>{children}</TouchableOpacity>
    </View>
  );
};

export default Element;
```

```jsx
import React, { useState } from "react";
import { View } from "react-native";
import Element from "./Element";

const App = () => {
  const [firstNum, setFirstNum] = useState(5);
  const [secondNum, setSecondNum] = useState(5);

  return (
    <View>
      <Element setValue={setFirstNum} value={firstNum}>
        Add First
      </Element>
      <Element setValue={setSecondNum} value={secondNum}>
        Add Second
      </Element>
    </View>
  );
};
```

위 코드에서 발생하는 문제는 버튼 중 하나가 눌릴 때, 상태가 변경된 버튼만 다시 렌더링되어야 하지만 두 버튼 모두 렌더링된다는 점입니다.

이를 해결하려면 Element 컴포넌트를 React.memo HOC로 감싸면 됩니다. 방법은 다음과 같습니다:

```jsx
import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Element = ({ children, value, setValue }) => {
  const handleOperation = () => setValue(value * 2);

  return (
    <View>
      <Text>{value}</Text>
      <TouchableOpacity onPress={handleOperation}>{children}</TouchableOpacity>
    </View>
  );
};

export default memo(Element);
```

#### 👉 The useMemo hook

`useMemo`는 함수의 결과를 메모이즈하여 저장합니다. 그러나 이는 비싼 연산을 할 때만 사용하는 것이 좋습니다.

예를 들어, API에서 가져온 데이터를 평점에 따라 필터링해야 하는 경우, 값이 변경될 때만 결과를 재계산하도록 메모이즈할 수 있습니다:

```jsx
const data = [
  { id: 1, state: "Texas", rating: 4.5 },
  { id: 2, state: "Hawaii", rating: 3 },
  { id: 3, state: "Illinois", rating: 4 },
  { id: 4, state: "Texas", rating: 5 },
  { id: 5, state: "Ohio", rating: 4.5 },
  { id: 6, state: "Louisiana", rating: 3 },
  { id: 7, state: "Texas", rating: 2 },
  // ...
  { id: 1000, state: "Illinois", rating: 4.5 },
];
```

만약 평점에 따라 데이터를 필터링하려고 한다면, 메모이제이션을 하지 않을 경우 불필요하게 많은 메모리를 사용할 수 있습니다.

이런 경우, 다른 컴포넌트가 재렌더링될 때 불필요하게 값을 재계산하지 않도록 하고 싶습니다. 우리는 의존하는 평점이 변경될 때만 재렌더링하거나 재계산하도록 해야 합니다.

이것을 useMemo를 사용하여 어떻게 달성할 수 있는지 살펴보겠습니다:

```jsx
import React, { useMemo } from "react";
import { FlatList } from "react-native";
import data from "./data";

const App = () => {
  const rateCompare = 3;

  const computedValue = useMemo(() => {
    // supposed computationally intensive calculation
    const result = data.filter((d) => d.rating > rateCompare);
    return result;
  }, [rateCompare]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.state}</Text>
    </View>
  );

  return (
    <FlatList
      data={computedValue}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
```

우리는 API에서 오는 방대한 데이터를 가지고 있고, 계산적으로 많은 연산을 해야 한다고 가정했습니다. 간단한 필터링 작업을 사용했지만, 실제로는 일련의 계산을 할 수도 있습니다. 이는 useMemo 훅을 사용하는 좋은 사례입니다.

useMemo를 사용하면, 의존성 배열에 지정된 값에 대해 결과를 캐시(메모이제이션)할 수 있습니다. 예를 들어, rateCompare 상수가 처음 실행될 때 값이 3이라면, rateCompare 값이 3인 한 함수는 재계산하지 않습니다. 전체 컴포넌트가 재렌더링되더라도 말이죠. 값이 변경될 때만 재계산을 수행합니다.

#### 👉 The useCallback hook

useCallback 훅은 useMemo와 비슷하지만, 메모이즈된 콜백 함수를 반환합니다.

```jsx
import React, { useState, useEffect, useCallback } from "react";
import { FlatList } from "react-native";
import data from "./data";

const App = () => {
  const [values, setValues] = useState([]);
  const rateCompare = 3;

  const valuesCallback = useCallback(() => {
    // supposed computationally intensive calculation
    const result = data.filter((d) => d.rating > rateCompare);
    setValues(result);
  }, [rateCompare, setValues]);

  useEffect(() => {
    valuesCallback();
  }, [valuesCallback]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.state}</Text>
    </View>
  );

  return (
    <FlatList
      data={values}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
```
