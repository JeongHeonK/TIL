### Generator function

```js
function* evens(n) {
  while (true) {
    yield n;
    n += 2;
  }
}

const gen = evens(2);
gen.next(); // {value: 2, done: false }
gen.next(); // {value: 4, done: false }
// ... 쭉 반복

function* names() {
  yield "kim";
  yield "han";
  yield "lee";
}

const nameGenerator = names();
nameGenerator.next(); // {value: "kim", done: false }
nameGenerator.next(); // {value: "han", done: false }
nameGenerator.next(); // {value: "lee", done: false }
nameGenerator.next(); // {value: undefined, done: true }
```

---

#### 사용

```js
const allImages = Array.form({ length: 10 }, (_, i) => `imgUrl${i}`);

function* getImages (images, batchSize = 10) {
  let start = 0;

  while (start < images.length) {
    yield const result = allImages.slice(start, start + batchSize);
    start += batchSize
  }
}

const genImages = getImages(allImages)
```
