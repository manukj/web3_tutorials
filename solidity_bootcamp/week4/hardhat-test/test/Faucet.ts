const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    const [owner] = await ethers.getSigners();
    const faucetAddress = await faucet.getAddress();

    //send 1 eth to faucet so that you can retrview it
    await owner.sendTransaction({
      to: faucetAddress,
      value: ethers.parseEther("1.0"),
    });

    return { faucet, owner, faucetAddress };
  }

  it("should deploy and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should  allow withdrawals below or equal to .1 ETH at a time", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    const withdrawAmount = ethers.parseEther("0.1", "ether");
    await expect(faucet.withdraw(withdrawAmount)).to.not.be.reverted;
  });

  it("should not allow withdrawals above .1 ETH at a time", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    const withdrawAmount = ethers.parseEther("0.11", "ether");
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it(" withdraw all the amount", async function () {
    const { faucet, faucetAddress } = await loadFixture(
      deployContractAndSetVariables
    );
    await faucet.withdrawAll();
    expect(await ethers.provider.getBalance(faucetAddress)).to.equal(0);
  });

  it("should not allow non-owners to withdraw", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);
    const [, nonOwner] = await ethers.getSigners();
    await expect(faucet.connect(nonOwner).withdrawAll()).to.be.reverted;
  });

  it("destroy the contract and check owner balance", async function () {
    const { faucet, owner, faucetAddress } = await loadFixture(
      deployContractAndSetVariables
    );
    expect(await ethers.provider.getBalance(faucetAddress)).to.equal(
      ethers.parseEther("1.0", "ether")
    );
    await faucet.destroyFaucet();
    expect(await ethers.provider.getBalance(faucetAddress)).to.equal(0);
  });
});
