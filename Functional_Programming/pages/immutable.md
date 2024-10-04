## immutable

- 불변성을 유지한 코드는 신뢰할 수 있다.
- 신뢰할 수 없는 코드를 사용할 때는 `방어적 복사`를 사용한다.
- 데이터를 전달하기 전, 후에 복사한다.

규칙

1. 데이터가 안전한 코드에서 나갈 때 복사하기
2. 안전한 코드로 데이터가 들오올 때 복사하기

- 예시

```js
function add_item_to_cart(name, price) {
  const item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);
  const total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_tax_dom(total);
  // 신뢰할 수 없는 코드
  black_friday_promotion(shopping_cart);
}
```

```js
function add_item_to_cart(name, price) {
  const item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item);
  const total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_tax_dom(total);
  shopping_cart = black_friday_promotion_safe(shopping_cart);
}

// 들어오는 코드 복사, 내보내는 코드 복사.
function black_friday_promotion_safe(cart) {
  const cart_copy = deepCopy(cart);
  black_friday_promotion(cart_copy);
  return deepCopy(cart_copy);
}
```

---

### 연습문제

```js
function payrollCalc(employees) {
  //...
  return copied_payroll;
}
```

불변성 유지 코드로 refactoring

```js
function payrollCalcSafe(employees) {
  const deep_copy = copyDeeply(employees);
  const result = payrollCalc(deep_copy);

  return copyDeeply(result);
}
```
