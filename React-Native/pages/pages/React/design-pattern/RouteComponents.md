### Route Components

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products">
          <Route index element={<Products />} />
          <Route path="add" element={<AddProduct />} />
          <Route path=":id" element={<ViewProduct />} />
          <Route path=":id/edit" element={<EditProduct />} />
          <Route path=":id/delete" element={<DeleteProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

이렇게 경로 최상단에 있는 파일들을 View 폴더에 넣는다.

그리고 관련된 것들은 Product directory를 한번 더 만들어서 그 안에서 관리하는게 좋음

---

#### Architecture 사용법

- Products 내에서 쓰이는 컴포넌트는 components 폴더로
- service에서는 제출 동작 등의 함수를 넣음
- helper에서는 좀더 작은 단위의 함수를 다룸

---

- 그러나 이 경우 너무 파일이 분리되어 금방 복잡해 진다.
- 차라리 연관된 것들을 최대한 같은 폴더 구조안에 넣어서 찾기 쉽게 만드는 게 낫다.
- 그리고 실무에서는 내 코드가 작성된 것조차 모르는 경우가 많다.🥲

```
src
├── views
⎮ ├── Products
⎮ ⎮ ├── Components
⎮ ⎮ ├── helpers
⎮ ⎮ ├── services
⎮ ⎮ ├── Products.tsx
⎮ ⎮ ├── AddProduct.tsx
⎮ ⎮ ├── ViewProducts.tsx
⎮ ⎮ ├── DeleteProducts.tsx
⎮ ⎮ ├── editProducts.tsx

```

이것 또한 Encapsulation이라 부름
