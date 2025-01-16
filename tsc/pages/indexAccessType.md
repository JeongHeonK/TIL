### Index access types

- index를 명시하는 것이 아니라 number로 접근가능
- 이 경우 ts에서 자동으로 순회함
- 심지어 반복되는 타입들 삭제해줌

```ts
interface UserRoleConfig {
  user: ["view", "create", "update"];
  superAdmin: ["view", "create", "update", "delete"];
}

type Role = UserRoleConfig[keyof UserRoleConfig][number];
```
