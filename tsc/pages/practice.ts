interface UserRoleConfig {
  user: ["view", "create", "update"];
  superAdmin: ["view", "create", "update", "delete"];
}

type Role = UserRoleConfig[keyof UserRoleConfig][number];
