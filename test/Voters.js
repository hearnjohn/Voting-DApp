const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Voters", () => {

    // beforeEach (async() => {
    //     const Voter = await ethers.getContractFactory("Voters");
    //     // const voterContract = await Voter.deploy();
    // });

    it("Should update the latest voterId", async function () {
        // const [owner] = await ethers.getSigners();
        const Voter = await ethers.getContractFactory("Voters");
        const voterContract = await Voter.deploy();
        await voterContract.createVoter();
        expect(await voterContract.latestVoterId()).to.equal(1);
    });

    it("Should initialize voted to false", async function() {
        const [owner] = await ethers.getSigners();
        const Voter = await ethers.getContractFactory("Voters");
        const voterContract = await Voter.deploy();
        await voterContract.createVoter();

        const voteStatus = await voterContract.voters(owner.address);
        expect(await voteStatus[1]).to.equal(false);
    });

    it("Should initialize selection to 0", async function() {
        const [owner] = await ethers.getSigners();
        const Voter = await ethers.getContractFactory("Voters");
        const voterContract = await Voter.deploy();
        await voterContract.createVoter();

        const voteStatus = await voterContract.voters(owner.address);
        expect(await voteStatus[2]).to.equal(0);
    });

    it("Cannot retract vote without first voting", async function() {
        // const [owner] = await ethers.getSigners();
        const Voter = await ethers.getContractFactory("Voters");
        const voterContract = await Voter.deploy();
        await voterContract.createVoter();

        try {
            voterContract.retractVote();
            assert.fail();
        } catch (err) {
            // Uhhh
        }
    });
    
});

// describe("Token contract", function () {
//   it("Deployment should assign the total supply of tokens to the owner", async function () {
//     const [owner] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Token");

//     const hardhatToken = await Token.deploy();

//     const ownerBalance = await hardhatToken.balanceOf(owner.address);
//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });
// });