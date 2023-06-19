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
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
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
      // console.log(userName);
      const friendLists= await contract.getMyFriendList();
      setFriendLists(friendLists);

      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      setError("Please Install and connect your wallet");
      console.log(error);
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
      //if(name || accountAddress) return setError("name and account must be there");
      const contract = await connectingWithContract();

      const getCreatedUser=await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();

    } catch (error) {
      setError("error while creating account, please reload");
      console.log(error);
    }
  };

  const addFriends = async ({name, accountAddress}) => {
    try {
      //if(name || accountAddress) return setError("name and account must be there");
      const contract = await connectingWithContract();

      const addMyFriend =await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();

    } catch (error) {
      setError("error while creating account, please reload");
    }
  };

  const sendMessage = async ({msg, address}) => {
    try {
      if(msg ||address) return setError("name and account must be there");
      const contract = await connectingWithContract();

      const addMessage =await contract.sendMessage({address, msg});
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      //router.push("/");
      window.location.reload();

    } catch (error) {
      setError("error while creating account, please reload");
    }
  };

  const readUser = async (userAddress) => {
      const contract= await connectingWithContract();
      const userName = await contract.getUsername(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
  };
    //const title= "Hey Welcome to Blockchain Chat App";
  return (
    <AppContext.Provider value={{
      readMessage, 
      createAccount, 
      addFriends, 
      sendMessage, 
      readUser,
      connectWallet,
      CheckIfWalletConnected,
      account,
      userName,
      friendLists,
      friendMsg,
      loading,
      userLists,
      error,
      currentUserName,
      currentUserAddress
      
      }}>
        {children}

    </AppContext.Provider>

  )
}

