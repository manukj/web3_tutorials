// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    uint public totalSupply = 0;
    string public name = "Hitachi";
    string public symbol = "HIT";
    uint public decimals = 18;
    event Transfer(address indexed from, address indexed to, uint value);

    mapping(address => uint) balances;

    constructor(){
        totalSupply = 1000 * (10 ** decimals);
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint) {
        return balances[_owner];
    }

    function transfer(address _to,uint _value) public returns (bool) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}