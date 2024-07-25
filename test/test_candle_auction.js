const CandleAuction = artifacts.require("CandleAuction");

contract("CandleAuction", (accounts) => {
    it("should store the highest bid", async () => {
        const instance = await CandleAuction.deployed();
        await instance.bid({ from: accounts[0], value: web3.utils.toWei('1', 'ether') });
        const highestBid = await instance.highestBid();
        assert.equal(web3.utils.fromWei(highestBid.toString(), 'ether'), 1, "The highest bid is not stored correctly.");
    });

    it("should allow withdrawal of previous bids", async () => {
        const instance = await CandleAuction.deployed();
        
        // Bid from accounts[1] and accounts[2]
        await instance.bid({ from: accounts[1], value: web3.utils.toWei('2', 'ether') });
        await instance.bid({ from: accounts[2], value: web3.utils.toWei('3', 'ether') });

        // End the auction to make withdrawal possible
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute
        await instance.endAuction({ from: accounts[0] });

        // Withdraw the previous bid
        const initialBalance = await web3.eth.getBalance(accounts[1]);
        await instance.withdraw({ from: accounts[1] });
        const finalBalance = await web3.eth.getBalance(accounts[1]);

        assert.isTrue(
            web3.utils.toBN(finalBalance).gt(web3.utils.toBN(initialBalance)),
            "Previous bid was not withdrawn correctly."
        );
    });

    it("should end the auction correctly", async () => {
        const instance = await CandleAuction.deployed();

        // Bid from accounts[1] and accounts[2]
        await instance.bid({ from: accounts[1], value: web3.utils.toWei('2', 'ether') });
        await instance.bid({ from: accounts[2], value: web3.utils.toWei('3', 'ether') });

        // Wait for 1 minute and end the auction
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute
        await instance.endAuction({ from: accounts[0] });

        const ended = await instance.ended();
        assert.equal(ended, true, "Auction did not end correctly.");
    });
});
