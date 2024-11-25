import { useUser } from "../CustomHooks/useUser";

export type Props = {
  user: { name: string; age: number; country: string; books: string[] };
};

export const UserInfo = () => {
  const user = useUser() as Props["user"];
  const { name, age, country, books } = user || {};
  return user ? (
    <>
      <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ul>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
