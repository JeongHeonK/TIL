## 액션 계산 분리 연습

1.

```js
function update_tax_dom() {
  set_tax_dom(shopping_cart_total * 0.1);
}
```

분리

```js
function update_tax_dom() {
  set_tax_dom(getTax(shopping_cart_total));
}

function getTax(total) {
  return total * 0.1;
}
```

---

2.

```js
function update_shipping_icons() {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    const buttons = buy_buttons[i];
    const item = buttons.item;
    if (item.price + shopping_cart_total >= 20) {
      buttons.show_free_shipping_icon();
    } else {
      buttons.hide_free_shipping_icon();
    }
  }
}
```

분리

```js
function update_shipping_icons() {
  let buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    const buttons = buy_buttons[i];
    const item = buttons.item;
    if (isOverTwenty(item.price, shopping_cart_total)) {
      buttons.show_free_shipping_icon();
    } else {
      buttons.hide_free_shipping_icon();
    }
  }
}

function isOverTwenty(total, price) {
  return price + total >= 20;
}
```

---

3.

```js
function addItemToCart(name, price) {
  shoppingCart = addItem(shoppingCart, name, price);
  calcCartTotal();
}

function calcCartTotal() {
  shoppingCartTotal = calcTotal(shoppingCart);
  setCartTotalDom();
  updateShippingIcons(shoppingCart);
}

function setCartTotalDom() {
  shoppingCartTotal;
}

function updateShippingIcons(cart) {
  const buyButtons = getBuyButtonsDom();
  for (var i = 0; i < buyButtons.length; i++) {
    var button = buyButtons[i];
    var item = button.item;
    var newCart = addItem(cart, item.name, item.price);
    if (getsFreeShipping(newCart)) {
      button.showFreeShippingIcon();
    } else {
      button.hideFreeShippingIcon();
    }
  }
}

function updateTaxDom() {
  setTaxDom(calcTax(shoppingCartTotal));
}
```

분리

```js
function addItemToCart(cart, name, price) {
  shoppingCart = addItem(cart, name, price);
  calcCartTotal(shoppingCart);
}

function calcCartTotal(cart) {
  const total = calcTotal(cart);
  setCartTotalDom(total);
  updateShippingIcons(cart);
  updateTaxDom(cart);
}

function setCartTotalDom(total) {
  total;
}

function updateShippingIcons(cart) {
  const buyButtons = getBuyButtonsDom();
  for (var i = 0; i < buyButtons.length; i++) {
    const button = buyButtons[i];
    const item = button.item;
    const newCart = addItem(cart, item.name, item.price);
    if (getsFreeShipping(newCart)) {
      button.showFreeShippingIcon();
    } else {
      button.hideFreeShippingIcon();
    }
  }
}

function updateTaxDom(total) {
  setTaxDom(calcTax(total));
}
```

refactoring

```js
function addItemToCart(cart, name, price) {
  shoppingCart = addItem(cart, name, price);
  const total = calcTotal(cart);
  setCartTotalDom(total);
  updateShippingIcons(cart);
  updateTaxDom(cart);
}

function setCartTotalDom(total) {
  total;
}

function updateShippingIcons(cart) {
  const buyButtons = getBuyButtonsDom();
  for (var i = 0; i < buyButtons.length; i++) {
    const button = buyButtons[i];
    const item = button.item;
    const newCart = addItem(cart, item.name, item.price);
    if (getsFreeShipping(newCart)) {
      button.showFreeShippingIcon();
    } else {
      button.hideFreeShippingIcon();
    }
  }
}

function updateTaxDom(total) {
  setTaxDom(calcTax(total));
}
```

3.

```js
function addItem(cart, name, price) {
  const newCart = cart.slice();
  newCart.push({
    name,
    price,
  });

  return newCart;
}

addItem(shoppingCart, "shoes", 3.45);
```

- item 생성 함수는 분리할 수 있음

```js
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

function addItem(cart, item) {
  const newCart = cart.slice();
  newCart.push(item);

  return newCart;
}

addItem(shoppingCart, new Item("shoes", 3.45));
```

- 좀 더 추상적인 함수로 작명

```js
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

function addElemLast(array, elem) {
  const newArray = array.slice();
  newArray.push(elem);

  return newArray;
}

function addItem(cart, item) {
  addElemLast(cart, item);
}

addItem(shoppingCart, new Item("shoes", 3.45));
```

4. 큰 함수 분리하기

```js
function updateShippingIcons(cart) {
  const buyButtons = getBuyButtonsDom();
  for (var i = 0; i < buyButtons.length; i++) {
    const button = buyButtons[i];
    const item = button.item;
    const newCart = addItem(cart, item.name, item.price);
    if (getsFreeShipping(newCart)) {
      button.showFreeShippingIcon();
    } else {
      button.hideFreeShippingIcon();
    }
  }
}
```

- 모든 버튼 가져오기
- 버튼 가지고 반복
- 버튼에 관련된 제품 가져오기
- 가져온 제품으로 새 장바구니 만들기
- 장바구니가 무료 배송이 필요한지 확인하기
- 아이콘 표시하거나 감추기
