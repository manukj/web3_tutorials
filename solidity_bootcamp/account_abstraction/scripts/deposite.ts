import hre, { ethers } from "hardhat";

const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";


async function main() {

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);

    // deposit some ether to the the one who is going to pay for the gas
    entryPoint.depositTo(PM_ADDRESS, { value: hre.ethers.parseEther("0.1") });

}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });