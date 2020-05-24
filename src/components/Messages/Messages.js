import React, { useContext } from 'react';
import './Messages.css';
import ChatInput from "../ChatInput/ChatInput"
import Message from "../Message/Message"
import {ChatContext} from "../../context/ChatContext"

const Messages = props => {

  const {messages} = useContext(ChatContext)    

  console.log(messages)

  return (
    <div className="Messages w-100">
      <div className="messages-con">
        { messages.map(d => <Message key={d.id} {...d} />) }
      </div>
      <ChatInput />
    </div>
  );
}

export default Messages;
