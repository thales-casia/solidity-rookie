const {MNEMONIC, PROJECT_ID} = process.env;
const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require('path');
module.exports = {
  contracts_build_directory: path.join(__dirname, "/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
      network_id: 5,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    }
  },
  dashboard: {
    port: 24012
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.16"
    }
  }
};
