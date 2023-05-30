// SPDX_License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract ChatApp{

    //USER STRUCT
    struct user {
        string name;
        friend[] friendList;

    }
    struct friend{
        address pubkey;
        string name;

    }
    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    function checkUserExists(address pubkey ) public view returns(bool)
    {  
        return bytes(userList[pubkey].name).length>0;
    }

    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length>0, "Username cannot be empty");
        userList[msg.sender].name =name;
    }
    function getUsername(address pubkey) external view returns(string memory)
    {
        require(checkUserExists(pubkey), "User is not registered"); 
        return userList[pubkey].name;
    }
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(msg.sender !=friend_key, "User cannot add themselves");
        require(checkAlreadyFriends(msg.sender, friend_key)==false, "These users are already friend");
        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender]. name);
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool)
    {
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length)
        {
            address tmp=pubkey1;
            pubkey1=pubkey2;
            pubkey2=tmp;
        }

        for(uint256 i=0; i<userList[pubkey1].friendList.length;i++)
        {
            if(userList[pubkey1].friendList[i].pubkey = pubkey2)
            return true;
        }
        return false;
    }
}