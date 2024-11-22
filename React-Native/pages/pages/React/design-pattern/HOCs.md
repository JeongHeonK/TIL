### HOCs

고차 컴포넌트 (Higher-order component)

컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수

#### 장점

- 기존 코드에 수정 없이 해당 코드를 확장할 수 있다.
- 공통 로직을 공유하는 다른 컴포넌트를 만들 수 있다.
- 코드 수정 없이 새로운 로직을 추가할 수 있다.

#### 예시

1. 코드 재사용 가능.

- 로그인 정보를 확인하고 로그인 되었을 때 정보를 보여주는 페이지

```jsx
import React, { useEffect, useState } from 'react';
import { auth } from './auth';

const withAuthentication = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      (async () => {
        const isLogin = await auto.isAuthenticated();
        const setIsAuthenticated(isLogin)
      })();
    }, []);

    return isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <div>로그인이 필요합니다.</div>
    );
  };

  return AuthenticatedComponent;
};

export default withAuthentication;
```

2. Props 추가

```js
import React from 'react';

const withExtraProp = (WrappedComponent) => {
  const ComponentWithExtraProp = (props) => {
    const newProps = {
      extraProp: '추가적인 props',
      ...props,
    };
    return <WrappedComponent {...newProps} />;
  };

  return ComponentWithExtraProp;
};

export default withExtraProp;
// MyComponent.js
import React from 'react';
import withExtraProp from './withExtraProp';

const MyComponent = (props) => {
  return <div>{props.extraProp}</div>;
};

export default withExtraProp(MyComponent);

```
