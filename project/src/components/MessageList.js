import Message from './Message'



function MessageList({messages}) {

    return (
        <div className="message-list-container">
            {messages.map((msg) => (
                <Message msg={msg} className="msg"/>))}
            
        </div>
    )
}

export default MessageList

