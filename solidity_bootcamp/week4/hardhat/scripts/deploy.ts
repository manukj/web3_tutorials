import { ethers } from "hardhat";

async function main() {
  var contract = await deployContract("Contract");
  console.log("Contract address: ", await contract.getAddress());

  // contract address 0x34F6666C4e284c9e40a03541D844124050F3d4B4
  // var winner = await deployContract("WinnerAttempt");
  // console.log("Winner contract address: ", await winner.getAddress());
}

export async function deployContract(name: string) {
  const factory = await ethers.getContractFactory(name);
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log(`${name} deployed to ${contract.target}`);
  console.log(`${name} address: ${await contract.getAddress()}`);
  return contract;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
