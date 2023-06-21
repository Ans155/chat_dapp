import React, {useEffect, useState, useContext} from 'react'
import Image from 'next/image';
import Link from "next/link";

import Style from "./friend.module.css";
import images from "../../assets";

const Card = ({ readMessage, el, i, readUser}) => {
  return (
    <Link href={{pathname: '/', query:`${el.name}`, address:`${el.pubkey}`}}>
        <div className={Style.Card} onClick={() => (readMessage(el.pubkey), readUser(el.pubkey))}>
            <div className={Style.Card_box}>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    </Link>
  )
}

export default Card