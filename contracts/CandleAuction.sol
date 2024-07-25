// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CandleAuction {
    address public highestBidder;
    uint public highestBid;
    uint public endTime;
    bool public ended;
    address public owner;

    mapping(address => uint) public bids;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    constructor(uint _duration) {
        owner = msg.sender;
        endTime = block.timestamp + _duration;
    }

    function bid() public payable {
        require(block.timestamp < endTime, "Auction already ended");
        require(msg.value > highestBid, "There already is a higher bid");

        if (highestBid != 0) {
            // Refund the previous highest bidder
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function withdraw() public {
        uint amount = bids[msg.sender];
        require(amount > 0, "No funds to withdraw");

        bids[msg.sender] = 0;

        payable(msg.sender).transfer(amount);
    }

    function endAuction() public {
        // if()
        require(block.timestamp >= endTime, "Auction not yet ended");
        require(!ended, "Auction end already called");

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // Transfer the highest bid to the owner
        payable(owner).transfer(highestBid);
    }
}
