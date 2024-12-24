import hre, { ethers } from "hardhat";
import { encodePaymasterAndData, getEmptyPackedUserOperation } from "./util/aa-helper";



const FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
    const [signer0, signer1] = await hre.ethers.getSigners();
    const address0 = await signer0.getAddress();

    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
    const Account = await hre.ethers.getContractFactory("Account");


    // call data which is call function execute in the account
    const callData = Account.interface.encodeFunctionData("execute");
    // init code for creating an account
    let initCode =
        FACTORY_ADDRESS + AccountFactory.interface
            .encodeFunctionData("createAccount", [address0])
            .slice(2);

    // sender address which is the account address
    let sender = "0x";
    try {
        await entryPoint.getSenderAddress(initCode);
    } catch (ex: any) {
        sender += ex.data.data.slice(-40);
    }

    const code = (await hre.ethers.provider.getCode(sender));

    if (code !== "0x") {
        initCode = "0x" // if the account is already created then the init code will be empty
    }

    console.log({ sender })
    console.log({ initCode })
    console.log({ code })


    console.log("----------------  executing transcation  ----------------");

    // deposit some ether to the the one who is going to pay for the gas
    // in this case the smart account will be responsible for the gas fee
    // var balanceInEntryPoint = await entryPoint.balanceOf(sender);
    var balanceInEntryPoint = await entryPoint.balanceOf(PM_ADDRESS);
    if (balanceInEntryPoint <= (hre.ethers.parseEther("0.5"))) {
        // await entryPoint.depositTo(sender, { value: hre.ethers.parseEther("1") });
        await entryPoint.depositTo(PM_ADDRESS, { value: hre.ethers.parseEther("1") });
    }
    console.log({ balanceInEntryPoint });

    const userOP = await getEmptyPackedUserOperation();
    userOP.sender = sender;
    userOP.nonce = await entryPoint.getNonce(sender, 0);
    userOP.initCode = initCode;
    userOP.callData = callData;
    userOP.paymasterAndData = encodePaymasterAndData(PM_ADDRESS, 100000n, 200000n);

    const userOPHash = await entryPoint.getUserOpHash(userOP);
    userOP.signature = await signer0.signMessage(hre.ethers.getBytes(userOPHash));

    const txn = await entryPoint.handleOps([userOP], address0);
    const receipt = await txn.wait();
    console.log(receipt);

}




main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });