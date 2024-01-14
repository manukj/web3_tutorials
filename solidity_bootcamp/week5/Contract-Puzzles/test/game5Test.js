const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

function generateRandomWallet() {
  const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
  const address = wallet.address;
  const threshold = ethers.utils.hexZeroPad(
    "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf",
    20
  );

  if (
    ethers.utils.hexDataSlice(address, 0, 20) <
    ethers.utils.hexDataSlice(threshold, 0, 20)
  ) {
    return wallet;
  } else {
    return generateRandomWallet();
  }
}

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }

  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    const signer = generateRandomWallet();

    // send 1 eth to signer to call the function
    const defaultAccount = await ethers.getSigner(0);
    await defaultAccount.sendTransaction({
      to: signer.address,
      value: ethers.utils.parseEther("1.0"), // 1 Ether
    });

    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
