import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  // networks: {
  //   arb:{
  //     url: process.env.RPC_URL,
  //     accounts: [process.env.PRIVATE_KEY],
      
  //   }
  // },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  }
};

export default config;
