import React from 'react'

function Message({ msg }) {
    return (
        <div>
            <p>From: {msg.from}</p>
            <p>{msg.text}</p>
            <p>Is read {msg.isRead}</p>
        </div>
    )
}

export default Message
