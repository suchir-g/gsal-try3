const cursorTag = document.querySelector(".cursors");
const balls = cursorTag.querySelectorAll("div");

let aimX = 0;
let aimY = 0;

const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

balls.forEach((ball, index) => {
  let currX = 0;
  let currY = 0;
  // d = randomNum(0, 1) == 0 ? 1 : -1;
  // let speed = 0.25 + d * index * 0.007;
  let speed = 0.25 + -1 * index * 0.007;

  const animate = () => {
    currX += (aimX - currX) * speed;
    currY += (aimY - currY) * speed;
    ball.style.left = currX + "px";
    ball.style.top = currY + "px";
    requestAnimationFrame(animate);
  };

  animate();
});

document.addEventListener("mousemove", (e) => {
  aimX = e.pageX;
  aimY = e.pageY;
});
