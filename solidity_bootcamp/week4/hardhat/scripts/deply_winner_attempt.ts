import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("WinnerAttempt");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log(`WinnerAttempt address: ${await contract.getAddress()}`);
  // deployed to 0xEE2649367A14316E2bceF6a81C19373F7e93af4B
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
