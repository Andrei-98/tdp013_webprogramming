import React from 'react'

function Message({ msg, user }) {

    // const [status, setStatus] = useState(null);

    return (
        <div className="message-container">
            <p className="message-from">{msg.from}</p>
            <p className="message-content">{msg.content}</p>
        </div>
    )
}

export default Message
