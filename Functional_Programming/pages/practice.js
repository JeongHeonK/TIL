const users = [
  { name: "james", score: 30, tries: 1 },
  { name: "mary", score: 110, tries: 4 },
  { name: "henry", score: 80, tries: 3 },
];

const storeUser = (arr, user) => {
  return arr.map((val) => {
    if (val.name.toLowerCase() === user.name.toLowerCase()) return user;
    return val;
  });
};

const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const updateTries = (arr) => {
  if (Array.isArray(arr)) {
    const newTries = arr[1] + 1;

    return [arr[0], newTries];
  }
};

const getUsersUser = pipe(curry(getUser)(users), cloneObj);

const updateHenry = pipe(
  curry(updateScore)(getUsersUser("henry")),
  cloneObj,
  updateTries,
  curry(storeUser)(users)
);
