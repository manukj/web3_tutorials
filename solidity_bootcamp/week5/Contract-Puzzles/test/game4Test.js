const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    const signer0 = await ethers.getSigner(0);
    const signer1 = await ethers.getSigner(1);

    // nested mappings are rough :}
    await game.connect(signer1).write(signer0.address);

    await game.connect(signer0).win(signer1.address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
