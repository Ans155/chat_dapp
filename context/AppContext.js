import React, {useState, useEffect} from 'react';
import  {useRouter} from "next/router";


import {
    CheckIfWalletConnected,
    connectWallet,
    connectingWithContract,
} from "../utils/apiFeature";

export const AppContext= React.createContext();

export const AppProvider = ({ children }) => {

  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState("");
  const [friendMsg, setFriendMsg] = useState("");
  const [loading, setLoading] = useState("");
  const [userLists, setUserLists] = useState("");
  const [error, setError] = useState("");


  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();
      const connectAccount= await connectWallet();
      setAccount(connectAccount);
      const userName= await contract.getUsername(connectAccount);
      setUserName(userName);
      const friendLists= await contract.getMyFriendList();
      setFriendLists(friendLists);

      const userList = await contract.getAllAppUser();
      setUserLists(userLists);
    } catch (error) {
      setError("Please Install and connect your wallet");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  

  const readMessage = async () => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("NO message right now");
    }
  };

  const createAccount = async ({name, accountAddress}) => {
    try {
      if(name || accountAddress) return setError("name and account must be there");
      const contract = await connectingWithContract();

      const getCreatedUser=await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();

    } catch (error) {
      setError("error while creating account, please reload");
    }
  };
    //const title= "Hey Welcome to Blockchain Chat App";
  return (
    <AppContext.Provider value={{readMessage, createAccount}}>
        {children}

    </AppContext.Provider>

  )
}

