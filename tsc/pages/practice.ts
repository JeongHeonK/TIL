export const myObj = {
  a: 1,
  b: 2,
  c: 3,
};

const objectKys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};

const key = objectKys(myObj).map((key) => {
  return myObj[key];
});
