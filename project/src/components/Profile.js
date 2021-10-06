import FriendList from './FriendList.js'
import MessageList from './MessageList'
import { useState, useEffect } from 'react'
import MessageBox from './MessageBox'

function Profile({ user }) {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getMessages = async () => {
            const serverMessages = await fetchMessages()
            setMessages(serverMessages)
        }
        getMessages()
    }, [])

    // Fetch Messages
    const fetchMessages = async () => {
        console.log("MESSAGES HAVE BEEN FETCHED")
        console.log(user)
        const res = await fetch(`http://localhost:9070/profile/${user}`)
        const data = await res.json()
        return data
    } 

    // const addMessage = async (msg) => {
    //     const res = await fetch('http://localhost:9070/profile', {
    //       method: 'POST',
    //       headers: { 'Content-type': 'application/json',},
    //       body: JSON.stringify(msg),
    //     })
    
    //     const data = await res.json()
    
    //     setMessages([...messages, data])
    
    //   }


    // Add Message
    const addMessage = async (msg) => {
        const res = await fetch('http://localhost:9070/profile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(msg)
        })
        setMessages([msg, ...messages])
    }

   

    return (
        <div>
            <h1>John</h1>
            <MessageBox from="John" onAdd={addMessage}/>
            <div className="profile-container">
                {/* <FriendList all_friends={user.friends}  /> */}
                {messages && <MessageList messages={messages}/>}
            </div>
        </div>
    )
}

export default Profile