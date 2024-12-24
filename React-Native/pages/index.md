### React

- [memo 주의](./pages/React/memo.md)
- [Redux](./pages/React/redux.md)
- [useEffect와 useLayoutEffect](./pages/React/useLayout.md)
- [useCallback과 useMemo의 차이](./pages/React/useCallback&useMemo.md)

---

### React Design Pattern

#### Layout Components

- [start](./pages/React/design-pattern/start.md)
- [screenSplitter](./pages/React/design-pattern/screenSplitter.md)
- [screenSplitterEnhancement](./pages/React/design-pattern/screenSplitterEnhancement.md)
- [List](./pages/React/design-pattern/List.md)
- [Modal](./pages/React/design-pattern/Modal.md)

#### Container Components (data fetching)

- [Loader Component for CurrentUser Data](./pages/React/design-pattern/Container.md)
- [UserDataLoader](./pages/React/design-pattern/UserDataLoader.md)
- [ResourceLoader](./pages/React/design-pattern/ResourceLoader.md)
- [DataSourceLoader](./pages/React/design-pattern/DataSourceLoader.md)
- [DataSourceWithRender](./pages/React/design-pattern/DataSourceWithRender.md)
- [localStorage](./pages/React/design-pattern/locastorage.md)

#### Controlled and Uncontrolled Components

- [Uncontrolled Components](./pages/React/design-pattern/UncontrolledComponents.md)
- [Controlled Components](./pages/React/design-pattern/ControlledComponents.md)
- [Controlled Modal](./pages/React/design-pattern/ControlledModal.md)
- [Uncontrolled Flows](./pages/React/design-pattern/UncontrolledFlows.md)
- [Data Collecting with Uncontrolled Flow](./pages/React/design-pattern/UncontrolledFlowDataCollecting.md)
- [Controlled Flow](./pages/React/design-pattern/ControlledFlow.md)

#### Higher Order Components

- [HOCs ??](./pages/React/design-pattern/HOCs.md)
- [Check Props with HOCs](./pages/React/design-pattern/CheckPropsWithHOCs.md)
- [Load User Data With HOCs](./pages/React/design-pattern/loadUserDataWithHOCs.md)
- [Updating Data With HOCs](./pages/React/design-pattern/UpdatingDataWithHOCs.md)

#### Custom hooks

- [Custom Hooks](./pages/React/design-pattern/CustomHooks.md)
- [useUser](./pages/React/design-pattern/useUser.md)
- [useUsers](./pages/React/design-pattern/useUsers.md)
- [useResource](./pages/React/design-pattern/useResource.md)
- [useDataSource](./pages/React/design-pattern/useDataSource.md)

#### Functional Programming in React

- [Recursive Components](./pages/React/design-pattern/RecursiveComponents.md)
- [Compositions](./pages/React/design-pattern/Compositions.md)
- [Partial](./pages/React/design-pattern/Partial.md)

#### Elements as props tips ans tricks

- [Locating an issue](./pages/React/design-pattern/LocatingIssue.md)

#### Memoization

- [Memoization](./pages/React/design-pattern/Memoization.md)
- [Comparing values](./pages/React/design-pattern/ComparingValues.md)
- [useMemo & useCallback](./pages/React/design-pattern/useMemo&useCallback.md)
- [memo](./pages/React/design-pattern/memo.md)

#### Reconciliation

- [Reconciliation Intro](./pages/React/design-pattern/ReconciliationIntro.md)
- [문제점](./pages/React/design-pattern/ReconciliationIssue.md)
- [Diffing](./pages/React/design-pattern/Diffing.md)
- [map()을 사용할 시, key에 index를 주지 않는 이유](./pages/React/design-pattern/keyInMap.md)

#### Context api

- [Context](./pages/React/design-pattern/Context.md)
- [Wasted re-renders](./pages/React/design-pattern/WastedReRenders.md)
- [Splitting context with useReducer](./pages/React/design-pattern/ContextWithReducer.md)
- [Building a Selector](./pages/React/design-pattern/BuildingSelector.md)

#### Ref

- [Ref](./pages/React/design-pattern/Ref.md)
- [Ref for accessing Dom](./pages/React/design-pattern/RefDom.md)
- [Ref as Prop](./pages/React/design-pattern/RefProp.md)
- [useImperativeHandler](./pages//React/design-pattern//useImperativeHandle.md)

#### Closures

- [issue cause of Closure](./pages/React/design-pattern/ClosureIssue.md)

#### Advanced Concepts and Hooks

- [React Portals](./pages/React/design-pattern/ReactPortals.md)
- [Error Boundary](./pages/React/design-pattern/ErrorBoundary.md)
- [Keys Explained](./pages/React/design-pattern/KeysExplained.md)
- [Event Listeners](./pages/React/design-pattern/EventListeners.md)
- [useLayoutEffect](./pages/React/design-pattern/useLayoutEffect.md)
- [useId](./pages/React/design-pattern/useId.md)
- [useCallback as Ref](./pages//React/design-pattern/useCallbackAsRef.md)
- [useDeferredValue](./pages/React/design-pattern/useDeferredValue.md)
- [useTransition](./pages/React/design-pattern/useTransition.md)

#### Clean Code tip

- [Using Element Prop](./pages/React/design-pattern/UsingElementProp.md)
- [Optimizing Context](./pages/React/design-pattern/OptimizingContext.md)
- [Less useEffect](./pages/React/design-pattern/LessUseEffect.md)

#### Scalable Project Architecture

- [General Architecture](./pages/React/design-pattern/GeneralArchitecture.md)
- [Route Components](./pages//React/design-pattern/RouteComponents.md)

#### API Layer and Async Operation

항상 궁금했던 부분. 데이터 요청하는 부분을 하나로 통합할 수 없을까? <br />
fetching하는 걸 한 페이지에서 모두 처리하게 할 수 없을까? <br />

- [Building an Api Layer](./pages/React/design-pattern/BuildingApiLayer.md)
- [API state](./pages//React/design-pattern/APIstate.md)
- [Avoiding flickering Loaders](./pages/React/design-pattern/AvoidingFlickeringLoaders.md)
- [Abstracting API state](./pages/React/design-pattern/AbstractingAPIstate.md)

#### API Layer with React-query

- [Fetching Data with React-Query](./pages/React/design-pattern/APIwithTanStackQuery.md)

#### State Management Patterns

- [Immutable updates with useImmer](./pages/React/design-pattern/ImuutableUpdtaeWithUseImmer.md)

#### extra

- [ObserverPattern](./pages/React/design-pattern/ObserverPattern.md)
- Compound Pattern의 경우 skip합니다. `<Animated.View></Animated.View>`같은 컴포넌트가 어떻게 생겼는지 이해할 정도면 충분하다 생각되며, 추후 Reanimated에서 더 깊게 생각해볼 예정입니다.

#### Re-Render

- [Hook 분리와 컴포넌트 분리 고려할 점](./pages/React/design-pattern/hooks_drawback.md)

---

### React 까보기

RN 기반으로 작업하면 결국 react 깊게 알아야 해서 정리🫠🫠

- [React 구성 요소들](./pages/React/react-basic.md)
- [VDOM](./pages/React/VDOM.md)
- [오픈소스 확인](./pages/React/open-source.md)
- [renderWithHook](./pages/React/renderWithHooks.md)
- [useState](./pages/React/useState.md)
- [reconciler](./pages/React/reconciler.md)

---

### React-native 정리

- [기본 컴포넌트](./pages/React-Native/basic-components.md)
- [React-Navigation](./pages/React-Native/react-navigation.md)
- [RN-Style-basic](./pages/React-Native/RN-Style-basic.md)
- [페이지 전환](./pages/React-Native/pagenation.md)
- [Modal 생성](./pages/React-Native/modal.md)
- [axios 요청](./pages/React-Native/axios.md)
- [데이터 저장](./pages/React-Native/storage.md)
- [Socket.id](./pages/React-Native/socket.md)
- [Text 속성들](./pages/React-Native/TextInput.md)
- [앱 종료 후 재접속 시 데이터 유지](./pages/React-Native/dataKeeping.md)
- [FlatList vs ScrollView](./pages/React-Native/flatList.md)

### RN-Docs 번역

- [들어가며](./pages/React-Native/doc/start.md)
- [Performance Optimization](./pages/React-Native/doc/PerformanceOptimization.md)

---

### expo route

- [routing](./pages/expo-routing.md)
