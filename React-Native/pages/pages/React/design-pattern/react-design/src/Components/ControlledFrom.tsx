import { useEffect, useState } from "react";

export const UncontrolledForm = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>();

  const handleSubmit = () => {};

  useEffect(() => {
    if (name.length < 2) {
      setError(`it's empty.`);
    }
    setError("");
  }, [name]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && <p>{error}</p>}
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <input type="submit" placeholder="Submit" />
    </form>
  );
};
