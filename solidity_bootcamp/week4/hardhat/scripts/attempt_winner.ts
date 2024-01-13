import { ethers } from "hardhat";

async function main() {
  var winnerAttemptAddress = "0xEE2649367A14316E2bceF6a81C19373F7e93af4B";
  var winnerAttemptContract = await ethers.getContractAt(
    "WinnerAttempt",
    winnerAttemptAddress
  );

  var contractAddress = "0xa7655Bb1738bF58E07b6608a49eE9e8f20083C61";
  var tnx = await winnerAttemptContract.attempt(contractAddress);
  console.log(tnx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
