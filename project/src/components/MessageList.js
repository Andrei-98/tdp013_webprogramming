import Message from './Message'
import React from 'react'


function MessageList({ messages }) {

    return (
        <div className="message-list-container">
            {messages.map((msg, index) => (
                <Message
                    msg={msg}
                    className="msg"
                    key={index}
                />
            ))}

        </div>
    )
}

export default MessageList

