import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [`${process.env.TEST_NET_PRIVATE_KEY}`],
    },
  },
};

export default config;
