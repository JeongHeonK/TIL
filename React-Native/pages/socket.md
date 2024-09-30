## Socket.io

- 웹소켓 기반 라이브러리
- 요청-응답 방식이 아니라 실시간 양방향 통신

```jsx
import { useCallback } from "react";
import { io, Socket } from "socket.io-client";
import Config from "react-native-config";

let socket: Socket | undefined;
const useSocket = (): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    socket = io(`${Config.API_URL}`, {
      transports: ["websocket"],
    });
  }
  return [socket, disconnect];
};

export default useSocket;
```

- 예시 코드의 경우 socket을 전역해서 선언하기 때문에 다른 곳에서도 참조할 위험이 있음.
- 함수 스코프 내에서 관리하는 코드로 refactoring

```jsx
import { useCallback, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Config from "react-native-config";

const useSocket = (): [Socket | undefined, () => void] => {
  const socketRef = (useRef < Socket) | (undefined > undefined);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 소켓을 연결
    socketRef.current = io(`${Config.API_URL}`, {
      transports: ["websocket"],
    });

    return () => {
      // 컴포넌트가 언마운트될 때 소켓을 정리
      socketRef.current?.disconnect();
      socketRef.current = undefined;
    };
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = undefined;
    }
  }, []);

  return [socketRef.current, disconnect];
};
```

- 주문완료 시, 로그아웃 시 disconnect() 꼭 실행해줘야함.
