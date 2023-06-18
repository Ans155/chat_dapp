import React, { useState, useEffect, useContext } from 'react'

import { UserCard } from '../components/index'
import Style from '../styles/alluser.module.css'
import { AppContext } from '../context/AppContext'


const alluser = () => {

    const { userLists, addFriends } = useContext(AppContext);

    return (
        <div>
            <div className={Style.alluser_info}>
                <h1>
                    find your friends
                </h1>

            </div>
            <div className={Style.alluser}>
                {userLists.map((el,i) =>(
                    <UserCard key={i+1} el={el} i={i} addFriends={addFriends}/>
                ))}

            </div>
        </div>
    )
}

export default alluser