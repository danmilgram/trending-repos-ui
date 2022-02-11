const Migrations = artifacts.require("./Favourites.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
