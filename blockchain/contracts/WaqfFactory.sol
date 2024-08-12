// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Waqf.sol";

contract WaqfFactory {
    Waqf[] public waqfs;

    function createWaqf(string memory _name, address _beneficiary) public returns (address) {
        Waqf newWaqf = new Waqf(_name, msg.sender, _beneficiary);
        waqfs.push(newWaqf);
        return address(newWaqf);
    }
}