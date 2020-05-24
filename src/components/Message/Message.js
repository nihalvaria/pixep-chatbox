import React, { useContext } from 'react';
import './Message.css';
import {ChatContext} from "../../context/ChatContext"

const Message = props => {

    const {name, editMessage, deleteMessage} = useContext(ChatContext)  

    const handleDelete = () => {
        deleteMessage(props.id)
    }
    
    const handleEdit = () => {
        editMessage(props.id)
    }

    return (
        <div className="Message flex flex-column w-100">
            <div className="top-text flex justify-content-start position-relative">
                <p className="name font-weight-bold m-0">{props.name}</p>
                <span className="ts text-muted ml-2">{props.ts}</span>
                <div className="edit-con flex position-absolute">
                    {props.isEdited && !props.isDeleted && <p className="text-info m-0 mx-2">Edited</p>}
                    {!props.isDeleted && props.name === name && <i className="material-icons btn" onClick={handleEdit}>mode_edit</i>}
                    {!props.isDeleted && props.name === name && <i className="material-icons btn" onClick={handleDelete}>delete</i>}
                </div>
            </div>
            <div className="text-body">
                {props.isDeleted ? <p className="text-muted">This message has been deleted</p> : <p>{props.text}</p>}
            </div>
        </div>
    );
}

export default Message;
