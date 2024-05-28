// src/components/VotingForm.js
import React, { useState } from 'react';
import { web3 } from '../web3';

const VotingForm = ({ contract }) => {
    const [candidate, setCandidate] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            const candidateBytes32 = web3.utils.utf8ToHex(candidate).padEnd(66, '0'); // Convert to bytes32
            await contract.methods.vote(candidateBytes32).send({ from: accounts[0] });
            setMessage('Vote submitted successfully.');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Vote for a Candidate</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={candidate}
                    onChange={(e) => setCandidate(e.target.value)}
                    placeholder="Enter candidate name"
                />
                <button type="submit">Vote</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default VotingForm;
