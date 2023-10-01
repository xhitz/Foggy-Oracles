import "../polyfills";
import { loadKeys, storeKeys } from "./helpers.ts";
import "../public/app.scss";
import UAuth from "@uauth/js";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import Resolution from "@unstoppabledomains/resolution";
const res = "_vrdmtqr44wuho935cv9hg7nuergvnfrv3brwvvkpzonlkzs";
const resolution = new Resolution({ apiKey: res });

const clientOptions = {
  env: "production",
};

const uauth = new UAuth({
  clientID: "7156f6a9-9afe-49e0-a0cc-2edaf1a5aa3b",
  redirectUri: "http://localhost:3000",
  scope: "openid wallet messaging:notifications:optional",
});
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const udchat = document.getElementById("udchat");
const chat = document.getElementById("chat");
const list = document.getElementById("convolist");
const title = document.getElementById("convostitle");
let UDT = false;
let signer;
let provider;
let xmtp;

const log = async () => {
  provider = new ethers.providers.Web3Provider(ethereum);
  await provider.send("eth_accounts", []);

  signer = await provider.getSigner();
  xmtp = await Client.create(signer, { env: "production" });
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
  const allConversations = await xmtp.conversations.list();
  console.log(allConversations);
  allConversations.map(async (convo) => {
    const messages = await convo.messages();
    console.log(messages[0]);
    list.innerHTML += `<div id='${convo.peerAddress}' class="convolistitem"><h2>${convo.peerAddress} - ${messages.length}</h2><i>${messages[messages.length - 1].sent}</i><h3>${messages[messages.length - 1].content}</h3><div class="btn">GO</div></div>`;
  });
};
const newConvo = async (adr) => {
  const conversation = await xmtp.conversations.newConversation(adr);
  console.log("convo: ", conversation);
  // Load all messages in the conversation
};
const sendMsg = async (adr, msg) => {
  const bot = adr;
  // Start a conversation with XMTP
  console.log(bot);
  const isOnNetwork = await Client.canMessage(bot, { env: "production" });
  console.log(isOnNetwork);
  // Send a message
  await conversation.send("[" + message.senderAddress + "] : " + msg);
  // Listen for new messages in the conversation
  for await (const message of await conversation.streamMessages()) {
    console.log(msg);
    console.log(`[${message.senderAddress}]: ${message.content}`);
  }
};

login.addEventListener("click", window.login);
logout.addEventListener("click", window.logout);
udchat.addEventListener("click", loadConvos);
