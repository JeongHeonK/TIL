function createCounterBtn(id) {
  const btn = document.getElementById(id);
  let count = 0;

  btn.addEventListener("click", function () {
    count++;
    console.log(count);
    btn.innerText = `Clicked ${count} time`;
  });
}
