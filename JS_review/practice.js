import fs from "fs";

fs.readFile("./passage1.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success");
    console.log(data);
    fs.readFile("./passage2.txt", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        console.log(data);
        fs.readFile("./passage3.txt", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("success");
            console.log(data);
          }
        });
      }
    });
  }
});

function readFile(dir) {
  return new Promise((resolve, reject) => {
    fs.readFile("./passage1.txt", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function getFiles() {
  try {
    const result1 = await readFile("./passage1.txt");
    console.log(result1);
    const result2 = await readFile("./passage2.txt");
    console.log(result2);
    const result3 = await readFile("./passage3.txt");
    console.log(result3);
  } catch (error) {
    console.log(error.message);
  }
}

getFiles();
