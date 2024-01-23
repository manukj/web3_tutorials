// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "./Hero.sol";

contract Mage is Hero(200) {
    function attack(address enemy) public override {
        super.attack(enemy);
        Enemy(enemy).takeAttack(AttackTypes.Spell);
    }
}

contract Warrior is Hero(50) {
    function attack(address enemy) public override {
        super.attack(enemy);
        Enemy(enemy).takeAttack(AttackTypes.Brawl);
    }
}
