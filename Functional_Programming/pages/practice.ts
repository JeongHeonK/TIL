type Func = (...x: any) => any;

const pipe = (...fns: Func[]) => {
  return <T extends number>(x: T[]) =>
    fns.reduce((v: T[], fn: Func) => fn(v), x);
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

const getTotalSum = pipe(
  bootSingleScores,
  rmZeroScores,
  rmOverScores,
  scoresSum
);

const result = getTotalSum(scores);
