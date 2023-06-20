import React, {useEffect, useState, useContext} from 'react'
import Image from 'next/image';
import Link from "next/link";

import Style from "./navbar.module.css";
import { AppContext } from '../../context/AppContext';
import { Model, Error } from '../index';

import images from "../../assets";

const Navbar = () => {
  const menuItems =[
    {
      menu: "ALL USERS",
      link: "/alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "SETTINGS",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USE",
      link: "/",
    },
  ]
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel]= useState(false);

  const { account, userName, connectWallet, createAccount, error}= useContext(AppContext);
  return (
    <div className={Style.NavBar}> 
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt ="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* {DESKTOP} */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el,i) => (
              <div
                onClick={() => setActive(i+1)}
                key ={i+1}
                className={`${Style.NavBar_box_right_menu_items} ${active==i+1 ? Style.active_btn : ""}`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* {MOBILE} */}
          {open && (
          <div className={Style.mobile_menu}>
          {menuItems.map((el,i) => (
            <div
              onClick={() => setActive(i+1)}
              key ={i+1}
              className={`${Style.mobile_menu_items} ${active==i+1 ? Style.active_btn : ""}`}
            >
              <Link
                className={Style.mobile_menu_items_link}
                href={el.link}
              >
                {el.menu}
              </Link>
            </div>
          ))}
          <p className={Style.mobile_menu_btn}>
            <Image src={images.close} alt="close" width={50} height={50} onClick={() => setOpen(false)} />
          </p>
        </div>  
          )}

          {/* {CONNECT WALLET} */}
          <div className={Style.NavBar_box_right_connect}>
            {account =="" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <Image src ={userName ? images.accountName : images.create2} alt="Account Image" width={20} height={20}/>
                {''}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          <div className={Style.NavBar_box_right_open} onClick={() => setOpen(true)}>
            <Image src={images.open} alt="open" width ={30} height={30} />

          </div>
        </div>
      </div>
      {/* {Model component} */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model openBox={setOpenModel}
                title="WELCOME TO"
                head ="CHAT BUDDY"
                info="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Asperiores atque, dolorem laudantium dolor sequi necessitatibus 
                cum voluptatum incidunt nostrum nemo iusto, odio recusandae. 
                Repellendus, id aperiam? Perspiciatis quia mollitia similique!"
                smallInfo="kindly select your name..."
                image={images.hero}
                functionName={createAccount}
                address={account}
          /> 
          
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default Navbar