import { ethers } from "hardhat";

async function main() {
  var sepolia = await deployContract("Sepolia");
}

async function deployContract(name: string) {
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
