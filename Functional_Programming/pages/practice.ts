type Func<T = any, R = any> = (arg: T) => R;

const pipe = <T extends number[], R extends number>(
  ...fns: Func<any, any>[]
) => {
  return (x: T): R => fns.reduce((v, fn) => fn(v), x as any);
};

const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

const bootSingleScores = <T extends number>(arr: T[]) =>
  arr.map((val: T) => (val < 10 ? val * 10 : val));

const rmOverScores = <T extends number>(arr: T[]) =>
  arr.filter((val) => {
    if (val <= 100) return true;
    return false;
  });

const rmZeroScores = <T extends number>(arr: T[]) =>
  arr.filter((val) => val > 0);

const scoresSum = <T extends number>(arr: T[]) =>
  arr.reduce((sum, val) => sum + val, 0);

const scoresCnt = <T extends number>(arr: T[]) =>
  arr.reduce((cnt) => cnt + 1, 0);

const getAverage = <T extends number>(arr: T[]) => scoresSum(arr) / arr.length;

const rmBothHighLow = pipe(rmZeroScores, rmOverScores);

const getTotalSum = pipe(bootSingleScores, rmBothHighLow, scoresSum);

const sum = getTotalSum(scores);

const average = pipe(bootSingleScores, rmBothHighLow, getAverage)(scores);
