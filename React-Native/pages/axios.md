## Axios

- `import axios from 'axios';`
- `axios.post()`, `axios.get()`처럼 restful api 요청 가능
- async, await과 주로 함께 사용
- fetch로 보낸 결과와 달리 `JSON.parse()`를 통해 한번 parsing할 필요 없음.

### GET

- `const response = await axios.get('url');` response 바로 사용 가능.(data property에 저장)
- query string 전달 시, 두번째 arg로 전달 가능

  ```js
  const response = await axios.get("/url", { user: username, id: id });

  // -> /url?user=username&id=id로 요청
  ```

---

### POST

```js
import axios from "axios";

const data = {
  id: 123,
  pw: 123,
};

const response = axios.post(url, data);
```

- axios는 객체를 자동으로 `JSON.stringify()`를 사용해 json화.
- Content-Type도 설정

---

### Base URL 설정 방법

```js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://somewhere.co.kr",
  //spell 주의
  timeout: 3000,
});

//요청보내기
const response = await instance.get("/baseURL을 제외한 추가 정보");
const response = await instance.post("/baseURL을 제외한 추가 정보", data);
const response = await instance.delete("/baseURL을 제외한 추가 정보");
```

---

### 분기 처리

- 개발 모드일 때 조건
  - `process.env.NODE_ENV === 'production'` 이 경우 배포중 때 true,
  - `__DEV__` RN에서 쓰는 방법, 개발 중일 때 true,
  ```js
  const res = axios.post(url: `${__DEV__ ? 'localhost:3000' : '배포 서버 주소'}/url`, data, config);
  ```

---

### .env

- RN에서 .env 파일 불러올 경우, `Config.변수명` 사용
- `const Config from 'react-native-config';` 로 불러와야함.
