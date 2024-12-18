### Route Components

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
```

이렇게 경로 최상단에 있는 파일들을 View 폴더에 넣는다.
