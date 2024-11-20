type Proto = {
  name: string;
};

const storeUser = <T extends Proto, U extends Proto>(array: T[], user: U) => {
  const isValidUser = (elem: T) => {
    if (elem.name?.toLowerCase() === user.name.toLocaleLowerCase()) {
      return user;
    }

    return elem;
  };

  return array.map(isValidUser);
};

const getUser = <T extends Proto>(array: T[], name: string) => {
  return (
    array.find(
      (elem) => elem.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    ) || null
  );
};
