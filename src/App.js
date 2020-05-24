import React from 'react';
import './App.css';
import Chatbox from "./containers/Chatbox/Chatbox"

const App = props => {
  return (
    <div className="App h-100 w-100 flex justify-content-end bg-dark">
        <Chatbox />  
    </div>
  );
}

export default App;
