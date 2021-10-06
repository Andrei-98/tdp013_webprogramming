import Message from './Message'



function MessageList({messages}) {

    // const [messages, setMessages] = useState(null)

    // useEffect(() => {
    //     // const fetchMessages = async () => {
    //     //     const res = await fetch(`http://localhost:9070/profile/${user}`)
    //     // }
    //     fetch(`http://localhost:9070/profile/${user}`)
    //     .then(res => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         setMessages(data);
    //     })
    // }, [])

    return (
        <div className="message-container">
            {messages.map((msg) => (
                <Message msg={msg} className="msg"/>))}
            
        </div>
    )
}

export default MessageList

