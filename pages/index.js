import React, {useState, useEffect, useContext} from 'react';
import { Filter,Friend } from '../components/index';
import { AppContext } from '../context/AppContext';


const chatApp = () => {
    const {}= useContext(AppContext);
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  )
}

export default chatApp