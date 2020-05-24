import React, { useState, useEffect } from "react";
import Chance from "chance";
import shortid from "shortid";
const ChatContext = React.createContext();
const connection = new WebSocket("ws://localhost:8080");

const ChatContextProvider = (props) => {
    const [name] = useState(new Chance().first());
    const [tab, setTab] = useState("chat");
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("")

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
                case "EDIT" : setMessages((prev) => prev.map(m => {
                    if(m.id === e.data.id) {
                        m.isEdited = true
                        m.text = e.text
                        console.log(e.text, e.data.id, m.text, e.text)
                    }
                    return m
                })); 
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
        connection.send(JSON.stringify({type: "DELETE" , id}))
    }
    
    const editMessage = (text, data) => {
        connection.send(JSON.stringify({type: "EDIT" , text, data}))
    };

    const setInputText = (val) => {
        setInput(val)
    }

    return (
        <ChatContext.Provider 
        value={{
            name,
            users,
            tab,
            input,
            setInputText,
            setInput,
            toggleTab,
            editing,
            setEditing,
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
