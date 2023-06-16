import React, {useEffect, useState, useContext} from 'react'
import Image from 'next/image';

import Style from "./loader.module.css";
import images from "../../assets";
const loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <Image src={images.loader} alt="loader" width={100} height={100}/>

      </div>

    </div>
  )
}

export default loader