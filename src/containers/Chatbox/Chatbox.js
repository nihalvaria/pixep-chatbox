import React, { useContext } from 'react';
import './Chatbox.css';
import {ChatContext} from "../../context/ChatContext"

const Chatbox = props => {

  const {users} = useContext(ChatContext)

  console.log(users)

  return (
    <div className="Chatbox">
     
    </div>
  );
}

export default Chatbox;
