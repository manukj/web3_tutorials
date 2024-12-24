import { ethers } from "hardhat";


export async function getEmptyPackedUserOperation() {
    const verificationGasLimit = 400_000;
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



export function encodePaymasterAndData(
    pmAddress: string,
    validationGasLimit: bigint,
    postOpGasLimit: bigint
): string {
    // Ensure the Paymaster address is 20 bytes
    const addressBytes = ethers.zeroPadBytes(ethers.getBytes(pmAddress), 20);

    // Encode the validation and post-op gas limits as 16 bytes each
    const validationGasBytes = ethers.zeroPadValue(ethers.toBeHex(validationGasLimit), 16);
    const postOpGasBytes = ethers.zeroPadValue(ethers.toBeHex(postOpGasLimit), 16);

    // Concatenate the address and gas limit bytes
    return ethers.concat([addressBytes, validationGasBytes, postOpGasBytes]);

}



