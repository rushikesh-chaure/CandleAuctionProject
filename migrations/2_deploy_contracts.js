const CandleAuction = artifacts.require("CandleAuction");

module.exports = function (deployer) {
    const duration = 60; // Auction duration in seconds (1 minutes)
    deployer.deploy(CandleAuction, duration);
};
