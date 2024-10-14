export interface File {
  name: string;
  body: string;
  size: number;
}

function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), time));
}

function getFile(name: string): Promise<File> {
  return delay(1000, { name, body: "...", size: 100 });
}

// 실행할 경우 시간 측정시 1초가 나옴.
// promise.all 한번 한것처럼 동작.
async function concurrent<T>(limit: number, ps: Promise<T>[]) {
  await Promise.all([ps[0], ps[1], ps[2]]);
  await Promise.all([ps[3], ps[4], ps[5]]);
}

export async function main() {
  console.time();
  // 이미 여기서 promise가 실행되고 인자로 넘어감.
  const files = await concurrent(3, [
    getFile("file1.png"),
    getFile("file2.pdf"),
    getFile("file3.png"),
    getFile("file4.ppt"),
    getFile("file5.png"),
    getFile("file6.gif"),
  ]);
  console.timeEnd();
}

export async function solution() {
  console.time();
  // 함수로 넘겨줄 시 여기서는 promise가 실행안됨.
  const files = await concurrentSolution(3, [
    () => getFile("file1.png"),
    () => getFile("file2.pdf"),
    () => getFile("file3.png"),
    () => getFile("file4.ppt"),
    () => getFile("file5.png"),
    () => getFile("file6.gif"),
  ]);
  console.timeEnd();
}

async function concurrentSolution<T>(limit: number, ps: (() => Promise<T>)[]) {
  await Promise.all([ps[0](), ps[1](), ps[2]()]);
  await Promise.all([ps[3](), ps[4](), ps[5]()]);
}
