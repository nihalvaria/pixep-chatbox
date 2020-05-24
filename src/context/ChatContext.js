import React, { useState, useEffect } from "react";
import Chance from "chance";
import shortid from "shortid";
const ChatContext = React.createContext();
const connection = new WebSocket("ws://localhost:8080");

const ChatContextProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState("participants");
    const [editing, setEditing] = useState(null);
    const [name] = useState(new Chance().first());

    useEffect(() => {
        connection.onopen = (event) => {
            console.log("WebSocket is open now.");
            connection.send(JSON.stringify({type: "USER" , name}))
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
                case "USER" : setUsers((prev) => [...prev, e.name])
                    break;
                case "TEXT" : setMessages((prev) => [...prev, e.text]);
                    break;
                case "DELETE" : setMessages((prev) => prev.map(m => {
                        if(m.id === e.id) m.isDeleted = true
                        return m
                    }));
                    break;
                case "EDIT" : console.log("edit !") 
                    break;
			    default:
				    break
            }
        };
    }, []);

    const toggleTab = (t) => {
        setTab(t);
        console.log(users)
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
        connection.send(JSON.stringify({type: "DELETE" , id}))
    }
    
    const editMessage = (id) => {
        console.log(id);
    };


    return (
        <ChatContext.Provider 
        value={{
            name,
            users,
            tab,
            toggleTab,
            messages,
            addMessage,
            editMessage,
            deleteMessage
        }}>
            {props.children}
        </ChatContext.Provider>
    );
};

export { ChatContextProvider, ChatContext };
