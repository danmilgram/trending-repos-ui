// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Challenge {
    mapping(address => uint[]) public favouriteRepos;

    event newFavorite(address indexed user, uint id);


    function setFavorite(uint favId) public payable {
        favouriteRepos[msg.sender].push(favId);
        emit newFavorite(msg.sender, favId);
    }
    
    function getUserFavourites() public view returns (uint[] memory) {
      return favouriteRepos[msg.sender];
  }
}
