import React from 'react'

function Message({ msg }) {
    return (
        <div className="message-container">
            <p className="message-from">{msg.from}</p>
            <p className="message-content">{msg.content}</p>
        </div>
    )
}

export default Message
