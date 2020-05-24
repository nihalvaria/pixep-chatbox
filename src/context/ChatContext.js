import React, { useState, useEffect } from "react";
import Chance from "chance";
import shortid from "shortid";
const ChatContext = React.createContext();
const connection = new WebSocket("ws://localhost:8080");

const ChatContextProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState("chat");
    const [editing, setEditing] = useState(null);
    const [name] = useState(new Chance().first());

    useEffect(() => {
        connection.onopen = (event) => {
            console.log("WebSocket is open now.");
        };

        connection.onclose = (event) => {
            console.log("WebSocket is closed now.");
        };

        connection.onerror = (event) => {
            console.error("WebSocket error observed:", event);
        };

        connection.onmessage = (event) => {
            const e = JSON.parse(event.data)
            switch(e.type){
                case "TEXT" : setMessages((prev) => [...prev, e.text]);
                    break;
                case "DELETE" : console.log("delete");
                    break;
			    default:
				    break
            }
        };
    }, []);

    const toggleTab = (t) => {
        setTab(t);
    };

    const addMessage = (val) => {
        const text = {
            id: shortid.generate(),
            name: name,
            text: val,
            isEdited: false,
            isDeleted: false,
            ts: new Date().toLocaleString(),
        };
        connection.send(JSON.stringify({type: "TEXT" ,text}));
    };

    const deleteMessage = (id) => {
        connection.send(id)
    }
    
    const setEdit = (id) => {
        console.log(id);
    };


    return (
        <ChatContext.Provider value={{ users: users, messages: messages, tab: tab, setTab: toggleTab, setEdit: setEdit, myname: name, addMessage: addMessage }}>{props.children}</ChatContext.Provider>
    );
};

export { ChatContextProvider, ChatContext };
