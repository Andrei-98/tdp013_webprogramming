import React from 'react'

function Message({ msg }) {
    return (
        <div>
            {/* <p>From: {msg.from}</p> */}
            <p>{msg}</p>
            {/* <p>Is read {msg.isRead}</p> */}
        </div>
    )
}

export default Message
