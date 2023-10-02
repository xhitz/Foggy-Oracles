import "../polyfills";
import { loadKeys, storeKeys } from "./helpers.ts";
import "../public/app.scss";
import UAuth from "@uauth/js";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import Resolution from "@unstoppabledomains/resolution";

// !! public private key of s0x messaging inbox !!
// !! wallet is empty do not send funds to this wallet !!
// !! 0x0000015FF422de199B42dF29C29009Ea651F2CcE !!
const pKey = "d272af7e40ecbcb9583cdd739df6303b15347d289ceb15b02fc16830790f0a96";
// !! auto redirect script on every evm chain to prevent fraud active 247 !!
const resolution = new Resolution({ apiKey: res });

const clientOptions = {
  env: "production",
};

const uauth = new UAuth({
  clientID: "7156f6a9-9afe-49e0-a0cc-2edaf1a5aa3b",
  redirectUri: "http://stereo.iii6.xyz/",
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
const chat = document.getElementById("chat");
const list = document.getElementById("msgscreen");
const chatbox = document.getElementById("chatbox");
const convoscreen = document.getElementById("convoscreen");
const msgin = document.getElementById("msgin");
const send = document.getElementById("send");

let UDT = false;
let signer;
let inbox;
let provider;
let xmtp;
let inbx;

const log = async () => {
  provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);

  signer = await provider.getSigner();
  inbox = new ethers.Wallet(pKey, provider);
  xmtp = await Client.create(signer, { env: "production" });
  inbx = await Client.create(inbox, { env: "production" });
};
window.login = async () => {
  try {
    const authorization = await uauth.loginWithPopup();

    login.innerHTML = '<img src="./images/udlogo.png" id="udlogo" />' + authorization.idToken.sub;
    login.removeEventListener("click", window.login);
    login.addEventListener("click", toggleUD);
    const address = authorization.idToken.wallet_address;

    let keys = loadKeys(address);
    await log();
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
      storeKeys(address, keys);
    }
    const client = await Client.create(null, {
      ...clientOptions,
      privateKeyOverride: keys,
    });
    // console.log("sign: ", client);
    // console.log(authorization.idToken.sub, authorization.idToken.wallet_address, authorization.idToken.eip4361_signature, client);
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
    chat.style.display = "none";
  }
};
const getWalletAddr = (domain, ticker) => {
  resolution
    .addr(domain, ticker)
    .then((address) => console.log(`Domain ${domain} has address for ${ticker}: ${address}`))
    .catch(console.error);
};
const reverseTokenId = async (address) => {
  resolution
    .reverseTokenId(address)
    .then((tokenId) => console.log(address, "reversed to", tokenId))
    // tokenId consists the namehash of the domain with reverse resolution to that address
    .catch(console.error);
};

const reverseUrl = async (address) => {
  resolution
    .reverse(address, { location: "UNSLayer2" })
    .then((domain) => console.log(address, "reversed to url", domain))
    // domain consists of the domain with reverse resolution to that address
    // use this domain in your application
    .catch(console.error);
};
const msgs = async (convo) => {
  const messages = await convo.messages();
  return messages;
};
const loadConvos = async () => {
  let chmsg = [];
  list.innerHTML = "";
  chat.style.display = "grid";
  const allConversations = await inbx.conversations.list();
  let l = allConversations.length;
  console.log(l);
  for (let i = 0; i < l; i++) {
    const messages = await allConversations[i].messages();
    chmsg = chmsg.concat(messages);
  }
  chmsg.sort((a, b) => (a.sent > b.sent ? -1 : 1));
  // console.log(chmsg, chmsg.length);
  chmsg.map((msg) => {
    console.log(msg);
    list.innerHTML += `<div id='${msg.id}' class="listitem"><h3>${msg.senderAddress}</h3><i>${msg.sent}</i><h5>${msg.content}</h5></div>`;
  });
};
const newConvoWith = async (adr) => {
  const conversation = await xmtp.conversations.newConversation(adr);
  console.log("convo: ", conversation);
  // Load all messages in the conversation
};
const sendChatMsg = async (msg) => {
  const chatroom = "0x0000015FF422de199B42dF29C29009Ea651F2CcE";
  // Start a conversation with XMTP
  const conversation = await xmtp.conversations.newConversation(chatroom);
  // Send a message
  await conversation.send(msg);
  // Listen for new messages in the conversation
  for await (const message of await conversation.streamMessages()) {
    console.log(msg);
    console.log(`[${message.senderAddress}]: ${message.content}`);
    loadConvos();
  }
};
const chatSend = () => {
  console.log(msgin.value);
  sendChatMsg(msgin.value);
  msgin.value = "";
};
send.addEventListener("click", chatSend);
const sendMsgTo = async (adr, msg) => {
  // Start a conversation with XMTP
  const conversation = await xmtp.conversations.newConversation(adr);
  const isOnNetwork = await Client.canMessage(adr, { env: "production" });
  console.log(isOnNetwork);
  // Send a message
  await conversation.send(msg);
  // Listen for new messages in the conversation
  for await (const message of await conversation.streamMessages()) {
    console.log(msg);
    console.log(`[${message.senderAddress}]: ${message.content}`);
  }
};

login.addEventListener("click", window.login);
logout.addEventListener("click", window.logout);
udchat.addEventListener("click", loadConvos);

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
