import { ethers } from "ethers";
import { useState } from 'react';
import Election from '../artifacts/contracts/Election.sol/Election.json';
import Voter from "../artifacts/contracts/Voters.sol/Voters.json";


// need to update these after deployment
const voterAddress = "0x0"
const electionnAddress = "0x0"

function App() {
    const [candId, candName] = useState()

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    }

    async function createVoter() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(voterAddress, Voters.abi, provider)
            try {
                await contract.createVoter()
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }

    async function castVote() {
        if(!candId) return
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(voterAddress, Voters.abi, provider)
            const transaction = await contract.castVote(candId)
            await transaction.wait()
        }
    }

    async function retractVote() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(voterAddress, Voters.abi, provider)
            try {
                await contract.retractVote()
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }

    async function changeVote() {
        if(!candId) return
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(voterAddress, Voters.abi, provider)
            const transaction = await contract.changeVote(candId)
            await transaction.wait()
        }
    }

    async function addCandidate() {
        if (!candName) return
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(electionAddress, Election.abi, provider)
            const transaction = await contract.addCandidate(candId)
            await transaction.wait()
        }
    }

    async function getCandidates() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(electionAddress, Election.abi, provider)
        try {
            await contract.getCandidate()
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    async function getVotes() {
        if (!candId) return
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(electionAddress, Election.abi, provider)
            const transaction = await contract.getVotes(candId)
            await transaction.wait()
        }
    }

    async function currentLeader() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(electionAddress, Election.abi, provider)
        try {
            await contract.currentLeader()
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    async function checkWinner() {
        if (!candId) return
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(electionAddress, Election.abi, provider)
            const transaction = await contract.checkWinner(candId)
            await transaction.wait()
        }
    }

    
}