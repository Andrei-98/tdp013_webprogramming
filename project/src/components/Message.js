import React from 'react'

function Message({ msg }) {
    return (
        <div className="message">
            <p>From: {msg.from}</p>
            <p>{msg.content}</p>
        </div>
    )
}

export default Message
