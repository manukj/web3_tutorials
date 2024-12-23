
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const AccountAbstractionModule = buildModule("AccountAbstractionModule", (m) => {

  const af = m.contract("AccountFactory");
  const pm = m.contract("Paymaster");
  const eP = m.contract("EntryPoint");


  return { eP, af, pm };
});

export default AccountAbstractionModule;