import React, {Component} from "react"
const ChatContext = React.createContext()

class ChatContextProvider extends Component {

    state = {
        messages : [],
        users : [],
        tab: "participants"
    }

    toggleTab = (t) => {
        console.log(t)
        this.setState(prevState => {
            return {
                ...prevState,
                tab: t
            }
        })
    }
    
    
    render() {
        return (
            <ChatContext.Provider value={{users : this.state.users, messages: this.state.messages,tab: this.state.tab ,setTab : this.toggleTab}}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

export {ChatContextProvider, ChatContext}
