import React, {useEffect, useState, useContext} from 'react'
import Image from 'next/image';
import Style from "./filter.module.css";
import images from "../../assets";
import { AppContext } from '../../context/AppContext';
import { Model } from '../index';


const filter = () => {
  const {account, addFriends} = useContext(AppContext);

  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20}/>
            <input type="text" placeholder='search...'/>
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20}/>
            CLEAR CHAT
          </button>.
          
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20}/>
            ADD FRIEND
          </button>
        </div>

      </div>


    {/* {Model component} */}
    {addFriend && (
        <div className={Style.Filter_model}>
          <Model openBox={setAddFriend}
                title="WELCOME TO"
                head ="CHAT BUDDY"
                info="Connect with your friends on this amazing decentralized chat application, where your data and privacy is more secure than EVER!!"
                smallInfo="kindly select your friend's name and address..."
                image={images.hero}
                functionName={addFriends}
                //addFriend={addFriend}
          /> 
          
        </div>
      )}
    </div>
  )
}

export default filter