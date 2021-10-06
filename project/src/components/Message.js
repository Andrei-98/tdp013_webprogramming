import React from 'react'
import Link from 'react-router-dom/Link';

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
