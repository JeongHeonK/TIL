type CheckArgType<T> = T extends object ? "invalid" : T;

export const deepEqualCompare = <Arg>(
  a: CheckArgType<Arg>,
  b: CheckArgType<Arg>
): boolean => {
  if (Array.isArray(a) || Array.isArray(b)) throw new Error("invalid");

  return a === b;
};

deepEqualCompare(1, 1);
