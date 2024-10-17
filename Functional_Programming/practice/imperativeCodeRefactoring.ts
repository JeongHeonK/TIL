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

// 아래 처럼 만들경우 타입 불일치가 계속 발생
// 생산성 저하
async function concurrent<T>(limit: number, fs: (() => Promise<T>)[]) {
  const result: T[][] = [];
  for (let i = 0; i < fs.length / limit; i++) {
    const tmp: Promise<T>[] = [];
    for (let j = 0; j < limit; j++) {
      const func = fs[i * limit + j];
      tmp.push(func());
    }
    result.push(await Promise.all(tmp));
  }
  return result.flat();
}

export async function solution() {
  console.time();
  const files = await concurrent(3, [
    () => getFile("file1.png"),
    () => getFile("file2.pdf"),
    () => getFile("file3.png"),
    () => getFile("file4.ppt"),
    () => getFile("file5.png"),
    () => getFile("file6.gif"),
  ]);
  console.timeEnd();
}

// generator 사용

function* gen() {
  for (let i = 0; i < 4; i++) {
    yield i;
  }
}

export async function main() {
  const iterator = gen();
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());

  console.log([...gen()]);
}

function* take(length, iterable) {
  const iterator = iterable[Symbol.iterator]();
  while (--length) {
    const { done } = iterator.next();
    if (done) break;
    yield iterator.next().value;
  }
}

function* chunk<T>(size: number, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    ];
    if (arr.length) yield [...take(size, iterable)];
    if (arr.length < size) break;
    yield "hi";
  }
}
