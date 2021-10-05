import Message from './Message'
import { useEffect, useState } from "react";


function MessageList({all_msg}) {

    const [messages, setMessages] = useState(null)

    useEffect(() => {
        fetch('http://localhost:9070/profile')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setMessages(data);
        })
    }, [])

    return (
        <div className="message-container">
            {messages && messages.map((msg) => (
                <Message msg={msg} className="msg"/>))}
            
        </div>
    )
}

export default MessageList

