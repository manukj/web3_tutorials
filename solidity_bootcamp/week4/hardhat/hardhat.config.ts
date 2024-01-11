import "@nomicfoundation/hardhat-toolbox";
import dotEnv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotEnv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks:{
     
  }
};

export default config;
