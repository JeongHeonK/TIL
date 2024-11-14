type Props = {
  author: {
    name: string;
    age: number;
  };
};

export const SmallListItems = ({ author }: Props) => {
  const { name, age } = author;
  return (
    <p>
      Name: {name}, Age: {age}
    </p>
  );
};
