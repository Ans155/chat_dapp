
import React from 'react'

import { AppProvider } from '../context/AppContext';
import { navbar } from '../components/index';
const MyApp = ({ Component, pageProps}) => (
  
    <div>
      <AppProvider >
        <navbar />
      <Component {...pageProps} />
      </AppProvider>
        
    </div>
  );


export default MyApp