import axios from "axios";
import { useDataSource } from "../CustomHooks/data-source.hook";
import { useCallback } from "react";

export type Props = {
  user: { name: string; age: number; country: string; books: string[] };
};

const fetchFromServer = (resourceUrl: string) => async () => {
  const res = await axios.get(resourceUrl);
  return res?.data;
};

export const UserInfo = ({ userId }: { userId: string }) => {
  const fetchUser = useCallback(fetchFromServer(`/user/${userId}`), [userId]);

  const user = useDataSource(fetchUser) as Props["user"];
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
