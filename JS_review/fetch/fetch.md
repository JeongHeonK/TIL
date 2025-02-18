### fetch

- 현재는 표준이됨.
- 이전 `XMLHttpRequest` 사용. 코드가 훨씬 복잡하고 김.

```js
const getData = async () => {
  const response = await fetch(url);
  const result = await response.json();
};

getData();
```

#### Error

- Fetch는 404 응답이 오더라도 에러를 발생시키지 않음.
- 응답객체가 있다면 그것도 리턴함.
- 그래서 `response.ok`사용해서 200이 아닐때 에러처리 진행

```js
const getData = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json(); // 여기서 에러 발생
  } catch (e) {
    console.error(e);
  }
};

getData();
```

```js
const getData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("error occurred");
    // 여기서 에러 발생 이걸로 처리해줘야 함.
    const result = await response.json();
  } catch (e) {
    console.error(e);
  }
};

getData();
```

#### Header

```js
const getDataWithHeader = async () => {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer TOKEN",
  });
  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
  } catch (e) {
    console.error("Error fetching data:", e);
  }
};
getDataWithHeader();
```

#### POST

```js
const postData = async () => {
  const payload = {
    handle: "chicken",
    name: "Chickens and Company",
    num: 99999,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
```

#### post with files

```js
const postData = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
```
