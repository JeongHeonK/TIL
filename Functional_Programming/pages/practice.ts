type Func<T = any, R = any> = (arg: T) => R;

type CurriedFunction<Args extends any[], R> = Args extends [
  infer First,
  ...infer Rest
]
  ? (arg: First) => CurriedFunction<Rest, R>
  : R;

function curry<Args extends any[], R>(
  fn: (...args: Args) => R
): CurriedFunction<Args, R> {
  return (function nextCurried(prevArgs: any[]) {
    return function curried(nextArg: any) {
      const args = [...prevArgs, nextArg];
      if (args.length >= fn.length) {
        return fn(...(args as Args));
      } else {
        return nextCurried(args);
      }
    };
  })([]) as unknown as CurriedFunction<Args, R>;
}

const pipe = <T extends number[], R extends number>(
  ...fns: Func<number, number>[]
) => {
  return (x: T): R => fns.reduce((v, fn) => fn(v), x as any);
};

const ffun = function <T extends number>(a: T, b: T, c: T) {
  return a + b + c;
};

const gfun = function <T extends number>(d: T, e: T) {
  return d + e;
};

const hfun = function <T extends number>(f: T, g: T, h: T) {
  return f + g + h;
};
