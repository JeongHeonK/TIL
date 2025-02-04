const search = document.getElementById("search");

const debounce = (fn, duration) => {
  let timerId;

  return function (e) {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(e);
    }, duration * 1000);
  };
};

search.addEventListener(
  "input",
  debounce(async (e) => {
    const q = e.target.value;
    try {
      const res = await fetch(`url/search?q=${q}`);
      const result = await res.json();

      const resultDiv = document.createElement("div");
      resultDiv.innerText = result;
      document.body.append(resultDiv);
    } catch {
      const resultDiv = document.createElement("div");
      resultDiv.innerText = "error occurred";
      document.body.append(resultDiv);
    }
  }, 1)
);
