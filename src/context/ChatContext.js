import React, {Component} from "react"
const ChatContext = React.createContext()

class ChatContextProvider extends Component {

    state = {
        messages : [],
        users : [],
        tab: "chat",
        editing: null
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

    setEdit = (id) => {
        console.log(id)
    }
    
    
    render() {
        return (
            <ChatContext.Provider value={{users : this.state.users,
             messages: this.state.messages,
             tab: this.state.tab,
             setTab : this.toggleTab,
             editing: this.state.editing,
             setEdit: this.setEdit
             }}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

export {ChatContextProvider, ChatContext}
