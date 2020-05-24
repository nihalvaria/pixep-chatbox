import React, { useState, useContext } from 'react';
import './Message.css';
import {ChatContext} from "../../context/ChatContext"

const Message = ({id, name, text, isEdited, isDeleted, ts}) => {

    const {setEdit} = useContext(ChatContext)  
    const {setDelete} = useContext(ChatContext)  
    
    const handleDelete = () => {
        setDelete(id)
    }
    
    const handleEdit = () => {
        setEdit(id)
    }

    return (
        <div className="Message flex flex-column w-100">
            <div className="top-text flex justify-content-start position-relative">
                <p className="name font-weight-bold m-0">{name}</p>
                <span className="ts text-muted ml-2">{ts.toTimeString().split(" ")[0]}</span>
                <div className="edit-con flex position-absolute">
                    {isEdited && !isDeleted && <p className="text-info m-0 mx-2">Edited</p>}
                    <i className="material-icons btn" onClick={handleEdit}>mode_edit</i>
                    {!isDeleted && <i className="material-icons btn" onClick={handleDelete}>delete</i>}
                </div>
            </div>
            <div className="text-body">
                {isDeleted ? <p className="text-muted">This message has been deleted</p> : <p>{text}</p>}
            </div>
        </div>
    );
}

export default Message;
