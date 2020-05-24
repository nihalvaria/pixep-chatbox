import React, { useContext } from 'react';
import './SwitchTab.css';
import {ChatContext} from "../../context/ChatContext"


const SwitchTab = props => {

  const {users, toggleTab, tab} = useContext(ChatContext)

  const handleSwitch = (e) => {
    const { id } = e.target
    toggleTab(id)
  }

  return (
    <div className="SwitchTab w-100 flex flex-column">
        <div className="head-text h-50 w-100 flex">Status Meeting Standup</div>
        <div className="switchers h-50 w-100 flex">
          
          <div onClick={handleSwitch} id="participants" 
          className={`col-6 h-100 w-50 btn flex 
          ${tab === "participants" && "selectedTab border-bottom-0"}`}>
            Participants ({users.length})
          </div>

          <div onClick={handleSwitch} id="chat" 
          className={`col-6 h-100 w-50 btn flex 
          ${tab === "chat" && "selectedTab border-bottom-0"}`
          }>
            Chat
          </div>
          
        </div>

    </div>
  );
}

export default SwitchTab;
