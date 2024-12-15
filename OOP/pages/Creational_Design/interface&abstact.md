### interface vs abstract

**_abstract class_**

- abstract는 constructor가 있으며 구현가능
- extends를 통해서 공통 메서드 상속 가능.
- constructor 내부 코드 `super()`를 통해서 자동화 가능.

**_interface_**

- 단순히 클래스말고 일반 객체 타입 만들때 사용.
- implement를 통해 다중 상속 가능(믹스인)
- 그러나 단순히 타입 정의일 뿐이지 구현체가 아님

즉,<br/>
interface는 **구현을 강제**하며, 메서드 수정은 구현체에서만 가능<br/>
abstract는 **강제와 선택 모두를 포함**하며, 수정(오버라이딩)이 가능<br/>
