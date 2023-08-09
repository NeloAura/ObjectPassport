require("@nomicfoundation/hardhat-toolbox");


module.exports= {
  solidity: "0.8.19",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/d9e4d3de366746b88f8e6c91867018bd",
      accounts: ['0x00b3313aa5a01fc5f0abf26eb955600b09a678c5018e4b66e750cca783e297f8']
    }
  }
};
