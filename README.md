# Candle Auction Contract Setup Guide

## Project Overview

### Candle Auction

The Candle Auction is a type of auction where bids are placed over a fixed period, known as the auction duration. The auction ends when a predefined time elapses. The highest bid at the end of the auction wins, and other bids can be withdrawn by their respective bidders. This project implements a simple Candle Auction smart contract using Ethereum’s Solidity language and the Truffle framework.

### Features

- **Bid Management**: Allows participants to place bids.
- **Highest Bid Tracking**: Tracks the highest bid and its owner.
- **Auction End Handling**: Ends the auction after a set duration and transfers the highest bid amount to the auction owner.
- **Bid Withdrawal**: Enables participants to withdraw their bids if they are not the highest bidder at the end of the auction.

## 1. Introduction

This guide will walk you through setting up a Candle Auction contract using Truffle. We will cover creating the contract, deploying it, interacting with it, and writing tests to ensure its functionality.

## 2. Prerequisites

- Node.js and npm installed
- Truffle installed (`npm install -g truffle`)
- A local Ethereum blockchain (e.g., Ganache)

## 3. Steps to Setup
### 1. Clone the repositery

   ```bash
   git clone https://github.com/rushikesh-chaure/CandleAuctionProject
   ```

### 2. Compile the Contract

   ```bash
   truffle compile
   ```

### 3. Start Ganache:
Open Ganache and start a new workspace or quickstart.
### 4. Deploy the Contract

   ```bash
   truffle migrate --reset
   ```

### 5. Open the Truffle Console

   ```bash
   truffle console
   ```
### 6. Interact with the Contract

   ```bash
   let instance = await CandleAuction.deployed();
let accounts = await web3.eth.getAccounts();

// Place a bid
await instance.bid({ from: accounts[0], value: web3.utils.toWei('1', 'ether') });

// Check highest bid
let highestBid = await instance.highestBid();
console.log(web3.utils.fromWei(highestBid.toString(), 'ether'));

// Wait for auction to end
await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute

// End the auction
await instance.endAuction({ from: accounts[0] });

// Check if auction ended
let ended = await instance.ended();
console.log(ended);

   ```
# Thank You

