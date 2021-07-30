const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Election", () => {

    it("Should be able to update the currId", async function () {
        const Election = ethers.getContractFactory("Election");
        const electionContract = await (await Election).deploy();

        await electionContract.addCandidate("John");
        expect(await electionContract.currId()).to.equal(1);
    });

    it("Should update the list of candidates", async function () {
        const Election = ethers.getContractFactory("Election");
        const electionContract = await (await Election).deploy();

        await electionContract.addCandidate("John");
        const candList = await electionContract.candidates(0);
        expect(await candList[0]).to.equal(1);
        expect(await candList[1]).to.equal("John");
    });

    it("Should make the sole candidate the current leader", async function () {
        const Election = ethers.getContractFactory("Election");
        const electionContract = await (await Election).deploy();

        await electionContract.addCandidate("John");
        expect(await electionContract.currentLeader()).to.equal("John")
    });
});
