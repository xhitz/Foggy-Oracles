import "../public/app.scss";

const topics = document.getElementsByClassName("topic");
const goBubble = (e) => {
  console.log(e.target.name);
};
topics.addEventListener("click", goBubble);
