import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("Contract");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log(`Contract address: ${await contract.getAddress()}`);
  // deployed to 0xa7655Bb1738bF58E07b6608a49eE9e8f20083C61
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
