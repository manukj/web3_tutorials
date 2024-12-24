const hre = require("hardhat");

const ACCOUNT_ADDR = "0xeef8be09bf13ac9633e71908c20dff75116cd582";

async function main() {
  const account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDR);
  const count = await account.count();
  console.log(count);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
