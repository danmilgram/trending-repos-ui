const Migrations = artifacts.require("./Challenge.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
