import Message from './Message'

function MessageList({all_msg}) {

    return (
        <div className="simple-container">
            {all_msg.map((msg) => (
                <Message msg={msg} className="msg"/>))}
        </div>
    )
}

export default MessageList

