import React, { useState, useContext } from 'react';
import './ChatInput.css';
import {ChatContext} from "../../context/ChatContext"
import shortid from 'shortid';

const ChatInput = props => {
  // editing, setEdit, 
  const {myname, addMessage} = useContext(ChatContext)    
  const [input, setInput] = useState("")
  
  const handleChange = e => [
      setInput(e.target.value)
  ]

  const handleText = val => {
    val.length > 0 && addMessage(val)
  }

  return (
    <div className="ChatInput flex">
        <input type="text" className="form-control py-3 px-2 mx-3" 
        onKeyPress={(e) => {
					if (e.key === 'Enter') {
            handleText(e.target.value)
            setInput('')
          }
				}} placeholder="Message" onChange={handleChange} value={input}/>
    </div>
  );
}

export default ChatInput;