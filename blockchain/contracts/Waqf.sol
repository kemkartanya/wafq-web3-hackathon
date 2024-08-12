// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Waqf {
    string public name;
    address public founder;
    address public beneficiary;
    uint256 public balance;

    constructor(string memory _name, address _beneficiary) {
        name = _name;
        founder = msg.sender;
        beneficiary = _beneficiary;
    }

    function donate() public payable {
        balance += msg.value;
    }

    function distribute(uint256 _amount) public {
        require(msg.sender == founder, "Only founder can distribute");
        require(_amount <= balance, "Insufficient balance");
        payable(beneficiary).transfer(_amount);
        balance -= _amount;
    }
}