### Request Animation Frame

- 부드러운 애니메이션 구현시 사용
- 프레임에 최적화됨

#### setInterval로 구현시

```js
const boxInterval = document.querySelector("#boxInterval");

let intervalAngle = 0;

function animationWithInterval() {
  boxInterval.style.transform = `rotate(${intervalAngle}deg)`;
  intervalAngle += 2;
}

setInterval(animationWithInterval, 16); // 60 FPS
// 이런건 보통 css로 함
```

#### Raf

```js
const boxInterval = document.querySelector("#boxInterval");

let intervalAngle = 0;

function animationWithInterval() {
  boxInterval.style.transform = `rotate(${intervalAngle}deg)`;
  intervalAngle += 2;
  requestAnimationFrame(animationWithInterval);
}

// 콜백만 필요, repainting 시점마다 함수 실행
requestAnimationFrame(animationWithInterval);
```
