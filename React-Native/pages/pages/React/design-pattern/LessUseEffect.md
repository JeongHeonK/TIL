### Less useEffect

```jsx
function ProductPage({ product, addToCart }) {
  useEffect(() => {
    showNotification(`Added ${product.name} to the shopping cart!`);
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo("/checkout");
  }
}
```

useEffect가 두번 실행됨.

1. product 변경시 한번
2. product Prop이 바뀌어 리랜더링 되면서 한번

---

#### Solution

생각해보면 굳이 useEffect를 사용할 필요가 없음.

```jsx
function ProductPage({ product, addToCart }) {
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo("/checkout");
  }
}
```
