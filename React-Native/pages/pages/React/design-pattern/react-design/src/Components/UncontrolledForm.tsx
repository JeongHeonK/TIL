import { FormEvent, useRef } from "react";

export const UncontrolledForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    if (nameInputRef.current && ageInputRef.current) {
      console.log(nameInputRef.current.value);
      console.log(ageInputRef.current.value);
    }
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Name" ref={nameInputRef} />
      <input name="age" type="number" placeholder="Age" ref={ageInputRef} />
      <input type="submit" placeholder="Submit" />
    </form>
  );
};
