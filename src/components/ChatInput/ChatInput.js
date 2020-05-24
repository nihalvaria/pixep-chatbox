import React, { useState, useContext } from 'react';
import './ChatInput.css';
import {ChatContext} from "../../context/ChatContext"

const ChatInput = props => {

  const {addMessage, editing, setEditing, editMessage, input, setInput} = useContext(ChatContext)    

  const handleChange = e => {
    e.persist();
    setInput(e.target.value)
  }

  const handleText = val => {
    if(editing.length === 0){
      val.length > 0 && addMessage(val)
    }
    else{
      editMessage(val, editing)
      setEditing([])
      setInput('')
    }
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