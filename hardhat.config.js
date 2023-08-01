import "@nomicfoundation/hardhat-toolbox";

/** @type import('hardhat/config').HardhatUserConfig */
export const solidity = "0.8.19";
export const paths = {
  artifacts: './src/artifacts',
};
export const networks = {
  hardhat: {
    chainId: 1337
  }
};