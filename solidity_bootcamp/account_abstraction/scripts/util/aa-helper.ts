import { ethers } from "hardhat";


export async function getEmptyPackedUserOperation() {
    const verificationGasLimit = 200_000;
    const callGasLimit = verificationGasLimit;
    const maxPriorityFeePerGas = 256n;
    const maxFeePerGas = maxPriorityFeePerGas;

    return {
        sender: ethers.ZeroAddress,
        nonce: 0n,
        initCode: "0x",
        callData: "0x",
        accountGasLimits: ethers.toBeHex((BigInt(verificationGasLimit) << 128n) | BigInt(callGasLimit), 32),
        preVerificationGas: verificationGasLimit,
        gasFees: ethers.toBeHex((BigInt(maxPriorityFeePerGas) << 128n) | BigInt(maxFeePerGas), 32),
        paymasterAndData: "0x",
        signature: "0x",
    };
}



export function getPaymasterAndData(paymaster: string): string {
    return (
        ethers.zeroPadBytes(paymaster + ethers.toBeHex("0x10000", 16).slice(2, 32), 36) +
        ethers.zeroPadValue("0x1000", 16).slice(2)
    );
}



