import Message from './Message'
import React from 'react'


function MessageList({messages}) {

    return (
        <div className="message-list-container">
            {messages.map((msg) => (
                <Message msg={msg} className="msg"/>))}
            
        </div>
    )
}

export default MessageList

