import React from 'react';
import './Messages.css';
import ChatInput from "../ChatInput/ChatInput"
import Message from "../Message/Message"

const Messages = props => {

  const demodata = [
    {
      id: 1,
      name: "nihal",
      text: "HELLO WORLD! HELLO WORLD!HELLO WORLD!HELLO WORLD!HELLO WORLD!HELLO WORLD!HELLO WORLD!",
      isEdited: true,
      isDeleted: false,
      ts: new Date()
    },{
      id: 2,
      name: "nihal1",
      text: "HELLO WORLD!",
      isEdited: false,
      isDeleted: false,
      ts: new Date()
    },{
      id: 3,
      name: "nihal2",
      text: "HELLO WORLD!",
      isEdited: true,
      isDeleted: true,
      ts: new Date()
    }
  ]

  return (
    <div className="Messages w-100">
      <div className="messages-con flex flex-column justify-content-end">
        { demodata.map(d => <Message key={d.id} {...d} />) }
      </div>
      <ChatInput />
    </div>
  );
}

export default Messages;
