// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Favourites {
    mapping(address => uint[]) public favouriteRepos;

    event newFavorite(address indexed user, uint id);


    function setFavorite(uint favId) public payable {
        favouriteRepos[msg.sender].push(favId);
        emit newFavorite(msg.sender, favId);
    }

    function unsetFavorite(uint favId) public payable {

        for (uint j = 0; j < favouriteRepos[msg.sender].length; j++) {
            if (favId == favouriteRepos[msg.sender][j]){
              delete favouriteRepos[msg.sender][j];
            }
        }
    }    
    
    function getUserFavourites() public view returns (uint[] memory) {
      return favouriteRepos[msg.sender];
  }
}
