### indexedDB

- 구버전
- 구문이 약간 복잡
- 그러나 기존 web storage보다 저장 가능 용량이 큼

```js
const open = indexedDB.open("IndexedDB", 1); // 마지막 숫자는 버전

open.onupgradeneeded = () => {
  const db = open.result;
  db.createObjectStore("MyUserStore", { keyPath: "id" });
};

open.onsuccess = () => {
  console.log("opened");
  const db = open.result;
  const transaction = db.transaction("MyUserStore", "readwrite");
  const store = transaction.objectStore("MyUserStore");

  store.put({ id: 1, username: "sojeong", age: 28 });

  const user1 = store.get(1);
  user.onsuccess = () => {
    console.log(user.result);
  };
};

open.error = () => {
  console.log("error occurred");
};
```

- mongoDB 사용하는게 훨씬 낫지 않을까..
- 안 익숙해서 낯선거 같은데, 익숙해질 일이 있을까 싶은 그런 저장소
