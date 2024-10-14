function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), time));
}

export async function main() {
  const a = await delay(1000, 10);
  const b = await delay(1000, "b");

  return [a, b] as const;
}

/**
 * Promise.race는 언제 쓰는가?
 *  -> 가장 빠른거 한개 -> 네트워크 제한을 걸 수 있음.
 *
 * Promise.all 모든 promise 종료 시 사용
 */

export interface File {
  name: string;
  body: string;
  size: number;
}

function getFile(name: string): Promise<File> {
  return delay(3000, { name, body: "...", size: 100 });
}

export async function main2() {
  const result = await Promise.race([
    getFile("file1.png"),
    //하단 코드가 네트워크 시간 측정 및 제한하는 역할을 함.
    delay(2000, "network slow"),
  ]);

  if (result === "network slow") {
    console.log("네트워크 환경 확인해주세요.");
  }

  return result;
}

// 응용
// 오래 걸리는 경우 바로 로딩창을 발생 시킬 수 있음.

export async function main3() {
  const file = getFile("file1.png");

  const result = await Promise.race([file, delay(2000, "network slow")]);

  if (result === "network slow") {
    console.log("loading..");
    console.log(await file);
  } else {
    console.log("즉시 실행", result);
  }

  return result;
}
