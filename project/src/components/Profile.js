import React from 'react'
import FriendList from './FriendList.js'
import MessageList from './MessageList'
import { useState, useEffect } from 'react'
import MessageBox from './MessageBox'
import FriendRequests from './FriendRequests.js'

function Profile({from, to=window.location.pathname.split("/").pop(), user}) {

    const [messages, setMessages] = useState([])
    const [friends, setFriends] = useState([])


    useEffect(() => {
        const getProfile = async () => {
            const serverFriends = await fetchFriends()
            setFriends(serverFriends)
            const serverMessages = await fetchMessages()
            setMessages(serverMessages)
        }
        
        
        getProfile()
    }, [to])

    
    // Fetch Messages
    const fetchMessages = async () => {
        const res = await fetch(`http://localhost:9070/messages/${to}`)
        const data = await res.json()
        return data
    }


    // Add Message
    const addMessage = async (msg) => {
        const res = await fetch('http://localhost:9070/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg)
        })
        setMessages([msg, ...messages])
        const data = await res.json()
        // setMessages([...messages, data])
    }


    // Fetch Friend List
    const fetchFriends = async () => {
        const res = await fetch(`http://localhost:9070/friends/${to}`)
        const data = await res.json()
        return data
    }

    return (
        <div>
            <h1>{to}</h1>
            <MessageBox to={to} from={from} onAdd={addMessage} />
            <div className="profile-container">
                {friends && <FriendList friends={friends} />}
                {user && <FriendRequests requests={user}/>}
                {messages && <MessageList messages={messages} />}
            </div>
        </div>
    )
}

export default Profile