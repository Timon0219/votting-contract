// src/web3.js
import Web3 from 'web3';

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        // Request account access if needed
        window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error("User denied account access");
    }
} else if (window.web3) {
    // Legacy dapp browsers...
    web3 = new Web3(window.web3.currentProvider);
} else {
    // Non-dapp browsers...
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // Fallback to local node
}
const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        resolve(new Web3(window.web3.currentProvider));
      } else {
        reject(new Error('Must install MetaMask'));
      }
    });
  });
export { web3, getWeb3};
