// src/components/PollResults.js
import React, { useState, useEffect } from 'react';
import { web3 } from '../web3';

const PollResults = ({ contract }) => {
    const [results, setResults] = useState({});
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const getCandidates = async () => {
            const candidateList = await contract.methods.getCandidates().call();
            setCandidates(candidateList);
        };
        
        const getResults = async () => {
            const candidateList = await contract.methods.getCandidates().call();
            const results = {};
            for (const candidate of candidateList) {
                const votes = await contract.methods.votes(candidate).call();
                results[candidate] = votes;
            }
            setResults(results);
        };

        getCandidates();
        getResults();
    }, [contract]);

    return (
        <div>
            <h2>Poll Results</h2>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate}>
                        {web3.utils.hexToUtf8(candidate)}: {results[candidate]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PollResults;
