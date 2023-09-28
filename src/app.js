import "../polyfills";
import "../public/app.scss";
import UAuth from "@uauth/js";
import { Client } from "@xmtp/xmtp-js";

let wallet_address;
const loadUD = async () => {
  // Load all messages in the conversation
  const messages = await conversation.messages();
  // Send a message
  await conversation.send("gm");
  // Listen for new messages in the conversation
  for await (const message of await conversation.streamMessages()) {
    console.log(`[${message.senderAddress}]: ${message.content}`);
  }
};

const uauth = new UAuth({
  clientID: "03412090-fe20-4d05-94aa-36f316b2ffac",
  redirectUri: "http://localhost:3000",
  scope: "openid wallet messaging:notifications:optional",
});

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
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const udchat = document.getElementById("udchat");
let UDT = false;

window.login = async () => {
  try {
    const authorization = await uauth.loginWithPopup();

    console.log(authorization.idToken.sub, authorization.idToken.wallet_address, authorization.idToken);
    login.innerHTML = '<img src="./images/udlogo.png" id="udlogo" />' + authorization.idToken.sub;
    login.removeEventListener("click", window.login);
    login.addEventListener("click", toggleUD);
    let signer = authorization.idToken.wallet_address;

    let keys = loadKeys(wallet_address);
    if (!keys) {
      keys = await Client.getKeys(signer, {
        ...clientOptions,
        // we don't need to publish the contact here since it
        // will happen when we create the client later
        skipContactPublishing: true,
        // we can skip persistence on the keystore for this short-lived
        // instance
        persistConversations: false,
      });
      storeKeys(wallet_address, keys);
    }
    const xmtp = await Client.create(wallet_address, { env: "dev" });
    // Start a conversation with XMTP
    const conversation = await xmtp.conversations.newConversation(signer);
  } catch (error) {
    console.error(error);
  }
};
window.logout = async () => {
  await uauth.logout();
  console.log("Logged out with Unstoppable");
  toggleUD();
  login.innerHTML = '<img src="./images/udlogo.png" id="udlogo" /> Login';
  login.removeEventListener("click", toggleUD);
  login.addEventListener("click", window.login);
};

const toggleUD = (e) => {
  UDT = !UDT;
  if (UDT === true) {
    logout.style.display = "block";
    udchat.style.display = "block";
  } else {
    logout.style.display = "none";
    udchat.style.display = "none";
  }
};

login.addEventListener("click", window.login);
logout.addEventListener("click", window.logout);
udchat.addEventListener("click", loadUD);

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
