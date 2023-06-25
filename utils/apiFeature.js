import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ChatAppAddress, ChatAppABI} from '../context/constants'


export const CheckIfWalletConnected = async() => {
    try {
        if(!window.ethereum) return console.log("Install MetaMask");

        const accounts = await window.ethereum.request({
            method:"eth_accounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        //console.log("bhen ki chut");
        console.log(error);
        
    }
};

export const connectWallet = async() => {
    try {
        if(!window.ethereum) return console.log("Install MetaMask");

        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
        
    }
};


const fetchContract =(signerOrProvider) =>

 new ethers.Contract(ChatAppAddress,ChatAppABI,  signerOrProvider);


 export const connectingWithContract =async () => {
    try {
        const web3modal= new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer =provider.getSigner();
        const contract = fetchContract(signer);

        return contract;
    } catch (error) {
        console.log(error);
    }
 };


 export const convertTime =(time) => {
    const newTime = new Date(time.toNumber() * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const hours = newTime.getHours().toString().padStart(2, '0');
    const minutes = newTime.getMinutes().toString().padStart(2, '0');
    const seconds = newTime.getSeconds().toString().padStart(2, '0');
    const date = newTime.getDate().toString().padStart(2, '0');
    const month = (newTime.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 since months are zero-based
    const year = newTime.getFullYear();
  
    return `${hours}:${minutes}:${seconds} - ${date}/${month}/${year}`;
 }