const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
const path = require("path");
const mnemonic = process.env.MNEMONIC;

module.exports = {
  contracts_build_directory: path.join(__dirname, "dist/contracts"),
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    polygonscan: process.env.POLY_API_KEY,
    testnet_polygonscan: process.env.POLY_API_KEY,
    snowtrace: process.env.SNOW_API_KEY,
    testnet_snowtrace: process.env.SNOW_API_KEY,
  },
  networks: {
    develop: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "5777", // Any network (default: none)
    },
    polygon: {
      provider: () => new HDWalletProvider(mnemonic, "https://polygon-mainnet.infura.io/v3/" + process.env.INF_API),
      network_id: 137,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, "https://polygon-mumbai-bor.publicnode.com" || "https://polygon-mumbai.infura.io/v3/" + process.env.INF_API),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 50,
      gas: 9500000, // Gas sent with each transaction (default: ~6700000)
      gasPrice: 3700000000,

      skipDryRun: true,
    },
    fevm: {
      provider: () => new HDWalletProvider(mnemonic, process.env.POLY_URL),
      network_id: 314,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    fevmt: {
      provider: () => new HDWalletProvider(mnemonic, process.env.MUMB_URL),
      network_id: 3141,
      confirmations: 10,
      timeoutBlocks: 900,
      skipDryRun: true,
    },
    arbitrum: {
      provider: () => new HDWalletProvider(mnemonic, "https://arbitrum.infura.io/v3/" + process.env.INF_API),
      network_id: 200,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    arbig: {
      provider: () => new HDWalletProvider(mnemonic, process.env.ARBIG_URL),
      network_id: 421613,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    optimism: {
      provider: () => new HDWalletProvider(mnemonic, "https://optimism.infura.io/v3/" + process.env.INF_API),
      network_id: 10,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    optikovan: {
      provider: () => new HDWalletProvider(mnemonic, process.env.OPTIKOV_URL),
      network_id: 69,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    main: {
      provider: () => new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/" + process.env.INF_API),
      network_id: 1,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + process.env.INF_API),
      network_id: 4,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/" + process.env.INF_API),
      network_id: 5,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    chalen: {
      provider: () => new HDWalletProvider(mnemonic, process.env.CHALEN_URL),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, process.env.BSC_URL),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    moonriver: {
      provider: () => new HDWalletProvider(mnemonic, process.env.MOONRIVER_URL),
      network_id: 1285,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    fuji: {
      provider: () => new HDWalletProvider(mnemonic, process.env.FUJI_URL),
      network_id: 43113,
      confirmations: 10,
      timeoutBlocks: 2000,
      skipDryRun: true,
    },
    evmos: {
      provider: () => new HDWalletProvider(mnemonic, process.env.EVMOS_URL),
      network_id: 9001,
      confirmations: 10,
      timeoutBlocks: 2000,
      skipDryRun: true,
    },
    tevmos: {
      provider: () => new HDWalletProvider(mnemonic, process.env.TEVMOS_URL),
      network_id: 9000,
      confirmations: 3,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    fujix: {
      provider: function () {
        return new HDWalletProvider({ mnemonic: process.env.AVAX_MNEM, providerOrUrl: process.env.FUJI_URL, chainId: "0xa869" });
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 470000000000,
      skipDryRun: true,
    },
    mantletest: {
      provider: () => new HDWalletProvider(mnemonic, process.env.MANTLE_URL),
      network_id: 5001,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    avax: {
      provider: function () {
        return new HDWalletProvider({ mnemonic: process.env.AVAX_MNEM, providerOrUrl: process.env.AVAX_URL, chainId: "0xa86a" });
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 470000000000,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion: "london",
      },
    },
  },
};
