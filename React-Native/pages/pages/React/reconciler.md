### reconciler

scheduler는 적절한 타이밍에 우선순위를 판단하여 WORK를 실행<br />
WORK 실행에 관한 우선순위 관련 값은 언제 이벤트가 발생하느냐<br />
즉, expiration Time은 발생 시점.<br />
이 값을 reconciler가 fiber에 expirationTime 할당<br />

#### reconciler의 사전 작업

1. 해당 컴포넌트에서 이벤트가 발생했음을 알려주는 expirationTime을 할당
2. 이벤트가 발생한 컴포넌트의 VDOM root를 가져옴
3. root에 스케쥴링 정보를 기록

#### root란?

`ReactDOM.render()` 호출로 컴포넌트를 삽입하는 부모 태그가 root(<div id='root'></div>) <br />
root:VDOM = 1:1 <br />
VDOM 업데이트를 위한 WORK 실행 우선순위 관련 값인 스케쥴링 정보는 root에 할당!
