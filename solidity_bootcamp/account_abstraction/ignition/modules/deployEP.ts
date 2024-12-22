// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const EntryPointModule = buildModule("EntryPoint", (m) => {

  const entryPoint = m.contract("EntryPoint");


  return { entryPoint };
});

export default EntryPointModule;
