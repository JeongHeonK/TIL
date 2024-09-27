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
