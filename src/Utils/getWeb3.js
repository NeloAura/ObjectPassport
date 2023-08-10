import Web3 from "web3";


const FALLBACK_WEB3_PROVIDER = process.env.REACT_APP_NETWORK || 'http://0.0.0.0:8545';
const getWeb3 = async () => {
// Modern dapp browsers...
if (window.ethereum) {
try {
// Request account access if needed
await window.ethereum.request({ method: 'eth_requestAccounts' });
// Create a new web3 instance using the provider
const web3 = new Web3(window.ethereum);
return web3;
} catch (error) {
throw error;
}
}
// Legacy dapp browsers...
else if (window.web3) {
// Use Mist/MetaMask's provider.
const web3 = new Web3(window.web3.currentProvider);
console.log("Injected web3 detected.");
return web3;
}
// Fallback to localhost; use dev console port by default...
else {
const provider = new Web3.providers.HttpProvider(FALLBACK_WEB3_PROVIDER);
const web3 = new Web3(provider);
console.log("No web3 instance injected, using Infura/Local web3.");
return web3;
}
};


export default getWeb3;
export { Web3 };