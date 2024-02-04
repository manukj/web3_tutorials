import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const weiAmount = (
    await ethers.provider.getBalance(deployer.address)
  ).toString();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", weiAmount);

  const token = await ethers.deployContract("Hitachi");
  await token.waitForDeployment();

  console.log("Token address:", await token.getAddress());
  // address 0xd30AB05c9f18ac5D32E30b1a826d2faDec9Fa211
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
