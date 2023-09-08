import "../public/app.scss";

const serverside = document.getElementById("serverside");
const blockchain = document.getElementById("blockchain");
const backend = document.getElementById("backend");
const frontend = document.getElementById("frontend");
const interactive = document.getElementById("interactive");
const bubble = document.getElementById("speech");
const bub = document.getElementById("bubble");
const headimg = document.getElementById("headimg");
const abovehead = document.getElementById("abovehead");
const move = document.getElementById("move");
const home = document.getElementById("home");
const up = document.getElementById("btnup");
const down = document.getElementById("btndown");
const goBubble = (e) => {
  // console.log(e.target.id);
  switch (e.target.id) {
    case "serverside":
      bub.src = "./images/bubble/0.png";
      bubble.style.display = "block";
      break;
    case "blockchain":
      bub.src = "./images/bubble/1.png";
      bubble.style.display = "block";
      break;
    case "backend":
      bub.src = "./images/bubble/2.png";
      bubble.style.display = "block";
      break;
    case "frontend":
      bub.src = "./images/bubble/3.png";
      bubble.style.display = "block";
      break;
    case "interactive":
      bub.src = "./images/bubble/4.png";
      bubble.style.display = "block";
      break;
  }
};

const burst = (e) => {
  bubble.style.display = "none";
};

const paralax = (e) => {
  // console.log(window.event.clientX, window.innerWidth);
  let perc = (100 / window.innerWidth) * window.event.clientX * 1.5 - window.innerWidth / 10;
  let percY = (100 / window.innerHeight) * window.event.clientY * 0.5 + window.innerWidth / 10;
  let perc2 = ((100 / window.innerWidth) * window.event.clientX) / 2 + window.innerWidth / 10;
  headimg.style.left = perc + "px";
  headimg.style.top = -percY + "px";
  abovehead.style.left = perc2 + "px";
};

const goUp = (e) => {
  up.href = "#home";
  up.style.display = "none";
  down.style.display = "block";
};
const goDown = (e) => {
  up.style.display = "block";
  console.log(window.location.hash.split("#").pop());
  if (window.location.hash.split("#").pop() == "home" || "") {
    up.href = "#home";
    up.style.display = "block";
    down.href = "#ethos";
  }
  if (window.location.hash.split("#").pop() == "ethos") {
    up.href = "#home";
    up.style.display = "block";
    down.href = "#edutainment";
  }
  if (window.location.hash.split("#").pop() == "edutainment") {
    up.style.display = "block";
    down.href = "#development";
  }
  if (window.location.hash.split("#").pop() == "development") {
    up.style.display = "block";
    down.href = "#products";
  }
  if (window.location.hash.split("#").pop() == "products") {
    up.style.display = "block";
    down.style.display = "none";
    down.href = "#contact";
  }
};

serverside.addEventListener("mouseover", goBubble);
blockchain.addEventListener("mouseover", goBubble);
backend.addEventListener("mouseover", goBubble);
frontend.addEventListener("mouseover", goBubble);
interactive.addEventListener("mouseover", goBubble);
serverside.addEventListener("mouseleave", burst);
blockchain.addEventListener("mouseleave", burst);
backend.addEventListener("mouseleave", burst);
frontend.addEventListener("mouseleave", burst);
interactive.addEventListener("mouseleave", burst);
document.addEventListener("mousemove", paralax);
up.addEventListener("click", goUp);
down.addEventListener("click", goDown);
