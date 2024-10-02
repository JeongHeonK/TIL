## 로그인 유지

- 앱 종료 후 재실행 시, 로그인 유지 시키기
- 저장된 refresh token 다시 사용
- 앱 상단 컴포넌트에서 토큰 조회 후, 토큰이 존재한다면 로그인 코드 실행
- 토큰은 EncryptedStorage에 저장되있기 때문에 앱 종료하더라도 유지됨.
- 사용성 향상을 위해 `splash screen`이 떴을 때 토큰 확인 코드 실행.

---

### 참고

1. 로그인 요청

- 사용자 로그인 성공 시 `Access Token`과 `Refresh Token`을 전달 받음.
- `Access Token`의 유효시간은 보통 30분~1시간
- `Refresh Token`을 통해 유효시간 연장. `Refresh Token`의 유효기간은 길게 잡음.
- `Access Token` 만료 시, `Refresh Token`을 서버로 보내면 새로운 `Access Token`을 반환 받음.

### 코드

```js
// 로그인
const response = await fetch("loginUrl", {
  method: "POST",
  body: JSON.stringify({
    username: "user@example.com",
    password: "1231231231",
  }),
  header: {
    "Content-Type": "application/json",
  },
});
const data = await response.json();

localStorage.setItem("accessToken", data.accessToken);
localStorage.setItem("refreshToken", data.refreshToken);
```

```js
// api 요청
const makeApiRequest = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const response = fetch("apiUrl", {
    method: "GET",
    header: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // access token 만료 시 실행
    return refreshAccessToken();
  }

  const data = await response.json();

  return data;
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = fetch("refreshApi", {
    method: "POST",
    body: JSON.stringify({
      refreshToken
    })
    header: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  const newAccessToken = data.accessToken;

  localStorage.setItem('accessToken', newAccessToken )

  return makeApiRequest();
};
```
