## copy-on-write Obj

객체 복사

- `Object.assign({}, obj)` 사용

```js
function objectSet(object, key, value) {
  const newObject = Object.assign({}, object);
  newObject[key] = value;

  return newObject;
}
```

```js
function setPrice(item, new_price) {
  const copy = Object.assign({}, item);
  copy.price = new_price;

  return copy;
}

function setPrice(item, new_price) {
  return objectSet(item, "price", new_price);
}

function setQuantity(item, new_quantity) {
  return objectSet(item, "quantity", new_quantity);
}
```

### delete

```js
function objectDelete(object, key) {
  const newObj = Object.assign({}, object);
  delete newObj[key];

  return newObj;
}
```

copy on write 전환

```js
function setQuantityByName(cart, name, quantity) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].quantity = quantity;
    }
  }
}

function setQuantityByName(cart, name, quantity) {
  const cart_copy = [...cart];
  for (let i = 0; i < cart_copy.length; i++) {
    if (cart_copy[i].name === name) {
      const newCart = { ...cart_copy[i], quantity };

      cart_copy[i] = newCart;
      break;
    }
  }

  return cart_copy;
}
```
