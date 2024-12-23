import { expect } from "chai";
import hre from "hardhat";


const AccountAddress = "0xd8058efe0198ae9dd7d563e1b4938dcbc86a1f81";
const AccountFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const EntryPointAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PaymasterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {

    var account = await hre.ethers.getContractAt("Account", AccountAddress);
    var count = await account.count();
    console.log(count);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });