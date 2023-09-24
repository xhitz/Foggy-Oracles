const pdim = document.getElementById("projectdimensions");
const hIn = document.getElementById("heightIn");
const wIn = document.getElementById("widthIn");
const factor = document.getElementById("factor");
const go = document.getElementById("giveDim");
const IAO = {
  name: "tCO2",
  description: "Non Fungible Carbon Offset Asset",
  image: "https://ipfs.io/ipfs/QmeJXeLpYMu2eXybqe4RAkSKBiw6FMnVLnCScjUptHSczP",
  attributes: [
    {
      trait_type: "tCO2",
      value: "Non Fungible Carbon Offset Asset",
    },
    {
      trait_type: "Asset Value",
      value: "1 tCO2 = 10 xCO2",
    },
    {
      display_type: "boost_number",
      trait_type: "Locked xCO2",
      value: 10,
    },
    {
      display_type: "boost_percentage",
      trait_type: "Expected Impact",
      value: 99,
    },
    {
      display_type: "number",
      trait_type: "Generation",
      value: 1,
    },
  ],
  metadata: {
    /* general project data
     *
     *
     * @project_name requires the name of the collection
     * @contract_address requires the contract address of the collection
     */
    project_name: "tCO2_NFT_CARBON_OFFSET",
    contract_address: "0x012345678901234567890123456789012345678901",
    /* author data
     *
     *
     * @name requires name of the collection author *optional
     * @email requires the authors email *optional
     * @address requires authors eth wallet address
     */
    author: {
      name: "stereoIII6.x",
      email: "stereo@iii6.xyz",
      address: "stereoiii6.x",
    },
    /* commpany data
     *
     *
     * @name requires the company name
     * @email requires the company email *optional
     * @register.address requires company resident address
     * @register.jurisduction requires legal jurisdiction
     * @register.id requires comercial license id
     */
    company: {
      name: "Carbon Market Exchange",
      email: "info@carbonmarketexchange.com",
      register: {
        address: "",
        jurisdiction: "",
        id: "",
      },
    },
    /* token data
     *
     *
     * @name requires the token name
     * @symbol requires the token symbol
     * @maxsupply requires integer total token supply
     * @greenlist requires integer total greenlist supply
     * @maxmint requires integer max mint per walet
     * @maxown requires integer max tokens per wallet
     * @autoreveal requires boolean do tokens reveal instant
     * @price requires integer token price
     * @greenlistprice requires integer greenlist price
     */
    tokens: {
      name: "tCO2 NFT Carbon Offset",
      symbol: "tCO2",
      maxsupply: 0,
      greenlist: 0,
      maxmint: 0,
      maxown: 0,
      autoreveal: false,
      price: 0,
      greenlistprice: 0,
    },
    /* dimension data
     *
     *
     * @x requires integer width of doc in px
     * @y requires integer height of doc in px
     */
    dimensions: {
      x: 2100,
      y: 2970,
    },
    /*  storage data
     *
     *
     * @IAOpath requires absolute path to main storage
     * @imgdir requires relative path to image dir
     * @prereveal requires relative path prereveal dir
     */
    storage: {
      IAOpath: "https://ipfs.io/ipfs/",
      imgdir: "images/",
      prereveal: "https://ipfs.io/ipfs/QmeJXeLpYMu2eXybqe4RAkSKBiw6FMnVLnCScjUptHSczP",
    },
  },
  layers: [
    {
      id: 0,
      content: {
        type: "image", // options(symbol, font, image, audio, video)
        path: "backgrounds/", // path to type content data
        color: false, // for symbol & font only :: in hex format #abcdef
        border: false, // for symbol only :: in hex format #abcdef
        autoplay: false, // for audio and video only
      },
      feed: {
        type: "user", // options(oracle, external, internal, user)
        name: "mouseParalax", //
        address: false,
        init: 0,
      },
      keys: [{ id: 0, x: 0, y: 0, sx: 1, sy: 1, r: 0, o: 1 }, { id: 1 }, { id: 2 }, { id: 3 }],
    },
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ],
};
export const calcDimensions = (width, height) => {
  let newWidth;
  let newHeight;
  let sizeFactor;
  if (width === height) {
    // square mode
    console.log("square", width, height);
    newWidth = 600;
    newHeight = 600;
    sizeFactor = width / 600;
  } else {
    if (width > height) {
      // landscape mode
      console.log("landscape", width, height);
      newWidth = 600;
      sizeFactor = width / 600;
      newHeight = height / sizeFactor;
    } else if (height > width) {
      // portrait mode
      console.log("portrait", width, height);
      newHeight = 600;
      sizeFactor = height / 600;
      newWidth = width / sizeFactor;
    }
  }
  pdim.style.width = newWidth + "px";
  pdim.style.height = newHeight + "px";
  // factor.innerHTML = sizeFactor;
  pdim.style.left = `calc( 50% - ${newWidth / 2}px )`;
  pdim.style.top = `calc( 50% - ${newHeight / 2}px )`;
  console.log("w" + newWidth, "h" + newHeight, "f" + sizeFactor);
};
export const setDimensions = (e) => {
  console.log(wIn.value, hIn.value);
  calcDimensions(Number(wIn.value), Number(hIn.value));
};
// go.addEventListener("click", setDimensions);
