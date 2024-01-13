import { ethers } from "hardhat";

const { expect, assert } = require("chai");

describe("WinnerAttempt", function () {
  it("Should return the winner", async function () {
    const factory = await ethers.getContractFactory("Contract");
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    const winnerAttemptFactory = await ethers.getContractFactory(
      "WinnerAttempt"
    );
    const winnerAttempt = await winnerAttemptFactory.deploy();
    await winnerAttempt.waitForDeployment();

    await expect(winnerAttempt.attempt(await contract.getAddress())).to.emit(
      contract,
      "Winner"
    );
  });
});
