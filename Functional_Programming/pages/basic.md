## 함수형 프로그래밍 기초

- 액션, 계산, 데이터

1. 액션

- 특징
  - 부르는 시점과 횟수에 의존
  - 호출 시 주의 필요
- 고려 사항
  - 순서 보장하는 방법
  - 정확히 한번만 실행되게 보장하는 방법
  - 시간이 지나도 안전하게 상태를 바꾸는 방법

2. 계산

- 특징
  - 실행 가능
  - 실행 해야 결과 확인 가능
  - 횟수와 시점과 관련이 없음
  - 항상 같은 값 반환
- 고려 사항
  - 정확성을 위한 정적 분석
  - 수학적 지식
  - 테스트 전략

3. 데이터

- 특징
  - 실행 불가
  - 확인 가능
- 고려 사항
  - 접근성이 좋은 데이터 구성 방법
  - 데이터를 이용해 중요한 것을 발견하는 원칙