const { ethers } = require("ethers");

var Ballot = artifacts.require("ballot");
var Owner = artifacts.require("owner");
var Storage = artifacts.require("storage");

module.exports = function(deployer) {
  deployer.deploy(Storage);
  deployer.deploy(Owner);
  deployer.deploy(Ballot, [ethers.utils.formatBytes32String('test-title')]);
};