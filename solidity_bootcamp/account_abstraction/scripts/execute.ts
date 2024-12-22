import hre, { ethers } from "hardhat";
import { PackedUserOperationStruct } from "../typechain-types/contracts/Account.sol/Account";

import { AbiCoder, keccak256, BytesLike, hexlify, zeroPadValue, BigNumberish, toBeHex } from 'ethers'
import { zeroPad } from '@ethersproject/bytes'
export const hexConcat = ethers.concat;
export const hexZeroPad = zeroPadValue;
const FACTORY_NONCE = 0;
const FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ENTRYPOINT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
    const [signer0] = await hre.ethers.getSigners();
    const firstSigner = await signer0.getAddress();
    const entryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS);

    const sender = hre.ethers.getCreateAddress({
        from: FACTORY_ADDRESS, nonce: FACTORY_NONCE
    });

    const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
    const initCode = FACTORY_ADDRESS + AccountFactory.interface.encodeFunctionData("createAccount", [firstSigner]).slice(2);
    const Account = await hre.ethers.getContractFactory("Account");
    const callData = Account.interface.encodeFunctionData("execute",);


    const verificationGasLimit = 2777216n;
    const callGasLimit = verificationGasLimit;
    const maxPriorityFeePerGas = hre.ethers.parseUnits("5", "gwei");
    const maxFeePerGas = hre.ethers.parseUnits("10", "gwei");

    const accountGasLimits = packAccountGasLimits(200_000, 200_000);
    const gasFees = packAccountGasLimits(maxPriorityFeePerGas, maxFeePerGas);

    const userOP: PackedUserOperationStruct = {
        sender,
        nonce: await entryPoint.getNonce(sender, 0),
        initCode,
        callData,
        accountGasLimits,
        preVerificationGas: 200_000,
        gasFees,
        paymasterAndData: '0x',
        //still stuck in this 
        signature: hexConcat([zeroPad('0x', 1), zeroPad('0x', 1)])
    }
    const txn = await entryPoint.handleOps([userOP], firstSigner);
    const receipt = await txn.wait();
    console.log(receipt);
}

export function packAccountGasLimits(verificationGasLimit: BigNumberish, callGasLimit: BigNumberish): string {
    const verificationGasLimitHex = toBeHex(verificationGasLimit)
    const callGasLimitHex = toBeHex(callGasLimit)
    return hexConcat([
        hexZeroPad(hexlify(verificationGasLimitHex), 16), hexZeroPad(hexlify(callGasLimitHex), 16)
    ])
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });