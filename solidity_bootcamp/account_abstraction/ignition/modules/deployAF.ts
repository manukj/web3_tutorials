
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const EntryPointModule = buildModule("AccountFactoryModule", (m) => {

  const af = m.contract("AccountFactory");


  return { af };
});

export default EntryPointModule;
