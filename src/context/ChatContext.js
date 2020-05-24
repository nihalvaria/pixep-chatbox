import React, {Component} from "react"
const ChatContext = React.createContext()

class ChatContextProvider extends Component {

    state = {
        messages : [],
        users : []
    }
    
    
    render() {
        return (
            <ChatContext.Provider value={{users : this.state.users, messages: this.state.messages}}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

export {ChatContextProvider, ChatContext}
