import React, { useState, useContext } from 'react';
import './ChatInput.css';
import {ChatContext} from "../../context/ChatContext"

const ChatInput = props => {
  const {editing, setEdit} = useContext(ChatContext)  
  const [input, setInput] = useState("")

  const handleChange = e => [
      setInput(e.target.value)
  ]

  return (
    <div className="ChatInput flex">
        <input type="text" className="form-control py-3 px-2 mx-3" placeholder="Message" onChange={handleChange} value={input}/>
    </div>
  );
}

export default ChatInput;