// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Challenge {
    uint public count = 5;

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }
}
