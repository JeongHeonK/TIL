const boxInterval = document.querySelector("#boxInterval");

let intervalAngle = 0;

function animationWithInterval() {
  boxInterval.style.transform = `rotate(${intervalAngle}deg)`;
  intervalAngle += 2;
  requestAnimationFrame(animationWithInterval);
}

// 콜백만 필요, repainting 시점마다 함수 실행
requestAnimationFrame(animationWithInterval);
