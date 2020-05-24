import React, { useContext } from 'react';
import './Users.css';
import {ChatContext} from "../../context/ChatContext"
import shortid from 'shortid';

const Users = props => {

  const { users } = useContext(ChatContext)

  return (
    <div className="Users w-100">
        {users.map(u => {
          return(
            <div key={shortid.generate()} className="user-con w-100 border-bottom flex justify-content-start">
              <p className="user-name p-4 m-0">{u}</p>
            </div>
          )
        })}
    </div>
  );
}

export default Users;
