import React, {useState, useEffect} from 'react';
import  {useRouter} from "next/router";


import {
    CheckIfWalletConnected,
    connectWallet,
    connectingWithContract,
} from "../utils/apiFeature";

export const AppContext= React.createContext();

export const AppProvider = ({ children }) => {
    //const title= "Hey Welcome to Blockchain Chat App";
  return (
    <AppContext.Provider value={{}}>
        {children}

    </AppContext.Provider>

  )
}

