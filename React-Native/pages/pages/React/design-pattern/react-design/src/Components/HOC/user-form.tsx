import { includeUpdatableUser } from "./include-updateable-userData";

export const UserInfoForm = includeUpdatableUser(
  ({ user, onChange, onPost, onReset }) => {
    return user ? (
      <>
        <label>
          name:
          <input
            name="name"
            type="text"
            value={user?.name}
            onChange={(e) => onChange({ userName: e.target.value })}
          />
        </label>
        <label>
          age:
          <input
            name="age"
            type="number"
            value={user?.age}
            onChange={(e) => onChange({ userAge: Number(e.target.value) })}
          />
        </label>
        <button onClick={onReset}>Reset</button>
        <button onClick={onPost}>Save</button>
      </>
    ) : (
      <h3>loading....</h3>
    );
  },
  "userid"
);
