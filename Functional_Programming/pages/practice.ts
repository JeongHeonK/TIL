const users = [
  { name: "james", score: 30, tries: 1 },
  { name: "mary", score: 110, tries: 4 },
  { name: "henry", score: 80, tries: 3 },
];

type Users = typeof users;

// Mutable Functions

const cloneObj = <T>(obj: T) => {
  return JSON.parse(JSON.stringify(obj));
};

const recordData = <T>(arr: T, prop: string) => {
  if (Array.isArray(arr) && typeof arr[0] === "string") {
    users.forEach((val, index, array) => {
      if (val.name.toLocaleLowerCase() === arr[0].toLowerCase()) {
        array[index][prop] = arr[1];
      }
    });
  }

  return null;
};

// Pure Functions

const getScore = <T>(arr: T[], name: string) => {
  let targetObj;

  if (Array.isArray(arr)) {
    targetObj = arr.find(
      (user, index) => user[index].name.toLowerCase() === name.toLowerCase()
    );

    return [name, targetObj.score];
  }

  return null;
};

const getTries = <T>(arr: T, name: string) => {
  let targetObj;

  if (Array.isArray(arr)) {
    targetObj = arr.find(
      (user, index) => user[index].name.toLowerCase() === name.toLowerCase()
    );

    return [name, targetObj.tries];
  }

  return null;
};

const updateScore = <T>(arr: T, amt: number) => {
  if (Array.isArray(arr)) {
    const newAmt = arr[1] + amt;

    return [arr[0], newAmt];
  }

  return null;
};

const updateTries = <T>(arr: T) => {
  if (Array.isArray(arr)) {
    const newTries = arr[1] + 1;

    return [arr[0], newTries];
  }

  return null;
};

let newScore = updateScore(getScore(cloneObj(users), "henry"), 30);
recordData(newScore, "score");
recordData(updateTries(getTries(cloneObj(users), "henry")), "tries");