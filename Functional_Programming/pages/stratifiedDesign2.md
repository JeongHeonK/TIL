## 계층형 설계 - 2

### 추상화 벽으로 구현을 감춘다.

세부 구현을 감춘 함수로 이루어진 계층

- 반복문이나 배열을 직접 다루는 코드를 추상화를 통해 감출 수 있음.
- 이를 통해 자료구조같은 세부 구현을 신경쓰지 않아도 된다.
- 라이브러리나 API를 만드는 것과 비슷함.
- '어떤 것을 신경쓰지 않아도 되지?'를 모아 함수로 만든 느낌.
- 추상화벽에 코드를 만드는 것은 계약과 비슷함.
  - 새로운 함수를 만들때 용어를 맞춰야 하는 등의 시간 소요가 큼.

#### 유지보수성

가장 상단에 있는 것이 바꾸기 쉽다.<br />
-> 자주 바뀌는 코드는 가능한 위쪽에 있어야 한다.

#### 테스트 가능성

가장 하단에 있는 함수를 테스트하는 것이 효율적이다.<br />
-> 영향을 주는 곳이 많기때문에 한번의 테스트로 많은 부분을 확인 가능

#### 재사용성

하단에 있을 수록 재사용성이 높다. <br />
-> 낮은 수준의 단계로 함수를 빼낼수록 재사용성이 높다.