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
          <Model openBox={addFriend}
                title="WELCOME TO"
                head ="CHAT BUDDY"
                info="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Asperiores atque, dolorem laudantium dolor sequi necessitatibus 
                cum voluptatum incidunt nostrum nemo iusto, odio recusandae. 
                Repellendus, id aperiam? Perspiciatis quia mollitia similique!"
                smallInfo="kindly select your friend's name and address..."
                image={images.hero}
                functionName={addFriends}
          /> 
          
        </div>
      )}
    </div>
  )
}

export default filter