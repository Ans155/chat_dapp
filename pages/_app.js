
import React from 'react'
import '../styles/globals.css'
import { AppProvider } from '../context/AppContext';
import { Navbar } from '../components/index';
const MyApp = ({ Component, pageProps}) => (
  
    <div>
      <AppProvider >
        <Navbar />
      <Component {...pageProps} />
      </AppProvider>
        
    </div>
  );


export default MyApp