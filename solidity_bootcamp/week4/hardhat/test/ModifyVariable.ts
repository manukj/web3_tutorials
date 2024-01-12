import { ethers } from "hardhat";

const { expect, assert } = require("chai");

describe("ModifyVariable", function () {
  it("Should modify a variable", async function () {
    const factory = await ethers.getContractFactory("ModifyVariable");
    const contract = await factory.deploy(10);
    await contract.waitForDeployment();

    await contract.modifyToLeet();
    const value = await contract.x();
    assert.equal(value, 1337);
  });
});
