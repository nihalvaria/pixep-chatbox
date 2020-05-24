import React, { useContext } from 'react';
import './Chatbox.css';
import {ChatContext} from "../../context/ChatContext"
import  SwitchTab from "../../components/SwitchTab/SwitchTab"
import  Users from "../../components/Users/Users"
import  Messages from "../../components/Messages/Messages"

const Chatbox = props => {

  const {users, tab} = useContext(ChatContext)

  console.log(users)

  return (
    <div className="Chatbox h-100 bg-white">
      <SwitchTab />
      { tab === "participants" ? <Users/> : <Messages/>}
    </div>
  );
}

export default Chatbox;
