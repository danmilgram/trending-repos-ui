// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Challenge {
  mapping (address => uint256) values;

  function getValue(address _addr) public pure returns (bytes32 storagePointer) {
      return keccak256(abi.encodePacked(_addr, "0") );
  }

}    