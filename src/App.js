// src/App.js
import React, { useState, useEffect } from 'react';
import { getWeb3} from './web3';
import VotingForm from './components/VotingForm';
import PollResults from './components/PollResults';
import VotingContract from './contracts/Voting.json';

const contractAddress="0x203a298cc3E0625bA06bfadD5C088B4714517aa6";
const contractABI = VotingContract.abi;

const App = () => {
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    useEffect(() => {
        const init = async () => {
            try {
              const web3Instance = await getWeb3();
              setWeb3(web3Instance);
      
              const accounts = await web3Instance.eth.getAccounts();
              setAccount(accounts[0]);
      
              const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
              setContract(contractInstance);
            } catch (error) {
              console.error('Error connecting to web3:', error);
            }
          };
      
        init();
    }, []);

    if (!contract) return <div>Loading...</div>;

    return (
        <div>
            <VotingForm contract={contract} />
            <PollResults contract={contract} />
        </div>
    );
};

export default App;
